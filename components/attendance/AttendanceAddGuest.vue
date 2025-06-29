<template>
    <div class="add-guest-section">
        <button @click="handleAdd" class="add-guest-btn" type="button">
            <span class="btn-icon">+</span>
            <span class="btn-text">{{ __('Pridať ďalšieho hosťa') }}</span>
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['add']);

const handleAdd = () => {
    emit('add');
};
</script>

<style lang="scss" scoped>
.add-guest-section {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(168, 144, 132, 0.1);
    border-bottom: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        margin-bottom: 2.5rem;
    }
}

.add-guest-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.75rem;
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(168, 144, 132, 0.1));
    border: 2px dashed rgba(139, 115, 85, 0.3);
    border-radius: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: #5a4a3a;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 400;

    &:hover {
        background: linear-gradient(135deg, rgba(139, 115, 85, 0.15), rgba(168, 144, 132, 0.15));
        border-color: #8b7355;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 115, 85, 0.2);
    }

    .btn-icon {
        font-size: 1.1rem;
        font-weight: bold;
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: 0.95rem;
        gap: 1rem;
    }
}
</style>