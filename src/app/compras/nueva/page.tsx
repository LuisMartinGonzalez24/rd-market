import Link from "next/link";
import prisma from "@/src/lib/prisma";
import { registrarCompra } from "@/src/lib/actions/compras";
import { formatoPrecio } from "@/src/lib/formato";

export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

export default async function NuevaCompraPage() {
  const [usuarios, productos] = await Promise.all([
    prisma.usuario.findMany({ orderBy: { nombre: "asc" } }),
    prisma.producto.findMany({
      where: { stock: { gt: 0 } },
      orderBy: { nombre: "asc" },
    }),
  ]);

  const faltanDatos = usuarios.length === 0 || productos.length === 0;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Registrar compra</h1>

      {faltanDatos ? (
        <p className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
          Para registrar una compra necesitas al menos un{" "}
          <Link href="/usuarios/nuevo" className="text-blue-600 hover:underline">
            usuario
          </Link>{" "}
          y un{" "}
          <Link href="/productos/nuevo" className="text-blue-600 hover:underline">
            producto
          </Link>{" "}
          con stock disponible.
        </p>
      ) : (
        <form action={registrarCompra} className="max-w-lg space-y-4">
          <div>
            <label htmlFor="usuarioId" className="mb-1 block text-sm font-medium">
              Usuario *
            </label>
            <select id="usuarioId" name="usuarioId" required className={inputClass}>
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre} ({usuario.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="productoId" className="mb-1 block text-sm font-medium">
              Producto *
            </label>
            <select id="productoId" name="productoId" required className={inputClass}>
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre} — {formatoPrecio.format(producto.precio)} (stock:{" "}
                  {producto.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cantidad" className="mb-1 block text-sm font-medium">
              Cantidad *
            </label>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min="1"
              defaultValue="1"
              required
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Registrar compra
            </button>
            <Link
              href="/compras"
              className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </main>
  );
}
