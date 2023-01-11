<script lang="ts">
  import type { BackgroundKey } from "@prisma/client";
  import { T, useFrame } from "@threlte/core";
  import { degToRad } from "three/src/math/MathUtils";
  import { backgrounds } from "$app3d/utils/materials";
  import { Fog } from "@threlte/core";

  export let background: BackgroundKey;

  // Pan the background back and forth. This keeps the grain texture live.
  let backgroundRotation = degToRad(130);
  const maxDegree = degToRad(150);
  const minDegree = degToRad(110);
  let reverseBackgroundRotation = false;
  useFrame(() => {
    if (!reverseBackgroundRotation && backgroundRotation <= maxDegree) {
      backgroundRotation += 0.002;
    } else {
      reverseBackgroundRotation = true;
    }
    if (reverseBackgroundRotation && backgroundRotation >= minDegree) {
      backgroundRotation -= 0.002;
    } else {
      reverseBackgroundRotation = false;
    }
  });
</script>

<Fog color={backgrounds[background].fogColor} near={50} far={120} />
<T.AmbientLight intensity={0.15} />

<T.Group interactive rotation.y={backgroundRotation}>
  <T.Mesh material={backgrounds[background].material} scale={100}>
    <T.SphereGeometry />
  </T.Mesh>
  <T.DirectionalLight
    castShadow
    position={[-100, 10, 10]}
    color={backgrounds[background].lightColor}
  />
  <T.DirectionalLight position={[-100, 10, -10]} intensity={0.2} />
</T.Group>
