<template>
  <div>
    <!-- HEADER -->
    <div class="text-lg font-bold">Mascotas vacunadas por RIS</div>

    <div class="mt-10 flex flex-col justify-between gap-5">
      <form class="w-full">
        <UiCard title="Filtros">
          <template #content>
            <UiCardContent>
              <div class="grid w-full grid-cols-2 items-center gap-4">
                <UiVeeInput name="start_date" label="Fecha de Inicio" type="date" required />
                <UiVeeInput name="end_date" label="Fecha de Fin" type="date" required />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter class="flex justify-between">
              <UiButton type="submit">Deploy</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
