import Link from "next/link";

type ProductoFormProps = {
  action: (formData: FormData) => Promise<void>;
  textoBoton: string;
  valores?: {
    nombre: string;
    descripcion: string | null;
    precio: number;
    stock: number;
    categoria: string | null;
  };
};

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";

export default function ProductoForm({ action, textoBoton, valores }: ProductoFormProps) {
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
        <label htmlFor="descripcion" className="mb-1 block text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          defaultValue={valores?.descripcion ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="precio" className="mb-1 block text-sm font-medium">
            Precio *
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={valores?.precio}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium">
            Stock *
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={valores?.stock}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="categoria" className="mb-1 block text-sm font-medium">
          Categoría
        </label>
        <input
          id="categoria"
          name="categoria"
          defaultValue={valores?.categoria ?? ""}
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
          href="/productos"
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
