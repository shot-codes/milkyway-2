<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { signOut, getUser } from "@lucia-auth/sveltekit/client";
  import { invalidateAll } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { BackgroundKey } from "@prisma/client";
  import AdminScene from "$admin/components/AdminScene.svelte";

  export let form: ActionData;
  export let data: PageData;

  let recentlyUpdated = false;

  $: if (form?.success) {
    recentlyUpdated = true;
    setTimeout(() => {
      recentlyUpdated = false;
    }, 3000);
  }

  const user = getUser();
</script>

<svelte:head>
  <title>Zibra - Admin</title>
</svelte:head>

<div class="flex h-full w-full flex-col place-content-center items-center">
  <!-- Threlte Scene -->
  <div class="h-32 w-32">
    {#if data.systemConfig?.background}
      <AdminScene background={data.systemConfig.background} />
    {/if}
  </div>

  <!-- User Card -->
  <div class="border text-center">
    <img src={$user?.avatar_url} alt="avatar" class="mb-3 w-16 rounded-full" />
    <p>{$user?.username}</p>
    <button
      on:click={async () => {
        await signOut();
        invalidateAll();
      }}>Sign out</button
    >
  </div>

  <!-- Background Form -->
  <form use:enhance method="POST" action="?/update" class="flex space-x-2">
    <input name="systemId" type="hidden" value={data.systemConfig?.id} />
    <select
      name="background"
      class="flex-grow rounded rounded border border-base-300 p-1 dark:border-base-500 dark:bg-base-700"
    >
      <option value={BackgroundKey.PURPLE}>Purple</option>
      <option value={BackgroundKey.GREEN}>Green</option>
    </select>
    <button
      class="rounded border border-base-300 bg-base-200 p-1 px-4 dark:border-base-600 dark:bg-base-800"
      >Update</button
    >
  </form>

  <!-- Update feedback -->
  {#if recentlyUpdated}
    <div
      transition:fade={{ duration: 200 }}
      class="absolute right-0 top-0 mr-6 flex place-items-center space-x-1 text-green-600"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"
        />
      </svg>
      <p>config updated</p>
    </div>
  {/if}
</div>
