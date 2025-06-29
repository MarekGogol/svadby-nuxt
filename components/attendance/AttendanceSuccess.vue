<template>
    <div class="success-state">
        <div class="success-card">
            <div class="success-icon-wrapper">
                <div class="success-icon">✓</div>
            </div>
            
            <h2 class="success-title">{{ __('Ďakujeme za potvrdenie!') }}</h2>
            <p class="success-message">
                {{ __('Vaša účasť bola úspešne zaznamenaná. Tešíme sa na Vás!') }}
            </p>

            <!-- Attendees Summary -->
            <AttendanceSuccessSummary 
                :attendees="attendees"
                @toggle-attendance="handleToggleAttendance"
            />

            <!-- Edit Button -->
            <div class="edit-section">
                <button @click="handleReset" class="edit-button">
                    {{ __('Upraviť údaje') }}
                </button>
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

const emit = defineEmits(['toggle-attendance', 'reset']);

const handleToggleAttendance = (id) => {
    emit('toggle-attendance', id);
};

const handleReset = () => {
    emit('reset');
};
</script>

<style lang="scss" scoped>
.success-state {
    max-width: 800px;
    margin: 0 auto;
}

.success-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 
        0 20px 40px rgba(90, 74, 58, 0.1),
        0 8px 16px rgba(90, 74, 58, 0.05);
    padding: 3rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-align: center;

    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
}

.success-icon-wrapper {
    margin-bottom: 2rem;
}

.success-icon {
    width: 5rem;
    height: 5rem;
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);

    @media (min-width: 768px) {
        width: 6rem;
        height: 6rem;
        font-size: 3rem;
    }
}

.success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: #5a4a3a;
    margin-bottom: 1rem;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
    }
}

.success-message {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #8b7355;
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
        font-size: 1.2rem;
        margin-bottom: 4rem;
    }
}

.edit-section {
    padding-top: 2rem;
    border-top: 1px solid rgba(168, 144, 132, 0.1);
}

.edit-button {
    padding: 1rem 2.5rem;
    background: transparent;
    color: #8b7355;
    border: 2px solid rgba(139, 115, 85, 0.3);
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(139, 115, 85, 0.1);
        border-color: #8b7355;
        color: #5a4a3a;
        transform: translateY(-2px);
    }

    @media (min-width: 768px) {
        padding: 1.25rem 3rem;
        font-size: 1rem;
    }
}
</style>