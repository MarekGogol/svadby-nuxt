<template>
    <div class="book-page">
        <div class="photo-grid">
            <div v-for="(slot, index) in 4" :key="index" class="photo-slot">
                <PhotobookPhoto v-if="photos[index]" :photo="photos[index]" />
            </div>
        </div>
        <div class="page-number">{{ pageNumber }}</div>
    </div>
</template>

<script setup>
defineProps({
    photos: {
        type: Array,
        required: true,
    },
    pageNumber: {
        type: Number,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
.book-page {
    width: 100%;
    aspect-ratio: 1.4;
    background: white;
    padding: 3rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;
    height: 100%;
    width: 100%;
}

.photo-slot {
    position: relative;
    height: 100%;
}

.page-number {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    font-family: 'Times New Roman', serif;
    font-size: 0.875rem;
    color: #999;
    font-style: italic;
}
</style>