<template>
  <div v-if="data" class="mt-[600px]">
    <pre>{{ runtimeConfig.public.authUrl }}</pre>

    te encuentras {{ status }}
    <button @click="() => getSession()">Refresh</button>
  </div>

  <div v-else>nadaaa</div>
</template>
<script lang="ts" setup>
  const { t } = useI18n();
  useSeoMeta({
    title: computed(() => t('pages.home.title')),
    description: () => t('pages.home.description'),
  });
  const runtimeConfig = useRuntimeConfig();
  const { data, status, getSession } = useAuth();
</script>
