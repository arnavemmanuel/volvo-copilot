import { useEffect, useRef, useState } from "react";
import { Bell, Search, Sparkles, CheckCheck } from "lucide-react";
import { useCopilot } from "../hooks/useCopilot";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../services/searchService";

const initialNotifications = [
  {
    id: 1,
    title: "SAP approval required",
    subtitle: "Supplier request awaiting approval",
    time: "2 min ago",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Meeting rescheduled",
    subtitle: "Digital Production Review • 2:30 PM",
    time: "15 min ago",
    color: "bg-amber-500",
  },
  {
    id: 3,
    title: "New VIOLIN updates",
    subtitle: "5 operational updates published",
    time: "1 hour ago",
    color: "bg-blue-500",
  },
];

export default function TopBar() {
  const { openCopilot, loading } = useCopilot();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");


const [showSuggestions, setShowSuggestions] = useState(false);

const filteredSuggestions = getSearchSuggestions(search);

  const [notifications, setNotifications] = useState(initialNotifications);
  const [openNotifications, setOpenNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setOpenNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(
  e: React.KeyboardEvent<HTMLInputElement>
) {
  if (e.key !== "Enter") return;

  const query = search.trim();

  if (!query) return;

  navigate(`/search?q=${encodeURIComponent(query)}`);

  setSearch("");
}

  function markAllRead() {
    setNotifications([]);
  }

  return (
    <header className="sticky top-0 z-40 -mx-8 mb-8 border-b border-slate-200/70 bg-slate-100/90 px-8 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        {/* Left */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex max-w-xl flex-1">

  <div className="relative flex max-w-xl flex-1">

  <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

    <Search className="h-5 w-5 text-slate-400" />

    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setShowSuggestions(true);
      }}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => {
        setTimeout(() => setShowSuggestions(false), 150);
      }}
      onKeyDown={(e) => {
        handleSearch(e);

        if (e.key === "Escape") {
          setShowSuggestions(false);
        }
      }}
      placeholder={
        loading
          ? "Copilot is searching..."
          : "Search meetings, emails, documents..."
      }
      disabled={loading}
      className="flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
    />

  </div>

  {showSuggestions &&
    search.trim() &&
    filteredSuggestions.length > 0 && (

      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {filteredSuggestions.map((item) => (

          <button
            key={item}
            onMouseDown={() => {
              navigate(`/search?q=${encodeURIComponent(item)}`);
              setSearch("");
              setShowSuggestions(false);
            }}
            className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-3 text-left transition last:border-b-0 hover:bg-slate-50"
          >
            <Search className="h-4 w-4 text-slate-400" />

            <span className="text-sm font-medium text-slate-700">
              {item}
            </span>

          </button>

        ))}

      </div>

  )}

</div>

  {showSuggestions &&
    search.length > 0 &&
    filteredSuggestions.length > 0 && (

      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {filteredSuggestions.map((item) => (

          <button
            key={item}
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(item)}`);
              setSearch("");
              setShowSuggestions(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-slate-50"
          >
            <Search className="h-4 w-4 text-slate-400" />

            <span>{item}</span>

          </button>

        ))}

      </div>

  )}

</div>

          <button
            onClick={openCopilot}
            className="group flex items-center gap-3 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Sparkles className="h-5 w-5 transition group-hover:rotate-12" />

            <span className="font-medium">Ask Copilot</span>
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setOpenNotifications((v) => !v)}
              className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <Bell className="h-6 w-6 text-slate-700" />

              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {openNotifications && (
              <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <h3 className="font-semibold text-slate-900">
                    Notifications
                  </h3>

                  {notifications.length > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <CheckCheck className="h-4 w-4" />
                      Mark all read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    You're all caught up 🎉
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex gap-3 border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50"
                    >
                      <div
                        className={`mt-2 h-2.5 w-2.5 rounded-full ${notification.color}`}
                      />

                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {notification.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {notification.subtitle}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 font-bold text-white">
              A
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Executive Assistant
              </p>

              <p className="text-sm text-slate-500">
                Digital Production
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}