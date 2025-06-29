<template>
    <div class="guest-header">
        <div v-if="guest && canUpdateAttendance" class="current-guest">
            <h2>{{ guest.username }}</h2>
            <div class="attendance-buttons">
                <button
                    class="btn-attendance"
                    :class="{ active: guest.attendance === true }"
                    @click="updateAttendance(true)"
                >
                    {{ __('Prídem') }}
                </button>
                <button
                    class="btn-attendance"
                    :class="{ active: guest.attendance === false }"
                    @click="updateAttendance(false)"
                >
                    {{ __('Neprídem') }}
                </button>
            </div>
        </div>
        <div v-else-if="guest" class="guest-info">
            <h2>{{ guest.username }}</h2>
            <div class="attendance-status">
                {{ guest.attendance ? __('Príde') : __('Nepríde') }}
            </div>
        </div>
        <div v-else class="guest-prompt">
            {{ __('Vyberte svoje meno zo zoznamu nižšie') }}
        </div>
    </div>
</template>

<script setup>
const guestsStore = useGuestsStore();
const guest = computed(() => guestsStore.currentGuest);
const canUpdateAttendance = computed(() => guestsStore.canUpdateAttendance);

const updateAttendance = async (attendance) => {
    await guestsStore.updateAttendance(attendance);
};
</script>

<style lang="scss" scoped>
.guest-header {
    text-align: center;
    padding: 0 0 1.5rem;
    border-bottom: 1px solid rgba(168, 144, 132, 0.2);
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        padding: 0 0 2rem;
        margin-bottom: 3rem;
    }
}

.current-guest, .guest-info {
    h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        font-weight: normal;
        margin-bottom: 1rem;
        color: #5a4a3a;

        @media (min-width: 768px) {
            font-size: 2rem;
            margin-bottom: 1.5rem;
        }
    }
}

.guest-info {
    .attendance-status {
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        color: #8b7355;
        font-style: italic;

        @media (min-width: 768px) {
            font-size: 1.1rem;
        }
    }
}

.guest-prompt {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #8b7355;
    font-style: italic;
    padding: 0 1rem;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
}

.attendance-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    padding: 0 1rem;

    @media (min-width: 768px) {
        gap: 1rem;
    }

    .btn-attendance {
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(168, 144, 132, 0.4);
        background: rgba(255, 255, 255, 0.8);
        color: #8b7355;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.85rem;
        letter-spacing: 0.1rem;
        flex: 1;
        max-width: 150px;
        border-radius: 6px;

        @media (min-width: 768px) {
            padding: 0.5rem 2rem;
            font-size: 0.9rem;
            flex: 0 1 auto;
        }

        &:hover {
            border-color: #5a4a3a;
            color: #5a4a3a;
            background: rgba(255, 255, 255, 0.95);
        }

        &.active {
            background: #5a4a3a;
            border-color: #5a4a3a;
            color: white;
        }
    }
}
</style>