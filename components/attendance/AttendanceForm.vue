<template>
    <div class="attendance-form">
        <!-- Elegant Form Header -->
        <AttendanceFormHeader />

        <!-- Attendees Cards -->
        <div class="attendees-container">
            <AttendeeCard
                v-for="(attendee, index) in attendees"
                :key="attendee.id"
                :attendee="attendee"
                :index="index"
                :show-remove="attendees.length > 1"
                @update="updateAttendee"
                @remove="removeAttendee"
            />
        </div>

        <!-- Add Guest Button -->
        <AttendanceAddGuest @add="addAttendee" />

        <!-- Submit Section -->
        <AttendanceSubmit 
            :disabled="!hasValidAttendees"
            @submit="submitAttendance"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    attendees: {
        type: Array,
        required: true
    },
    hasValidAttendees: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['add-attendee', 'remove-attendee', 'update-attendee', 'submit']);

const addAttendee = () => {
    emit('add-attendee');
};

const removeAttendee = (id) => {
    emit('remove-attendee', id);
};

const updateAttendee = (id, field, value) => {
    emit('update-attendee', id, field, value);
};

const submitAttendance = () => {
    emit('submit');
};
</script>

<style lang="scss" scoped>
.attendance-form {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 
        0 20px 40px rgba(90, 74, 58, 0.1),
        0 8px 16px rgba(90, 74, 58, 0.05);
    padding: 1.5rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);

    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
}

.attendees-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        gap: 2.5rem;
        margin-bottom: 3rem;
    }
}
</style>