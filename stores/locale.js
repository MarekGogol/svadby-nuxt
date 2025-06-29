import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', {
    state() {
        return {
            locale: 'sk',
            languages: [],
            translations: null,
        };
    },

    persist: true,

    actions: {},
    getters: {},
});