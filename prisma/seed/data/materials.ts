import { Material, MaterialKey } from "@prisma/client";

export default [
  {
    id: "material1",
    archived: false,
    key: MaterialKey.CORE,
    offsetRate: 0.2,
    scale: 0.2,
  },
  {
    id: "material2",
    archived: false,
    key: MaterialKey.MARBLE,
    offsetRate: 1,
    scale: 1,
  },
  {
    id: "material3",
    archived: false,
    key: MaterialKey.MARBLE,
    offsetRate: 10,
    scale: 10,
  },
] satisfies Material[];
