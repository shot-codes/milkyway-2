<script lang="ts">
  import type { System } from "$app3d/utils/types";
  import { T, useFrame } from "@threlte/core";
  import { materials, updateMaterialLayers } from "$app3d/utils/materials";
  import OrbitRing from "./OrbitRing.svelte";

  // type System = Prisma.SystemGetPayload<{
  //   include: { planet: true, children: true }
  // }>

  export let planetSystem: System;
  export let orbitRadius: number;
  let stopwatch = 1;
  let material = materials[planetSystem.planet.material.key];
  let layerMaterial = material.material();

  layerMaterial = updateMaterialLayers(
    layerMaterial,
    "scale",
    planetSystem.planet.material.scale
  );

  useFrame(() => {
    stopwatch += 0.001;
    let offsetRate = stopwatch * planetSystem.planet.material.offsetRate;
    layerMaterial = updateMaterialLayers(layerMaterial, "offset", [
      offsetRate,
      offsetRate,
      offsetRate,
    ]);
  });
</script>

<T.Group>
  <!-- Planet -->
  <T.Mesh castShadow material={layerMaterial} rotation.y={-stopwatch * 0.75}>
    <T.SphereGeometry args={[planetSystem.planet.radius, 200, 200]} />
  </T.Mesh>

  <!-- Orbit -->
  <T.Group rotation.y={stopwatch * 10}>
    <!-- Orbiting Planets -->
    {#each planetSystem.children as p, i}
      <!-- Ring -->
      <OrbitRing />

      <T.Group
        position.x={orbitRadius *
          Math.cos((i * 2 * Math.PI) / planetSystem.children.length)}
        position.z={orbitRadius *
          Math.sin((i * 2 * Math.PI) / planetSystem.children.length)}
        rotation.y={stopwatch}
      >
        <!-- <Text text={p.text} scale={5} position={{ y: 2.5 }} /> -->
        <svelte:self planetSystem={p} orbitRadius={4} />
      </T.Group>
    {/each}
  </T.Group>
</T.Group>
