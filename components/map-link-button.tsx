import Link from "next/link";

export function MapLinkButton() {
  return (
    <Link
      href="/map"
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      <span>Prejsť na mapu</span>
    </Link>
  );
}
