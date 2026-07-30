import { crearUsuario } from "@/src/lib/actions/usuarios";
import UsuarioForm from "../usuario-form";

export default function NuevoUsuarioPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Registrar usuario</h1>
      <UsuarioForm action={crearUsuario} textoBoton="Registrar" />
    </main>
  );
}
