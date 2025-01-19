import { defineStore } from 'pinia';

export const useGuestsStore = defineStore('guests', {
    state: () => ({
        guests: [],
        tables: [],
        loading: false,
        currentGuest: null,
        userGuest: null
    }),

    actions: {
        async fetchGuests() {
            this.loading = true;
            try {
                const { data } = await useAxios().$get('/api/event/guests');
                this.guests = data.guests;
                this.tables = data.tables;
                this.userGuest = data.guest;
                
                if (this.userGuest) {
                    this.currentGuest = this.userGuest;
                }
            } catch (error) {
                console.error('Failed to fetch guests:', error);
            } finally {
                this.loading = false;
            }
        },

        async updateAttendance(attendance) {
            if (!this.currentGuest || this.currentGuest.id !== this.userGuest?.id) return;

            try {
                const { data } = await useAxios().$post(`/api/event/guests/${this.currentGuest.id}/attendance`, {
                    attendance: attendance ? 1 : 0
                });
                
                // Update local state with the response data
                if (data?.guest) {
                    const guest = this.guests.find(g => g.id === this.currentGuest.id);
                    if (guest) {
                        guest.attendance = data.guest.attendance;
                    }
                    if (this.userGuest) {
                        this.userGuest.attendance = data.guest.attendance;
                    }
                    if (this.currentGuest) {
                        this.currentGuest.attendance = data.guest.attendance;
                    }
                }
            } catch (error) {
                console.error('Failed to update attendance:', error);
            }
        },

        setCurrentGuest(guest) {
            if (guest.id === this.userGuest?.id) {
                this.currentGuest = guest;
            }
        }
    },

    getters: {
        guestsByTable: (state) => {
            const grouped = {};
            state.tables.forEach(table => {
                grouped[table.id] = state.guests.filter(guest => guest.table_id === table.id);
            });
            return grouped;
        },
        
        canUpdateAttendance: (state) => {
            return state.currentGuest?.id === state.userGuest?.id;
        }
    }
});