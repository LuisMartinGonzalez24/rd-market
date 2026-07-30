import Link from "next/link";

type UsuarioFormProps = {
  action: (formData: FormData) => Promise<void>;
  textoBoton: string;
  valores?: {
    nombre: string;
    email: string;
  };
  passwordOpcional?: boolean;
};

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

export default function UsuarioForm({
  action,
  textoBoton,
  valores,
  passwordOpcional = false,
}: UsuarioFormProps) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium">
          Nombre *
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          defaultValue={valores?.nombre}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={valores?.email}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          {passwordOpcional ? "Contraseña (dejar vacía para no cambiarla)" : "Contraseña *"}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required={!passwordOpcional}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {textoBoton}
        </button>
        <Link
          href="/usuarios"
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
