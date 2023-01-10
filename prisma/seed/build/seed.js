var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { PrismaClient } from "@prisma/client";
import users from "./data/users.js";
import materials from "./data/materials.js";
import planets from "./data/planets.js";
import systems from "./data/systems.js";
import configs from "./data/configs.js";
const prisma = new PrismaClient();
const runSeeders = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Create data
    yield Promise.all(
      users.map((x) =>
        __awaiter(void 0, void 0, void 0, function* () {
          return prisma.user.upsert({
            where: { id: x.id },
            update: {},
            create: x,
          });
        })
      )
    );
    yield Promise.all(
      materials.map((x) =>
        __awaiter(void 0, void 0, void 0, function* () {
          return prisma.material.upsert({
            where: { id: x.id },
            update: {},
            create: x,
          });
        })
      )
    );
    yield Promise.all(
      planets.map((x) =>
        __awaiter(void 0, void 0, void 0, function* () {
          return prisma.planet.upsert({
            where: { id: x.id },
            update: {},
            create: x,
          });
        })
      )
    );
    yield Promise.all(
      systems.map((x) =>
        __awaiter(void 0, void 0, void 0, function* () {
          return prisma.system.upsert({
            where: { id: x.id },
            update: {},
            create: x,
          });
        })
      )
    );
    yield Promise.all(
      configs.map((x) =>
        __awaiter(void 0, void 0, void 0, function* () {
          return prisma.systemConfig.upsert({
            where: { id: x.id },
            update: {},
            create: x,
          });
        })
      )
    );
    // Create n-n self relations on System
    yield prisma.system.update({
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
    yield prisma.system.update({
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
    yield prisma.system.update({
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
  });
runSeeders()
  .then(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      console.log("database seeded");
      yield prisma.$disconnect();
    })
  )
  .catch((e) =>
    __awaiter(void 0, void 0, void 0, function* () {
      console.error(e);
      yield prisma.$disconnect();
      process.exit(1);
    })
  );
