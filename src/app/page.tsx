import Link from "next/link";
import prisma from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [totalProductos, totalUsuarios, totalCompras] = await Promise.all([
    prisma.producto.count(),
    prisma.usuario.count(),
    prisma.compra.count(),
  ]);

  const secciones = [
    {
      href: "/productos",
      titulo: "Productos",
      total: totalProductos,
      descripcion: "Administra el catálogo: crear, editar y eliminar productos.",
    },
    {
      href: "/usuarios",
      titulo: "Usuarios",
      total: totalUsuarios,
      descripcion: "Registra y administra los usuarios del mini market.",
    },
    {
      href: "/compras",
      titulo: "Compras",
      total: totalCompras,
      descripcion: "Registra compras de productos por usuario y consulta el historial.",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">MiniMarket</h1>
      <p className="mt-2 text-gray-600">
        CRUD académico construido con Next.js, Prisma y SQLite.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {secciones.map((seccion) => (
          <Link
            key={seccion.href}
            href={seccion.href}
            className="rounded border border-gray-200 bg-white p-5 transition hover:border-blue-400 hover:shadow-sm"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold">{seccion.titulo}</h2>
              <span className="text-2xl font-bold text-blue-700">{seccion.total}</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{seccion.descripcion}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
