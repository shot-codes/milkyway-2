<script lang="ts">
  import { page } from "$app/stores";
</script>

<nav class="absolute z-10 flex w-full items-center justify-between p-2 px-5">
  <div
    class=" my-1 w-full rounded-md bg-black bg-opacity-20 px-1 text-base-300 shadow-md backdrop-blur-lg dark:shadow-lg"
  >
    <ul class="m-2 flex space-x-4">
      <li>
        <a href="/" class:font-bold={$page.url.pathname === "/"}> Planets </a>
      </li>
      <li>
        <a
          href="/admin"
          class:font-bold={$page.url.pathname.startsWith("/admin")}
        >
          Admin
        </a>
      </li>
    </ul>
  </div>
</nav>
