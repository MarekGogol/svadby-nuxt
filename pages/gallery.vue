<template>
    <div class="gallery-page">
        <PhotoUploader />
        <PhotoGallery />
    </div>
</template>

<script setup>
definePageMeta({
    keepalive: true
});

const galleryStore = useGalleryStore();

onMounted(() => {
    galleryStore.setType('gallery');
    galleryStore.fetchPhotos(1);
});
</script>
