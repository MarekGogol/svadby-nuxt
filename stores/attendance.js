import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', {
    state: () => ({
        attendees: [],
        isSubmitted: false,
    }),

    actions: {
        addAttendee() {
            this.attendees.push({
                id: Date.now() + Math.random(),
                name: '',
                allergies: '',
                attendance: true,
            });
        },

        removeAttendee(id) {
            this.attendees = this.attendees.filter(
                (attendee) => attendee.id !== id
            );
        },

        updateAttendee(id, field, value) {
            const attendee = this.attendees.find((a) => a.id === id);
            if (attendee) {
                attendee[field] = value;
            }
        },

        submitAttendance() {
            // Filter out empty names before submitting
            this.attendees = this.attendees.filter(
                (attendee) => attendee.name.trim() !== ''
            );
            this.isSubmitted = true;
        },

        resetForm() {
            this.attendees = [];
            this.isSubmitted = false;
        },

        toggleAttendance(id) {
            const attendee = this.attendees.find((a) => a.id === id);
            if (attendee) {
                attendee.attendance = !attendee.attendance;
            }
        },
    },

    getters: {
        hasValidAttendees: (state) => {
            return state.attendees.some(
                (attendee) => attendee.name.trim() !== ''
            );
        },
    },
});
