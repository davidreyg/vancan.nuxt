import es from '~/utils/yup-es';
import { defaultLocale, setLocale } from 'yup';

export default defineNuxtPlugin({
  name: 'my-plugin',
  enforce: 'pre', // or 'post'
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    'app:created'(vue) {
      const locale = vue.$nuxt.$i18n.locale;
      switch (locale.value) {
        case 'es':
          setLocale(es(vue.$nuxt.$i18n.t));
          break;
        case 'en':
          setLocale(defaultLocale);
          break;
      }

      // do something in the hook
    },
  },
});
