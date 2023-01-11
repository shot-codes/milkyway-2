<script lang="ts">
  import {
    OrbitControls,
    T,
    TransformableObject,
    useThrelte,
  } from "@threlte/core";
  import { degToRad } from "three/src/math/MathUtils";
  import { Vector3, Mesh } from "three";
  import { spring } from "svelte/motion";

  const { pointer } = useThrelte();
  let cameraOrigin = new Vector3(60, 15, 0);
  let cameraPosition = new Vector3(60, 15, 0);
  let mesh: Mesh;

  const cameraPositionSpring = spring([60, 15, 0]);
  $: {
    cameraPositionSpring.set([
      cameraOrigin.x,
      cameraOrigin.y + 8 * $pointer.y,
      cameraOrigin.z - 8 * $pointer.x,
    ]);
  }
  $: {
    cameraPosition.set(
      $cameraPositionSpring[0],
      $cameraPositionSpring[1],
      $cameraPositionSpring[2]
    );
    // cameraPosition = cameraPosition;
  }
</script>

<T.Mesh bind:ref={mesh} scale={0.1} position={[0, 0, 0]}>
  <T.SphereGeometry />
</T.Mesh>

<T.PerspectiveCamera let:ref makeDefault fov={30}>
  <!-- <TransformableObject object={ref} lookAt={mesh} position={cameraPosition} /> -->
  <TransformableObject object={ref} position={cameraPosition} />
  <OrbitControls enableDamping maxPolarAngle={degToRad(150)} />
</T.PerspectiveCamera>
