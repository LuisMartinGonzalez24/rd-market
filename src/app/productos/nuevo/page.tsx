import { crearProducto } from "@/src/lib/actions/productos";
import ProductoForm from "../producto-form";

export default function NuevoProductoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Nuevo producto</h1>
      <ProductoForm action={crearProducto} textoBoton="Crear producto" />
    </main>
  );
}
