<template>
    <div class="photobook-page">
        <PhotoUploader />
        <PhotobookGallery />
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
    padding: 0 1rem;
}
</style>