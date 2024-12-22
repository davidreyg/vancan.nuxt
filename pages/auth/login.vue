<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="mt-10 w-full max-w-[450px] border border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
    >
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ $t('login.title') }}</h1>
      <p class="mt-1 text-muted-foreground">{{ $t('login.subtitle') }}</p>
      <div>
        <UiSelect v-model="option">
          <UiSelectTrigger placeholder="Select an option" />
          <UiSelectContent>
            <UiSelectGroup>
              <UiSelectItem v-for="(l, i) in locales" :key="i" :value="l.code" :text="l.name" />
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
      </div>
      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <div>
            <UiVeeInput
              :label="$t('fields.username')"
              name="username"
              placeholder="12345678"
              required
            />
          </div>
          <div>
            <UiVeeInput :label="$t('fields.password')" type="password" name="password" />
          </div>
          <div>
            <UiButton class="w-full" type="submit" :text="$t('login.title')" />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from 'yup';
  import type { InferType } from 'yup';

  const { t, locales, setLocale, locale } = useI18n();

  definePageMeta({
    layout: 'auth',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/',
      override: true,
    },
  });

  useSeoMeta({
    title: t('login.title'),
    description: t('login.subtitle'),
  });

  const { signIn } = useAuth();
  const LoginSchema = object({
    username: string().min(3).required(),
    password: string().required(),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (values, { setFieldError }) => {
    await signIn(values, { callbackUrl: '/', redirect: true })
      .then(() => {
        useSonner(t('login.notification_title'), {
          description: t('login.notification_description'),
        });
      })
      .catch((err) => {
        setFieldError('username', err.response._data.non_field_errors[0]);
      });
  });

  const option = ref<'es' | 'en'>(locale.value);

  // Observa los cambios en `option.value`
  watch(option, (newValue) => setLocale(newValue));
  // const fruits = locales.value;
</script>
