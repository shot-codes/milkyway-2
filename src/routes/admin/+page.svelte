<script lang="ts">
  import { signOut, getUser } from "@lucia-auth/sveltekit/client";
  import { invalidateAll } from "$app/navigation";

  const user = getUser();
</script>

<h1>Admin 🔒</h1>

<div>
  <p>User id: {$user?.userId}</p>
  <p>Username: {$user?.username}</p>
</div>

<button
  on:click={async () => {
    await signOut();
    invalidateAll();
  }}>Sign out</button
>
