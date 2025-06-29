<template>
    <div class="attendees-summary">
        <h3 class="summary-title">{{ __('Potvrdení hostia') }}</h3>
        <div class="summary-list">
            <div 
                v-for="(attendee, index) in attendees" 
                :key="attendee.id"
                class="summary-item"
            >
                <div class="attendee-details">
                    <div class="attendee-name">{{ attendee.name }}</div>
                    <div v-if="attendee.allergies" class="attendee-notes">
                        {{ attendee.allergies }}
                    </div>
                </div>
                <div class="attendance-status">
                    <button
                        @click="handleToggle(attendee.id)"
                        class="status-toggle"
                        :class="{ 'attending': attendee.attendance, 'not-attending': !attendee.attendance }"
                    >
                        {{ attendee.attendance ? __('Prídem') : __('Neprídem') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    attendees: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['toggle-attendance']);

const handleToggle = (id) => {
    emit('toggle-attendance', id);
};
</script>

<style lang="scss" scoped>
.attendees-summary {
    text-align: left;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    border: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        padding: 2.5rem;
        margin-bottom: 4rem;
    }
}

.summary-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;
    text-align: center;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
}

.summary-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 1.5rem;
    }
}

.summary-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    border: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        padding: 2rem;
    }
}

.attendee-details {
    flex: 1;
}

.attendee-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #5a4a3a;
    font-weight: 500;
    margin-bottom: 0.25rem;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
}

.attendee-notes {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #8b7355;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}

.attendance-status {
    margin-left: 1rem;
}

.status-toggle {
    padding: 0.75rem 1.5rem;
    border: 2px solid;
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;

    &.attending {
        background: rgba(39, 174, 96, 0.1);
        border-color: #27ae60;
        color: #27ae60;

        &:hover {
            background: rgba(39, 174, 96, 0.2);
            transform: translateY(-1px);
        }
    }

    &.not-attending {
        background: rgba(231, 76, 60, 0.1);
        border-color: #e74c3c;
        color: #e74c3c;

        &:hover {
            background: rgba(231, 76, 60, 0.2);
            transform: translateY(-1px);
        }
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: 1rem;
        min-width: 120px;
    }
}
</style>