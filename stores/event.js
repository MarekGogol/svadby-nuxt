import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
    state: () => ({
        event: null,
        loading: true,
    }),

    actions: {
        async fetchEvent() {
            try {
                const { data } = await useAxios()
                    .loading((state) => (this.loading = state))
                    .$get('/api/event');

                this.event = data.event;
            } catch (error) {
                console.error('Failed to fetch event data:', error);
            }
        },
    },
});
