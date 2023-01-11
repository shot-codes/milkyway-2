import { SystemConfig, BackgroundKey } from "@prisma/client";

export default [
  {
    id: "systemConfig1",
    archived: false,
    name: "config 1",
    background: BackgroundKey.PURPLE,
    systemId: "system1",
  },
] satisfies SystemConfig[];
