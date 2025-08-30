import Link from "next/link";
export default function Nav(){
return (
<header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
<div className="container flex items-center justify-between py-3">
<Link href="/" className="font-semibold">Carbon Time Machine</Link>
<nav className="flex gap-4 text-sm">
<Link href="/" className="hover:underline">Home</Link>
<Link href="/timeline" className="hover:underline">Timelines</Link>
<Link href="/about" className="hover:underline">About</Link>
</nav>
</div>
</header>
);
}