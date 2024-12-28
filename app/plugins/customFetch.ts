export default defineNuxtPlugin(() => {
  const userAuth = useCookie('auth.token');
  const config = useRuntimeConfig();
  //   console.log(userAuth.value);
  const $customFetch = $fetch.create({
    baseURL: config.public.authUrl,
    credentials: 'include',
    onRequest({ options }) {
      if (userAuth.value) {
        // Add Authorization header
        options.headers.set('Authorization', `token ${userAuth.value}`);
      }
    },
    //   onResponse({ response }) {
    //     // response._data = new myBusinessResponse(response._data)
    //   },
    //   onResponseError({ response }) {
    //     if (response.status === 401) {
    //       return navigateTo('/login')
    //     }
    //   },
  });
  // Expose to useNuxtApp().$customFetch
  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
