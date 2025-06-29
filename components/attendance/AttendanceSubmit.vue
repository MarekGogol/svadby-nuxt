<template>
    <div class="submit-section">
        <div class="submit-ornament">✦</div>
        <button 
            @click="handleSubmit"
            :disabled="disabled"
            class="submit-button"
        >
            <span class="submit-text">{{ __('Potvrdiť účasť') }}</span>
            <span class="submit-icon">→</span>
        </button>
        <div class="submit-ornament">✦</div>
    </div>
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submit']);

const handleSubmit = () => {
    emit('submit');
};
</script>

<style lang="scss" scoped>
.submit-section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    @media (min-width: 768px) {
        gap: 2rem;
    }
}

.submit-ornament {
    font-size: 1.2rem;
    color: rgba(139, 115, 85, 0.4);
    
    @media (min-width: 768px) {
        font-size: 1.5rem;
    }
}

.submit-button {
    display: inline-flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #5a4a3a, #4a3a2a);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
        transition: opacity 0.3s ease;
    }

    &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(90, 74, 58, 0.3);
        
        .submit-icon {
            transform: translateX(5px);
        }
    }

    &:disabled {
        background: linear-gradient(135deg, #ccc, #bbb);
        cursor: not-allowed;
        opacity: 0.6;
        
        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    .submit-icon {
        transition: transform 0.3s ease;
        font-size: 1.1rem;
    }

    @media (min-width: 768px) {
        padding: 1.25rem 3.5rem;
        font-size: 1rem;
    }
}
</style>