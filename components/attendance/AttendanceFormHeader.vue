<template>
    <div class="form-header">
        <div class="decorative-line"></div>
        <h2 class="form-title">{{ __('Potvrdenie účasti') }}</h2>
        <div class="decorative-line"></div>
    </div>
</template>

<style lang="scss" scoped>
.form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 1.5rem;

    @media (min-width: 768px) {
        margin-bottom: 4rem;
        gap: 2rem;
    }
}

.decorative-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(139, 115, 85, 0.3),
        transparent
    );
    max-width: 100px;

    @media (min-width: 768px) {
        max-width: 150px;
    }
}

.form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #5a4a3a;
    font-weight: normal;
    white-space: nowrap;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 1.8rem;
    }
}
</style>