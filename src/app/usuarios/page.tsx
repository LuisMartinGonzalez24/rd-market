import Link from "next/link";
import prisma from "@/src/lib/prisma";
import { eliminarUsuario } from "@/src/lib/actions/usuarios";
import { formatoFecha } from "@/src/lib/formato";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const usuarios = await prisma.usuario.findMany({
    orderBy: { creadoEn: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Link
          href="/usuarios/nuevo"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Registrar usuario
        </Link>
      </div>

      {usuarios.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No hay usuarios registrados todavía.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Registrado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 font-medium">{usuario.nombre}</td>
                  <td className="px-4 py-3">{usuario.email}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatoFecha.format(usuario.creadoEn)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/usuarios/${usuario.id}/editar`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <form action={eliminarUsuario.bind(null, usuario.id)}>
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
