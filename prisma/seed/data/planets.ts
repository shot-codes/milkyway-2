import { Planet } from "@prisma/client";

export default [
  {
    id: "planet1",
    archived: false,
    name: "sun",
    radius: 3,
    materialId: "material1",
  },
  {
    id: "planet2",
    archived: false,
    name: "earth",
    radius: 2,
    materialId: "material2",
  },
  {
    id: "planet3",
    archived: false,
    name: "moon",
    radius: 1,
    materialId: "material3",
  },
  {
    id: "planet4",
    archived: false,
    name: "mars",
    radius: 1.5,
    materialId: "material2",
  },
] satisfies Planet[];
