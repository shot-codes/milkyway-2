<script>
  import { InteractiveObject, T, useFrame } from "@threlte/core";
  import { materials, updateMaterialLayers } from "$app3d/utils/materials";
  import { spring } from "svelte/motion";

  let layerMaterial = materials.MARBLE.material();
  let stopwatch = 0;

  layerMaterial = updateMaterialLayers(layerMaterial, "scale", 1);

  useFrame(() => {
    stopwatch += 0.001;
    let offsetRate = stopwatch * 1.2;
    layerMaterial = updateMaterialLayers(layerMaterial, "offset", [
      offsetRate,
      offsetRate,
      offsetRate,
    ]);
  });

  const scale = spring(1);
</script>

<T.Mesh castShadow material={layerMaterial} let:ref scale={$scale}>
  <InteractiveObject
    object={ref}
    interactive
    on:pointerenter={() => ($scale = 2)}
    on:pointerleave={() => ($scale = 1)}
  />
  <T.SphereGeometry />
</T.Mesh>
