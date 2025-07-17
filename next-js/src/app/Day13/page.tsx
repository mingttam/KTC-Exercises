import Link from "next/dist/client/link";

export default function Day13() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Link href="/Day13/morning">Morning</Link>
      <Link href="/Day13/afternoon">Afternoon</Link>
    </div>
  );
}
