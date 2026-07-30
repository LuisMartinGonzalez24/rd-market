"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/src/lib/prisma";

export async function registrarCompra(formData: FormData) {
  const usuarioId = String(formData.get("usuarioId") ?? "");
  const productoId = String(formData.get("productoId") ?? "");
  const cantidad = Number(formData.get("cantidad"));

  if (!usuarioId || !productoId || !Number.isInteger(cantidad) || cantidad <= 0) {
    throw new Error("Datos de compra inválidos");
  }

  await prisma.$transaction(async (tx) => {
    const producto = await tx.producto.findUnique({ where: { id: productoId } });

    if (!producto) {
      throw new Error("El producto no existe");
    }
    if (producto.stock < cantidad) {
      throw new Error(
        `Stock insuficiente: quedan ${producto.stock} unidades de ${producto.nombre}`
      );
    }

    await tx.producto.update({
      where: { id: productoId },
      data: { stock: { decrement: cantidad } },
    });

    await tx.compra.create({ data: { usuarioId, productoId, cantidad } });
  });

  revalidatePath("/compras");
  revalidatePath("/productos");
  redirect("/compras");
}
