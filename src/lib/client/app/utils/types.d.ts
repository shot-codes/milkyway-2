import type {
  System as pSystem,
  Planet as pPlanet,
  Material as pMaterial,
  SystemConfig as pSystemConfig,
} from "@prisma/client";

export interface SystemConfig extends pSystemConfig {
  system: System;
}

export interface System extends pSystem {
  planet: Planet;
  children: System[];
}

export interface Planet extends pPlanet {
  material: pMaterial;
}
