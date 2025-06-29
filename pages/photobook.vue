<template>
    <div class="photobook-page">
        <!-- Hero Section with Background Image -->
        <PageHero background-image="/images/A7408066.jpg" />

        <div class="main-content">
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

        <!-- Bottom gradient to blend with background -->
        <div class="bottom-gradient"></div>
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
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f1f0 0%, #ede3e0 100%);
    position: relative;
}

.main-content {
    position: relative;
    z-index: 3;
    margin-top: -6.5rem;
    padding: 0 1rem 3rem;

    @media (min-width: 768px) {
        padding: 0 2rem 4rem;
        margin-top: -100px;
    }
}

.bottom-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(246, 241, 240, 0.3) 30%,
        rgba(246, 241, 240, 0.8) 70%,
        #f6f1f0 100%
    );
    pointer-events: none;
    z-index: 1;
}

.section-title {
    font-family: 'Playfair Display', serif;
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