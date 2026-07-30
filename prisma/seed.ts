import prisma from "../src/lib/prisma";

async function main() {
  console.log("No hay datos de ejemplo por sembrar todavía.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
