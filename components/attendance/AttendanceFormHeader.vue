<template>
    <div class="form-header">
        <h2 class="form-title">{{ __('Potvrdenie účasti') }}</h2>
    </div>
</template>

<style lang="scss" scoped>
.form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 1.5rem;

    @media (min-width: 768px) {
        margin-bottom: 2.5rem;
        gap: 2rem;
    }
}

.form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #5a4a3a;
    font-weight: normal;
    white-space: nowrap;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 1.6rem;
    }
}
</style>
