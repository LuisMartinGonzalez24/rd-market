"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/src/lib/prisma";

// Nota académica: la contraseña se guarda en texto plano porque este proyecto
// es solo demostrativo. En una aplicación real debe usarse un hash (bcrypt, argon2).

export async function crearUsuario(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!nombre || !email || !password) {
    throw new Error("Datos de usuario inválidos");
  }

  await prisma.usuario.create({ data: { nombre, email, password } });

  revalidatePath("/usuarios");
  redirect("/usuarios");
}

export async function actualizarUsuario(id: string, formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!nombre || !email) {
    throw new Error("Datos de usuario inválidos");
  }

  await prisma.usuario.update({
    where: { id },
    data: { nombre, email, ...(password ? { password } : {}) },
  });

  revalidatePath("/usuarios");
  redirect("/usuarios");
}

export async function eliminarUsuario(id: string) {
  await prisma.usuario.delete({ where: { id } });

  revalidatePath("/usuarios");
}
