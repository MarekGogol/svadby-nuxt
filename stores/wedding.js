import { defineStore } from 'pinia';

export const useWedding = defineStore('wedding', {
    state: () => ({
        wedding: null,
        loading: true,
    }),

    actions: {
        async fetchWedding() {
            try {
                const { data } = await useAxios()
                    .loading((state) => (this.loading = state))
                    .$get('/api/wedding');

                this.wedding = data.wedding;
            } catch (error) {
                console.error('Failed to fetch wedding data:', error);
            }
        },
    },
});
