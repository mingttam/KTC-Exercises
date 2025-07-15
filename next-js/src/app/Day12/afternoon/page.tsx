import Link from "next/link";

export default function AfternoonHome() {
  return (
    <div className="h-screen flex items-center justify-center gap-6 text-lg">
      <Link href="/Day12/afternoon/TaskSSR">Task SSR</Link>
      <Link href="/Day12/afternoon/TaskSSG">Task SSG</Link>

      <Link href="/Day12/afternoon/TaskISR">Task ISR</Link>
      <Link href="/Day12/afternoon/TaskCSR">Task CSR</Link>
    </div>
  );
}
