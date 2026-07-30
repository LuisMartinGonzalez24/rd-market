import { notFound } from "next/navigation";
import prisma from "@/src/lib/prisma";
import { actualizarProducto } from "@/src/lib/actions/productos";
import ProductoForm from "../../producto-form";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = await prisma.producto.findUnique({ where: { id } });

  if (!producto) {
    notFound();
  }

  const actualizarConId = actualizarProducto.bind(null, producto.id);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Editar producto</h1>
      <ProductoForm
        action={actualizarConId}
        textoBoton="Guardar cambios"
        valores={producto}
      />
    </main>
  );
}
