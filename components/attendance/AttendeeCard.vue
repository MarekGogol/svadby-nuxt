<template>
    <div class="attendee-card">
        <div class="card-header">
            <div class="guest-number">{{ index + 1 }}. {{ __('hosť') }}</div>
            <button 
                v-if="showRemove"
                @click="handleRemove"
                class="remove-button"
                type="button"
            >
                <span>×</span>
            </button>
        </div>
        
        <div class="card-content">
            <div class="input-group">
                <label class="input-label">{{ __('Meno a priezvisko') }}</label>
                <input
                    :value="attendee.name"
                    type="text"
                    :placeholder="__('Zadajte celé meno')"
                    class="elegant-input"
                    @input="handleUpdate('name', $event.target.value)"
                />
            </div>
            
            <div class="input-group">
                <label class="input-label">{{ __('Špeciálne požiadavky') }}</label>
                <input
                    :value="attendee.allergies"
                    type="text"
                    :placeholder="__('Alergie, diéta... (voliteľné)')"
                    class="elegant-input secondary"
                    @input="handleUpdate('allergies', $event.target.value)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    attendee: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    showRemove: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update', 'remove']);

const handleUpdate = (field, value) => {
    emit('update', props.attendee.id, field, value);
};

const handleRemove = () => {
    emit('remove', props.attendee.id);
};
</script>

<style lang="scss" scoped>
.attendee-card {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(168, 144, 132, 0.2);
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(90, 74, 58, 0.1);
        border-color: rgba(139, 115, 85, 0.3);
    }

    @media (min-width: 768px) {
        padding: 1.75rem;
    }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
        margin-bottom: 1.25rem;
    }
}

.guest-number {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #8b7355;
    font-weight: 500;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}

.remove-button {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    border: 1px solid rgba(231, 76, 60, 0.3);
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    margin: 0;

    span {
        font-size: 1.1rem;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-family: Arial, sans-serif;
        font-weight: normal;
        transform: translateY(-1px); /* Fine-tune vertical centering */
    }

    &:hover {
        background: #e74c3c;
        color: white;
        transform: scale(1.1);
    }

    @media (min-width: 768px) {
        width: 2rem;
        height: 2rem;
        
        span {
            font-size: 1.2rem;
        }
    }
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 1.25rem;
    }
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.input-label {
    font-family: 'Playfair Display', serif;
    font-size: 0.85rem;
    color: #5a4a3a;
    font-weight: 500;
    letter-spacing: 0.02rem;

    @media (min-width: 768px) {
        font-size: 0.9rem;
    }
}

.elegant-input {
    padding: 0.75rem 1rem;
    border: 2px solid rgba(168, 144, 132, 0.2);
    border-radius: 10px;
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    color: #5a4a3a;

    &:focus {
        outline: none;
        border-color: #8b7355;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
        transform: translateY(-1px);
    }

    &::placeholder {
        color: #a89084;
        font-style: italic;
    }

    &.secondary {
        border-style: dashed;
        border-color: rgba(168, 144, 132, 0.15);
        
        &:focus {
            border-style: solid;
        }
    }

    @media (min-width: 768px) {
        padding: 0.875rem 1.25rem;
        font-size: 0.95rem;
    }
}
</style>