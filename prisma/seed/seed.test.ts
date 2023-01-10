import { describe, it, expect } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("database seed", () => {
  it("database has intial config", async () => {
    const config = await prisma.systemConfig.findUnique({
      where: {
        id: "systemConfig1",
      },
    });
    expect(config?.name).toBe("config 1");
  });
});
