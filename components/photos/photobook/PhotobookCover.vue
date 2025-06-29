<template>
    <div class="book-page page-cover" :style="{ backgroundImage: `url(${photo.image})` }">
        <div class="cover-overlay"></div>
        <div class="cover-content">
            <h1>{{ __('Naša fotokniha') }}</h1>
            <div class="cover-date">{{ formattedDate }}</div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';

const props = defineProps({
    photo: {
        type: Object,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

const formattedDate = computed(() => {
    if (!props.date) return '';
    return moment(props.date).format('MMMM D, YYYY').toUpperCase();
});
</script>

<style lang="scss" scoped>
.book-page {
    width: 100%;
    aspect-ratio: 1.4;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.page-cover {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.cover-content {
    position: relative;
    z-index: 3;
    text-align: center;
    padding: 3rem;

    h1 {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        margin-bottom: 1rem;
        font-weight: normal;
    }

    .cover-date {
        font-family: 'Playfair Display', serif;
        font-size: clamp(0.9rem, 2vw, 1.2rem);
        color: rgba(255, 255, 255, 0.8);
    }
}
</style>