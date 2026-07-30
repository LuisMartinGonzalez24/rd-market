"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/src/lib/prisma";

function leerDatosProducto(formData: FormData) {
  return {
    nombre: String(formData.get("nombre") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim() || null,
    precio: Number(formData.get("precio")),
    stock: Number(formData.get("stock")),
    categoria: String(formData.get("categoria") ?? "").trim() || null,
  };
}

export async function crearProducto(formData: FormData) {
  const datos = leerDatosProducto(formData);
  if (!datos.nombre || Number.isNaN(datos.precio) || Number.isNaN(datos.stock)) {
    throw new Error("Datos de producto inválidos");
  }

  await prisma.producto.create({ data: datos });

  revalidatePath("/productos");
  redirect("/productos");
}
