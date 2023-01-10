import { PrismaClient } from "@prisma/client";
import users from "./data/users.js";
import materials from "./data/materials.js";
import planets from "./data/planets.js";
import systems from "./data/systems.js";
import configs from "./data/configs.js";

const prisma = new PrismaClient();

const runSeeders = async () => {
  // Create data
  await Promise.all(
    users.map(async (x) =>
      prisma.user.upsert({
        where: { id: x.id },
        update: {},
        create: x,
      })
    )
  );
  await Promise.all(
    materials.map(async (x) =>
      prisma.material.upsert({
        where: { id: x.id },
        update: {},
        create: x,
      })
    )
  );
  await Promise.all(
    planets.map(async (x) =>
      prisma.planet.upsert({
        where: { id: x.id },
        update: {},
        create: x,
      })
    )
  );
  await Promise.all(
    systems.map(async (x) =>
      prisma.system.upsert({
        where: { id: x.id },
        update: {},
        create: x,
      })
    )
  );
  await Promise.all(
    configs.map(async (x) =>
      prisma.systemConfig.upsert({
        where: { id: x.id },
        update: {},
        create: x,
      })
    )
  );

  // Create n-n self relations on System
  await prisma.system.update({
    where: {
      id: "system1",
    },
    data: {
      children: {
        connect: {
          id: "system2",
        },
      },
    },
  });
  await prisma.system.update({
    where: {
      id: "system1",
    },
    data: {
      children: {
        connect: {
          id: "system4",
        },
      },
    },
  });
  await prisma.system.update({
    where: {
      id: "system2",
    },
    data: {
      children: {
        connect: {
          id: "system3",
        },
      },
    },
  });
};
runSeeders()
  .then(async () => {
    console.log("database seeded");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
