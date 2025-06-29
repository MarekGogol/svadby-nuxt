export const useLocaleStore = defineStore('locale', {
    state() {
        return {
            locale: 'sk',
            languages: [],
            translations: null,
        };
    },

    actions: {},
    getters: {},
});