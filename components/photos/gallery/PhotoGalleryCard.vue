<template>
    <div class="photo-container">
        <img loading="lazy" :src="photo.image" :alt="photo.title" />
        <div v-if="photo.title" class="photo-title">{{ photo.title }}</div>
    </div>
</template>

<script setup>
defineProps({
    photo: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.photo-container {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 0 0 1rem;

    @media (min-width: 768px) {
        margin: 0;
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
    }

    .photo-title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.5rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        font-size: 0.9rem;
        color: #2c3e50;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover .photo-title {
        transform: translateY(0);
    }
}
</style>