import type { Email } from "../../hooks/useEmails";

interface EmailBodyProps {
  email: Email;
}

export default function EmailBody({
  email,
}: EmailBodyProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-100 px-10 py-8">

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">

        <div className="prose prose-slate max-w-none">

          <pre
            className="
              whitespace-pre-wrap
              break-words
              bg-transparent
              p-0
              font-sans
              text-[15px]
              leading-7
              text-slate-800
            "
          >
            {email.body}
          </pre>

        </div>

      </div>

    </main>
  );
}