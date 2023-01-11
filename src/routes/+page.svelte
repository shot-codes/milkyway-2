<script lang="ts">
  import { Canvas } from "@threlte/core";
  import type { PageData } from "./$types";
  import Scene from "$app3d/components/Scene.svelte";
  import Navbar from "$app3d/components/Navbar.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Zibra</title>
</svelte:head>

<Navbar />

{#if data.systemConfig}
  <div class="absolute top-0 left-0 h-full w-full">
    <Canvas>
      <Scene systemConfig={data.systemConfig} />
    </Canvas>
  </div>
{/if}
