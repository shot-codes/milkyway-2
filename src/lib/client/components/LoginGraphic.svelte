<script>
  import { Canvas, InteractiveObject, OrbitControls, T } from "@threlte/core";
  import { spring } from "svelte/motion";

  const scale = spring(1);
</script>

<div class="relative flex h-full w-full items-center justify-center">
  <div class="absolute top-0 h-full w-full">
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
    class="pointer-events-none inline-block align-middle text-[80pt] font-bold mix-blend-difference invert dark:invert-0"
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
