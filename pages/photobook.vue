<template>
    <div class="photobook-page">
        <PhotobookIntro />

        <div class="upload-section">
            <h2 class="section-title">{{ __('Nahrať fotografie') }}</h2>
            <PhotoUploader :show-title="true" />
        </div>

        <div class="preview-section">
            <h2 class="section-title">{{ __('Náhľad fotoknihy') }}</h2>
            <PhotobookGallery />
        </div>
    </div>
</template>

<script setup>
const galleryStore = useGalleryStore();
galleryStore.setType('photobook');

// Async data fetching
await galleryStore.fetchPhotos(1);
</script>

<style lang="scss" scoped>
.photobook-page {
    width: 100%;
    padding: 0;

    @media (min-width: 768px) {
        padding: 0 1rem;
    }
}

.section-title {
    font-family: 'Times New Roman', serif;
    font-size: 1.25rem;
    color: #5a4a3a;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: normal;
    letter-spacing: 0.05rem;
    position: relative;
    display: inline-block;
    width: 100%;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 60px;
        height: 1px;
        background: rgba(139, 115, 85, 0.3);
        display: none;

        @media (min-width: 768px) {
            display: block;
        }
    }

    &::before {
        left: 25%;
    }

    &::after {
        right: 25%;
    }

    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
}

.upload-section,
.preview-section {
    margin-bottom: 3rem;
    padding: 0 1rem;
    text-align: center;

    @media (min-width: 768px) {
        margin-bottom: 4rem;
        padding: 0;
    }
}
</style>