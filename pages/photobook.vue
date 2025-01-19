<template>
    <div class="gallery-page">
        <PhotoUploader />
        <PhotoGallery />
    </div>
</template>

<script setup>
const galleryStore = useGalleryStore();
galleryStore.setType('photobook');

// Async data fetching
await galleryStore.fetchPhotos(1);
</script>
