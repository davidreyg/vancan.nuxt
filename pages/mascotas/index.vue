<template>
  <div class="">
    <div class="text-lg">Mis mascotas</div>

    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <UiInput v-model="search" type="search" placeholder="Search" class="w-full md:w-96" />
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            <span>View</span>
            <Icon name="lucide:chevron-down" class="h-4 w-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
          <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuCheckboxItem
              v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              :checked="column.getIsVisible()"
              @update:checked="tableRef?.toggleColumnVisibility(column)"
            >
              <span class="text-sm capitalize">{{ column?.id }}</span>
            </UiDropdownMenuCheckboxItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <div v-if="data">
      <UiTanStackTable
        ref="tableRef"
        show-select
        :search="search"
        :data="data.results"
        :columns="columns"
        class="mt-5 rounded-md border"
        @ready="table = $event"
      >
        <template #empty>
          <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
            <Icon name="lucide:database" class="h-12 w-12 text-muted-foreground" />
            <span class="mt-2">No data available.</span>
          </div>
        </template>
      </UiTanStackTable>
    </div>

    <UiDialog v-model:open="open">
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-xl [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b border-border px-6 py-4 text-base">
            Editar Mascota
          </UiDialogTitle>
        </UiDialogHeader>
        <UiDialogDescription class="sr-only">
          Puede realizar la personlizacion de su mascota aqui.
        </UiDialogDescription>
        <div class="overflow-y-auto">
          <!-- Profile BG -->
          <div class="h-32">
            <div
              class="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted"
            >
              <img
                v-if="currentImage"
                class="h-full w-full object-cover"
                :src="currentImage"
                alt="Profile banner"
                width="512"
                height="96"
              />
            </div>
          </div>
          <!-- Avatar -->
          <div class="-mt-10 flex justify-center px-6">
            <div
              class="relative flex size-40 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10"
            >
              <img
                v-if="currentAvatarImage"
                :src="currentAvatarImage"
                class="h-full w-full object-cover"
                width="80"
                height="80"
                alt="Profile image"
              />

              <button
                type="button"
                class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                aria-label="Change profile picture"
                @click="handleAvatarClick()"
              >
                <Icon name="lucide:image-plus" class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="px-6 pb-6 pt-4">
            <form @submit="submit">
              <fieldset class="space-y-4" :disabled="isSubmitting">
                <div class="flex flex-col gap-4 sm:flex-row">
                  <UiVeeInput
                    :label="$t('fields.color')"
                    placeholder="James"
                    required
                    name="color"
                  />
                  <UiVeeInput
                    :label="$t('fields.breed')"
                    placeholder="Bond"
                    required
                    name="breed"
                  />
                </div>
                <div class="flex flex-col gap-4 sm:flex-row">
                  <UiVeeSelect :label="$t('fields.gender')" name="gender" required>
                    <option disabled value="">Escoja el sexo</option>
                    <option :value="1">MACHO</option>
                    <option :value="2">HEMBRA</option>
                  </UiVeeSelect>
                  <UiVeeInput :label="$t('fields.feeding')" required name="feeding" />
                </div>
                <UiVeeInput :label="$t('fields.name')" required name="name" />
                <div class="space-y-2">
                  <UiVeeTextarea :label="$t('fields.hobbies')" name="hobbies" />
                </div>
                <UiVeeCheckbox name="lost" :label="$t('fields.lost')" />
              </fieldset>
            </form>
          </div>
        </div>
        <UiDialogFooter class="border-t border-border px-6 py-4">
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline"> {{ $t('words.cancel') }} </UiButton>
          </UiDialogClose>
          <UiButton @click="submit()">{{ $t('words.save') }}</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, mixed, number, object, string } from 'yup';
  import type { ColumnDef, Table } from '@tanstack/vue-table';
  import type { Mascota } from '~/models/mascota';
  import type { InferType } from 'yup';

  const { data } = await useApiLazy<PaginatedResponse<Mascota[]>>('api/mascotas/', {
    server: false,
    query: { page_size: 1000, usuario: 'demo' },
  });
  const tableRef = ref();
  const table = ref<Table<Mascota> | null>(null);
  const search = ref('');
  const open = defineModel<boolean>({ default: false });
  const defaultBanner =
    'https://images.unsplash.com/photo-1474779751981-5d6bb8cb0a35?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const defaultAvatar =
    'https://png.pngtree.com/png-clipart/20230514/original/pngtree-smile-dog-on-white-background-png-image_9160783.png';

  // Image state
  const currentImage = ref<string | null>(defaultBanner);
  const currentAvatarImage = ref<string | null>(defaultAvatar);

  const { open: handleAvatarClick, onChange: onAvatarChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
    reset: true,
  });

  // Handle file change for Avatar
  onAvatarChange(async (files) => {
    if (!files || files.length === 0) {
      currentAvatarImage.value = defaultAvatar;
      return;
    }
    const file = files[0];
    const { execute } = useBase64(file);
    currentAvatarImage.value = await execute();
    setFieldValue('photo', file);
  });

  const columns: ColumnDef<Mascota>[] = [
    { accessorKey: 'id', header: 'ID', enableHiding: true },
    { accessorKey: 'nombre', header: 'Nombre', enableHiding: true },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return h(resolveComponent('UiBadge'), { variant: 'outline', class: 'capitalize' }, () => [
          row.original.sexo_nombre,
        ]);
      },
      enableHiding: true,
    },
    { accessorKey: 'raza', header: 'Raza', enableHiding: true },
    {
      accessorKey: 'actions',
      header: '',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return h(
          resolveComponent('UiButton'),
          {
            variant: 'ghost',
            size: 'icon',
            class: 'w-9 h-9',
            onClick: async () => {
              console.log('Button clicked');

              const { data: foundMascota } = await useApi<Mascota>(
                `api/mascotas/${row.original.id}/`,
                {
                  server: false,
                }
              );

              if (foundMascota.value) {
                open.value = !open.value;
                setValues({
                  breed: foundMascota.value.raza,
                  color: foundMascota.value.color,
                  feeding: foundMascota.value.alimentacion,
                  gender: foundMascota.value.sexo,
                  hobbies: foundMascota.value.hobbies,
                  lost: foundMascota.value.perdido,
                  name: foundMascota.value.nombre,
                  id: foundMascota.value.id,
                  // photo: foundMascota.value.foto,
                });
              } else {
                useSonner.error('Error al encontrar mascota', {
                  description: 'No se econtro la mascota solicitada.',
                });
              }
            },
          },
          () => [h(resolveComponent('Icon'), { name: 'lucide:more-horizontal', class: 'h-4 w-4' })]
        );
      },
    },
  ];

  const UpdateMascota = object({
    id: number().required(),
    name: string().required(),
    gender: number().required(),
    color: string().nullable(),
    breed: string().required(),
    hobbies: string().nullable(),
    feeding: string().nullable(),
    lost: boolean(),
    photo: mixed().nullable(),
  });

  const { handleSubmit, isSubmitting, setValues, setFieldValue } = useForm<
    InferType<typeof UpdateMascota>
  >({
    validationSchema: UpdateMascota,
  });

  const submit = handleSubmit(
    async (values) => {
      console.log(values);
      const form = new FormData();
      form.append('perdido', values.lost + '');
      form.append('nombre', values.name);
      form.append('hobbies', values.hobbies + '');
      form.append('alimentacion', values.feeding + '');
      form.append('color', values.color + '');
      form.append('sexo', values.gender + '');
      if (values.photo) form.append('foto', values.photo as Blob);
      await useApi(`api/mascotas/${values.id}/update_details/`, {
        body: form,
        server: false,
        method: 'PATCH',
      });
      open.value = !open.value;
    },
    (error) => console.log({ error })
  );
</script>
