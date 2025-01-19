import { defineNuxtPlugin } from '#app';
import Translator from '../utils/Translator';

export default defineNuxtPlugin(async ({ route, redirect, vueApp, hook }) => {
    //Fetch translations
    let translations = useLocaleStore().translations || {};
    if (typeof translations === 'string') {
        translations = JSON.parse(translations);
    }

    let $translator = new Translator(translations);

    await $translator.install(vueApp);

    const $class = $translator.getTranslator();

    window.__ = $class.__.bind($class);
    window.n__ = $class.n__.bind($class);

    return {
        provide: {
            __: window.__,
            n__: window.n__,
            translator: $class,
        },
    };
});
