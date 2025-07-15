import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="text-black hover:underline bg-gray-50 p-6" href="/">
        Return Home
      </Link>
    </div>
  );
}
