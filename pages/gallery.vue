<template>
    <div class="gallery-page">
        <PhotoUploader :show-title="false" />
        <PhotoGallery />
    </div>
</template>

<script setup>
const galleryStore = useGalleryStore();
galleryStore.setType('gallery');

// Async data fetching
await galleryStore.fetchPhotos(1);
</script>

<style lang="scss" scoped>
.gallery-page {
    padding: 0;

    @media (min-width: 768px) {
        padding: 0 1rem;
    }
}
</style>