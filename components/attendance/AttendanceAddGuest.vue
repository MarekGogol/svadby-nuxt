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
    margin-bottom: 3rem;
    padding: 2rem 0;
    border-top: 1px solid rgba(168, 144, 132, 0.1);
    border-bottom: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        margin-bottom: 4rem;
    }
}

.add-guest-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(168, 144, 132, 0.1));
    border: 2px dashed rgba(139, 115, 85, 0.3);
    border-radius: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
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
        font-size: 1.2rem;
        font-weight: bold;
    }

    @media (min-width: 768px) {
        padding: 1.25rem 2.5rem;
        font-size: 1rem;
        gap: 1rem;
    }
}
</style>