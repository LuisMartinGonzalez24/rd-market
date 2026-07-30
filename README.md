# 🛒 MiniMarket (rd-market)

CRUD académico de un mini market construido con **Next.js**, **Prisma** y **SQLite**. El proyecto tiene un doble objetivo: implementar un CRUD funcional y demostrar un flujo de trabajo con Git basado en ramas, Pull Requests y merges.

## Funcionalidad

- **Productos** (`/productos`): crear, listar, editar y eliminar productos (nombre, descripción, precio, stock, categoría).
- **Usuarios** (`/usuarios`): registrar, listar, editar y eliminar usuarios (nombre, email, contraseña).
- **Compras** (`/compras`): registrar la compra de un producto por un usuario (con cantidad y fecha), validando y descontando el stock disponible.

> ⚠️ Nota académica: la contraseña se guarda en texto plano porque el proyecto es solo demostrativo. En una aplicación real debe usarse un hash (bcrypt, argon2).

## Stack técnico

| Tecnología    | Uso                                    |
| ------------- | -------------------------------------- |
| Next.js 16    | Framework (App Router, Server Actions) |
| Prisma 7      | ORM                                    |
| SQLite        | Base de datos (archivo local)          |
| TypeScript    | Lenguaje                               |
| Tailwind CSS  | Estilos                                |

## Instalación y ejecución local

Requisitos: Node.js 20+ y [pnpm](https://pnpm.io).

```bash
# 1. Clonar el repositorio
git clone https://github.com/LuisMartinGonzalez24/rd-market.git
cd rd-market

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Aplicar migraciones y generar el cliente de Prisma
pnpm prisma migrate dev

# 5. Levantar el servidor de desarrollo
pnpm dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

## Modelo de datos

```prisma
model Usuario {
  id       String   @id @default(cuid())
  nombre   String
  email    String   @unique
  password String
  creadoEn DateTime @default(now())
  compras  Compra[]
}

model Producto {
  id          String   @id @default(cuid())
  nombre      String
  descripcion String?
  precio      Float
  stock       Int
  categoria   String?
  creadoEn    DateTime @default(now())
  compras     Compra[]
}

model Compra {
  id         String   @id @default(cuid())
  usuarioId  String
  productoId String
  cantidad   Int
  fecha      DateTime @default(now())
  usuario    Usuario  @relation(fields: [usuarioId], references: [id])
  producto   Producto @relation(fields: [productoId], references: [id])
}
```

## Flujo de ramas (Git workflow)

El repositorio usa tres ramas principales — `main`, `qa` y `development` — y una rama `feature/*` por cada funcionalidad. Todo cambio llega a las ramas principales exclusivamente vía Pull Request con merge commit.

```
feature/setup-proyecto-base    ─┐
feature/crud-productos          ├──► development ──► qa ──► main
feature/crud-usuarios           │
feature/modulo-compras          │
feature/ui-navegacion           │
feature/documentacion-readme   ─┘
```

Proceso seguido para cada feature:

1. Crear la rama a partir de `development`.
2. Implementar la funcionalidad con commits pequeños y descriptivos.
3. Push de la rama y apertura de un Pull Request hacia `development`.
4. Merge del Pull Request (merge commit, sin squash).

Al completar todas las features: PR de `development` → `qa` y luego PR de `qa` → `main`.
