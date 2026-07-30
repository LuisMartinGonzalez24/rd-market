import Link from "next/link";
import prisma from "@/src/lib/prisma";
import { formatoFecha, formatoPrecio } from "@/src/lib/formato";

export const dynamic = "force-dynamic";

export default async function ComprasPage() {
  const compras = await prisma.compra.findMany({
    include: { usuario: true, producto: true },
    orderBy: { fecha: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Compras</h1>
        <Link
          href="/compras/nueva"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Registrar compra
        </Link>
      </div>

      {compras.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No hay compras registradas todavía.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Usuario</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 font-medium">{compra.usuario.nombre}</td>
                  <td className="px-4 py-3">{compra.producto.nombre}</td>
                  <td className="px-4 py-3">{compra.cantidad}</td>
                  <td className="px-4 py-3">
                    {formatoPrecio.format(compra.producto.precio * compra.cantidad)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatoFecha.format(compra.fecha)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
