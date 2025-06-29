<template>
    <div class="attendance-page">
        <!-- Hero Section with Background Image -->
        <AttendanceHero />

        <div class="main-content">
            <AttendanceForm
                v-if="!attendanceStore.isSubmitted"
                :attendees="attendanceStore.attendees"
                :has-valid-attendees="attendanceStore.hasValidAttendees"
                @add-attendee="addAttendee"
                @remove-attendee="removeAttendee"
                @update-attendee="updateAttendee"
                @submit="submitAttendance"
            />

            <AttendanceSuccess
                v-else
                :attendees="attendanceStore.attendees"
                @toggle-attendance="toggleAttendance"
                @reset="resetForm"
            />
        </div>

        <!-- Bottom gradient to blend with background -->
        <div class="bottom-gradient"></div>
    </div>
</template>

<script setup>
const attendanceStore = useAttendanceStore();

// Initialize with one empty attendee if none exist
onMounted(() => {
    if (attendanceStore.attendees.length === 0) {
        attendanceStore.addAttendee();
    }
});

const addAttendee = () => {
    attendanceStore.addAttendee();
};

const removeAttendee = (id) => {
    attendanceStore.removeAttendee(id);
};

const updateAttendee = (id, field, value) => {
    attendanceStore.updateAttendee(id, field, value);
};

const submitAttendance = () => {
    attendanceStore.submitAttendance();
};

const toggleAttendance = (id) => {
    attendanceStore.toggleAttendance(id);
};

const resetForm = () => {
    attendanceStore.resetForm();
    attendanceStore.addAttendee();
};
</script>

<style lang="scss" scoped>
.attendance-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f1f0 0%, #ede3e0 100%);
    position: relative;
}

.main-content {
    position: relative;
    z-index: 3;
    margin-top: -80px;
    padding: 0 1rem 3rem;

    @media (min-width: 768px) {
        padding: 0 2rem 4rem;
        margin-top: -100px;
    }
}

.bottom-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(246, 241, 240, 0.3) 30%,
        rgba(246, 241, 240, 0.8) 70%,
        #f6f1f0 100%
    );
    pointer-events: none;
    z-index: 1;
}
</style>