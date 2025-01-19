<template>
    <div class="gallery-page">
        <PhotoUploader :show-title="false" />
        <PhotoGallery />
    </div>
</template>

<script setup>
definePageMeta({
    keepalive: true
});

const galleryStore = useGalleryStore();
galleryStore.setType('gallery');

// Async data fetching
await galleryStore.fetchPhotos(1);
</script>
