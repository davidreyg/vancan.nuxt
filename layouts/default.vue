<template>
  <UiSidebarProvider v-slot="{ isMobile }">
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="XD" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in items" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <a :href="item.url">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
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
                    <UiAvatarFallback class="rounded-lg">BB</UiAvatarFallback>
                  </UiAvatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">David rey</span>
                    <span class="truncate text-xs">dav@gmail.com</span>
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
                      <UiAvatarFallback class="rounded-lg">DR</UiAvatarFallback>
                    </UiAvatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">David Rey</span>
                      <span class="truncate text-xs">dav@gmail.com</span>
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
                  title="Log out"
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
          <div class="flex items-center gap-x-4">
            <div v-if="data" class="flex-auto">
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
  const items = [
    { title: 'Home', url: '#', icon: 'lucide:home' },
    { title: 'Inbox', url: '#', icon: 'lucide:inbox' },
    { title: 'Calendar', url: '#', icon: 'lucide:calendar' },
    { title: 'Search', url: '#', icon: 'lucide:search' },
    { title: 'Settings', url: '#', icon: 'lucide:settings' },
  ];

  const { signOut, data } = useAuth();
  const { locales, setLocale, locale } = useI18n();
  const option = ref<'es' | 'en'>(locale.value);

  // Observa los cambios en `option.value`
  watch(option, (newValue) => setLocale(newValue));
</script>
