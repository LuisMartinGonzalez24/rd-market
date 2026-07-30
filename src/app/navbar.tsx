import Link from "next/link";

const enlaces = [
  { href: "/productos", texto: "Productos" },
  { href: "/usuarios", texto: "Usuarios" },
  { href: "/compras", texto: "Compras" },
];

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          🛒 MiniMarket
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link href={enlace.href} className="text-gray-700 hover:text-blue-700">
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
