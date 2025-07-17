import Link from "next/dist/client/link";

export default function Day13() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen ">
      <Link className="border-1 border-amber-50 p-3" href="/Day13/morning">
        Morning (Image optimization)
      </Link>
      <Link className="border-1 border-amber-50 p-3" href="/Day13/afternoon">
        Afternoon (Authentication/ hide accesstoken)
      </Link>
    </div>
  );
}
