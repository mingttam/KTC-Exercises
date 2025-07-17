import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen ">
      <p>Choose Below</p>
      <Link className="border-1 border-amber-50 p-3" href="/Day12/afternoon">
        Day12(NextJS basic)
      </Link>
      <Link className="border-1 border-amber-50 p-3" href="/Day13">
        Day13(Image optimization/ Authentication)
      </Link>
    </div>
  );
}
