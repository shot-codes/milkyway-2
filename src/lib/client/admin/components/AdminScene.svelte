<script lang="ts">
  import type { BackgroundKey } from "@prisma/client";
  import { Canvas } from "@threlte/core";
  import Background from "$app3d/components/Background.svelte";

  export let background: BackgroundKey;
</script>

<Canvas>
  <Background {background} />
</Canvas>
