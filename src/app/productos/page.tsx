import Link from "next/link";
import prisma from "@/src/lib/prisma";
import { eliminarProducto } from "@/src/lib/actions/productos";
import { formatoPrecio } from "@/src/lib/formato";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany({
    orderBy: { creadoEn: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/productos/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Nuevo producto
        </Link>
      </div>

      {productos.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No hay productos registrados todavía.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-medium">{producto.nombre}</span>
                    {producto.descripcion && (
                      <p className="text-xs text-gray-500">{producto.descripcion}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">{producto.categoria ?? "—"}</td>
                  <td className="px-4 py-3">{formatoPrecio.format(producto.precio)}</td>
                  <td className="px-4 py-3">{producto.stock}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/productos/${producto.id}/editar`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <form action={eliminarProducto.bind(null, producto.id)}>
                        <button type="submit" className="text-red-600 hover:underline">
                          Eliminar
                        </button>
                      </form>
                    </div>
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
