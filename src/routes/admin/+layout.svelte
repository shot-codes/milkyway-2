<script lang="ts">
  import { signOut, getUser } from "@lucia-auth/sveltekit/client";
  import { invalidateAll } from "$app/navigation";

  const user = getUser();
</script>

<nav class="fixed flex w-full place-items-center justify-between p-3 px-6">
  <span>Zibra</span>
  <span class="flex place-items-center space-x-4">
    <button
      on:click={async () => {
        await signOut();
        invalidateAll();
      }}>Sign out</button
    >

    <span>
      {$user?.username}
    </span>
    <img src={$user?.avatar_url} alt="avatar" class="w-10 rounded-full" />
  </span>
</nav>

<slot />
