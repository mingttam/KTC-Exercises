import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Link href="/Day12/afternoon">Day12</Link>
      <Link href="/Day13/afternoon">Day13</Link>
    </div>
  );
}
