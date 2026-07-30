import { notFound } from "next/navigation";
import prisma from "@/src/lib/prisma";
import { actualizarUsuario } from "@/src/lib/actions/usuarios";
import UsuarioForm from "../../usuario-form";

export default async function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const usuario = await prisma.usuario.findUnique({ where: { id } });

  if (!usuario) {
    notFound();
  }

  const actualizarConId = actualizarUsuario.bind(null, usuario.id);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Editar usuario</h1>
      <UsuarioForm
        action={actualizarConId}
        textoBoton="Guardar cambios"
        valores={usuario}
        passwordOpcional
      />
    </main>
  );
}
