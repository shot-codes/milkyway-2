<script>
  import { Canvas, InteractiveObject, OrbitControls, T } from "@threlte/core";
  import { spring } from "svelte/motion";

  const scale = spring(1);
</script>

<div class="relative flex justify-center items-center w-full h-full">
  <div class="absolute top-0 w-full h-full">
    <Canvas>
      <T.PerspectiveCamera makeDefault position={[10, 0, 0]} fov={24}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={{ x: 0, y: 0, z: 0 }}
        />
      </T.PerspectiveCamera>

      <T.DirectionalLight castShadow position={[10, 2, -10]} />
      <T.AmbientLight intensity={0.2} />

      <T.Group scale={$scale}>
        <T.Mesh castShadow let:ref>
          <InteractiveObject
            object={ref}
            interactive
            on:pointerenter={() => ($scale = 2)}
            on:pointerleave={() => ($scale = 1)}
          />

          <T.SphereGeometry />
          <T.MeshStandardMaterial color="#00ff00" />
        </T.Mesh>
      </T.Group>
    </Canvas>
  </div>
  <span
    class="text-[80pt] inline-block align-middle invert dark:invert-0 mix-blend-difference font-bold pointer-events-none"
  >
    Zibra
  </span>
</div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
