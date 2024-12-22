<template>
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar>
      <UiSidebarHeader>
        <NuxtLink to="/" class="flex w-full items-center">
          <UiAvatar src="/logo.png" alt="Company Logo" class="h-20 w-full object-contain" />
        </NuxtLink>
      </UiSidebarHeader>
      <UiSidebarContent class="mt-6">
        <UiSidebarGroup>
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in items" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <a :href="item.url">
                    <Icon :name="item.icon" size="20px" />
                    <span class="text-lg">{{ item.title }}</span>
                  </a>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
      <!-- footer -->
      <!-- Footer-->
      <UiSidebarFooter>
        <UiSidebarMenu>
          <UiSidebarMenuItem>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiSidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <UiAvatar class="size-8 rounded-lg">
                    <UiAvatarFallback class="rounded-lg">{{
                      data?.nombre_completo
                        .split(' ')
                        .map((word) => word.charAt(0).toLowerCase())
                        .join('')
                        .toUpperCase()
                    }}</UiAvatarFallback>
                  </UiAvatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ data?.nombre_completo }}</span>
                    <span class="truncate text-xs">{{ data?.groups_object[0].name }}</span>
                  </div>
                  <Icon name="lucide:chevrons-up-down" class="ml-auto size-4" />
                </UiSidebarMenuButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                :side="isMobile ? 'bottom' : 'right'"
                :side-offset="4"
                align="end"
              >
                <UiDropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UiAvatar class="size-8 rounded-lg">
                      <!-- <UiAvatarImage :src="data.user.avatar" :alt="data.user.name" /> -->
                      <UiAvatarFallback class="rounded-lg">{{
                        data?.nombre_completo
                          .split(' ')
                          .map((word) => word.charAt(0).toLowerCase())
                          .join('')
                          .toUpperCase()
                      }}</UiAvatarFallback>
                    </UiAvatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data?.nombre_completo }}</span>
                      <span class="truncate text-xs">{{ data?.groups_object[0].name }}</span>
                    </div>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem icon="lucide:sparkles" title="Upgrade to Pro" />
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuGroup>
                  <UiDropdownMenuItem icon="lucide:badge-check" title="Account" />
                  <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
                  <UiDropdownMenuItem icon="lucide:settings-2" title="Settings" />
                  <UiDropdownMenuItem icon="lucide:bell" title="Notifications" />
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  icon="lucide:log-out"
                  :title="$t('words.logout')"
                  @click="() => signOut({ callbackUrl: '/auth/login' })"
                />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiSidebarMenuItem>
        </UiSidebarMenu>
      </UiSidebarFooter>
    </UiSidebar>
    <UiSidebarInset>
      <UiNavbar sticky>
        <UiContainer class="flex h-12 items-center justify-between">
          <UiSidebarTrigger />
          <div class="flex items-center gap-x-2">
            <div v-if="data" class="">
              <span class="font-bold">{{ $t('words.hello') }} </span>{{}}
              <span class="italic"> {{ data.username }}</span>
            </div>
            <div>
              <UiSelect v-model="option">
                <UiSelectTrigger placeholder="Select an option" />
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem
                      v-for="(l, i) in locales"
                      :key="i"
                      :value="l.code"
                      :text="l.name"
                      :icon="l.code === 'en' ? 'circle-flags:us' : 'circle-flags:es'"
                    />
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div>
              <UiButton
                size="icon"
                variant="ghost"
                @click="() => signOut({ callbackUrl: '/auth/login' })"
              >
                <Icon class="size-4" name="lucide:log-out" />
              </UiButton>
            </div>
          </div>
        </UiContainer>
      </UiNavbar>
      <UiContainer class="flex h-12 items-center">
        <slot />
      </UiContainer>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>
<script lang="ts" setup>
  // Menu items.
  const items = [{ title: 'Mascotas', url: '/mascotas', icon: 'lucide:dog' }];

  const { signOut, data } = useAuth();
  const { locales, setLocale, locale } = useI18n();
  const option = ref<'es' | 'en'>(locale.value);

  // Observa los cambios en `option.value`
  watch(option, (newValue) => setLocale(newValue));
</script>
