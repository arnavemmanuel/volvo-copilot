interface Props {
  title: string;
  items: string[];
}

export default function InfoSection({
  title,
  items,
}: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">

      <h3 className="font-semibold text-lg mb-3">
        {title}
      </h3>

      <ul className="space-y-2">

        {items.map((item) => (
          <li
            key={item}
            className="text-gray-700 flex gap-2"
          >
            • {item}
          </li>
        ))}

      </ul>

    </div>
  );
}