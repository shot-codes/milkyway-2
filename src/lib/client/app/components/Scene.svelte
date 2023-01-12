<script lang="ts">
  import type { SystemConfig } from "$app3d/utils/types";
  import { backgrounds } from "$app3d/utils/materials";
  import { Fog } from "@threlte/core";
  import Planet from "$app3d/components/Planet.svelte";
  import Camera from "$app3d/components/Camera.svelte";
  import Background from "./Background.svelte";

  export let systemConfig: SystemConfig;
</script>

<Fog
  color={backgrounds[systemConfig.background].fogColor}
  near={50}
  far={120}
/>
<Background background={systemConfig.background} />
<Camera />
<Planet planetSystem={systemConfig.system} orbitRadius={16} />
