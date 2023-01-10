var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
const seedData = [users, materials, planets, systems, configs];
const seedMethodKeys = ["user", "material", "planet", "system", "systemConfig"];
const runSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    // Seed all initial data
    seedData.forEach((data, i) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(data.map((x) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma[seedMethodKeys[i]].upsert({
                where: { id: x.id },
                update: {},
                create: x,
            });
        })));
    }));
    // Create n-n self relations on System
});
runSeeders()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("database seeded");
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
