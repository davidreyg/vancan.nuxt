<template>
  <div v-if="data" class="mt-[600px]">
    <pre>{{ runtimeConfig.public.authUrl }}</pre>

    te encuentras {{ status }}
    <button @click="() => getSession()">Refresh</button>
  </div>

  <div v-else>nadaaa</div>
</template>
<script lang="ts" setup>
  useSeoMeta({
    title: 'Inicio',
    description: 'Página de inicio',
  });
  const runtimeConfig = useRuntimeConfig();
  const { data, status, getSession } = useAuth();
</script>
