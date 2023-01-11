import {
  LayerMaterial,
  Noise,
  Gradient,
  Depth,
  Fresnel,
  Displace,
} from "lamina/vanilla";
import { BackSide, Color } from "three";
import type { MaterialKey, BackgroundKey } from "@prisma/client";

// These store background and material data that isn't stored in the db.
interface Background {
  fogColor: Color;
  lightColor: Color;
  material: LayerMaterial;
}

interface Material {
  material: NewLayerMaterial;
}

type NewLayerMaterial = () => LayerMaterial;

type Materials = {
  [key in MaterialKey]: Material;
};

type Backgrounds = {
  [key in BackgroundKey]: Background;
};

// Animates displaement and noice layers
export const updateMaterialLayers = (
  material: LayerMaterial,
  key: string,
  value: unknown
): LayerMaterial => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    material.layers.find((l) => l.name === "noise")[key] = value;
  } catch {
    /* empty */
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    material.layers.find((l) => l.name === "Displace")[key] = value;
  } catch {
    /* empty */
  }
  return material;
};

export const backgrounds: Backgrounds = {
  PURPLE: {
    fogColor: new Color("#ff9090"),
    lightColor: new Color("#ff9090"),
    material: new LayerMaterial({
      side: BackSide,
      fog: false,
      layers: [
        new Gradient({
          colorA: new Color("#002b4d").convertSRGBToLinear(),
          colorB: new Color("#ff4040").convertSRGBToLinear(),
          alpha: 1,
          contrast: 0.5,
          start: 1,
          end: -4,
          axes: "x",
          mapping: "local",
          visible: true,
        }),
        new Noise({
          mapping: "local",
          type: "white",
          scale: 1,
          colorA: "white",
          colorB: "black",
          mode: "subtract",
          alpha: 0.2,
        }),
      ],
    }),
  },

  GREEN: {
    fogColor: new Color("#90ff90"),
    lightColor: new Color("#90ff90"),
    material: new LayerMaterial({
      side: BackSide,
      fog: false,
      layers: [
        new Gradient({
          colorA: new Color("#005030").convertSRGBToLinear(),
          colorB: new Color("#0000ff").convertSRGBToLinear(),
          alpha: 1,
          contrast: 0.5,
          start: 1,
          end: -4,
          axes: "x",
          mapping: "local",
          visible: true,
        }),
        new Noise({
          mapping: "local",
          type: "white",
          scale: 1,
          colorA: "white",
          colorB: "black",
          mode: "subtract",
          alpha: 0.2,
        }),
      ],
    }),
  },
};

export const materials: Materials = {
  MARBLE: {
    material: () => {
      return new LayerMaterial({
        color: "#ffffff",
        lighting: "physical",
        layers: [
          new Noise({
            colorA: new Color("#1720a8"),
            colorB: new Color("#9428a9"),
            colorC: new Color("#f2feeb"),
            colorD: new Color("#f0fef4"),
            alpha: 1,
            scale: 3,
            type: "curl",
            offset: [4.95, 0.35, 0.4],
            mapping: "local",
            mode: "normal",
            visible: true,
          }),
          new Depth({
            colorA: new Color("#4166fc"),
            colorB: new Color("#0030f1"),
            alpha: 0.8,
            near: 0.4854,
            far: 0.7661999999999932,
            origin: [-0.4920000000000004, 0.4250000000000003, 0],
            mapping: "vector",
            mode: "multiply",
            visible: true,
          }),
          new Fresnel({
            color: new Color("#fc0000"),
            alpha: 1,
            power: 2,
            intensity: 1,
            bias: 0,
            mode: "screen",
            visible: true,
          }),
        ],
      });
    },
  },

  CORE: {
    material: () => {
      return new LayerMaterial({
        color: "#ff0000",
        lighting: "standard",
        layers: [
          new Noise({
            colorA: new Color("#ecd5d5"),
            colorB: new Color("#0b090a"),
            colorC: new Color("#cb4d80"),
            colorD: new Color("#ffffff"),
            alpha: 0.35,
            scale: 1,
            type: "perlin",
            offset: [0, 0, 0],
            mapping: "local",
            mode: "normal",
            visible: true,
          }),
          new Noise({
            mapping: "local",
            type: "white",
            scale: 1,
            colorA: "white",
            colorB: "black",
            mode: "subtract",
            alpha: 0.2,
          }),
          new Fresnel({
            color: new Color("#eeff00"),
            alpha: 0.3,
            power: 2.75,
            intensity: 3.8,
            bias: 0,
            mode: "normal",
            visible: true,
          }),
          new Displace({
            strength: 6.45,
            scale: 1,
            type: "perlin",
            offset: [0, 0, 0],
            mode: "normal",
            visible: true,
          }),
        ],
      });
    },
  },
};
