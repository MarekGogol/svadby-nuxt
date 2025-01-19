<template>
    <div class="photo-frame" v-if="photo">
        <div class="photo-wrapper">
            <div
                class="photo-container"
                :style="{
                    backgroundImage: `url(${photo.image})`,
                }"
                role="img"
                :aria-label="photo.title || ''"
            ></div>
            <div v-if="photo.title" class="photo-caption">
                {{ photo.title }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    photo: {
        type: Object,
        required: true,
    },
});
</script>

<style lang="scss" scoped>
.photo-frame {
    height: 100%;
    width: 100%;
}

.photo-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}

.photo-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.3rem;
}

.photo-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
    padding: 0.25rem;
    text-align: center;
    font-size: 0.7rem;
    color: #000;
    font-family: 'Times New Roman', serif;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
}
</style>