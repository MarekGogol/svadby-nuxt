<template>
    <div class="photobook-gallery">
        <div v-if="photos.length" class="photobook">
            <div class="book-pages">
                <PhotobookCover
                    v-if="photos[0]"
                    :photo="photos[0]"
                    :date="eventStore.event?.date"
                />
                <PhotobookPage
                    v-for="(page, index) in photoPages"
                    :key="index"
                    :photos="page.photos"
                    :page-number="index + 1"
                />
            </div>
        </div>

        <div v-if="galleryStore.loading" class="loading-wrapper">
            {{ __('Načitávam viac fotografii...') }}
        </div>

        <div
            v-if="galleryStore.hasMorePages()"
            ref="loadMoreTrigger"
            class="load-more-trigger"
        ></div>
    </div>
</template>

<script setup>
const galleryStore = useGalleryStore();
const eventStore = useEventStore();

const photos = computed(() => galleryStore.photos);

const photoPages = computed(() => {
    if (!photos.value.length) return [];

    // First photo is used for cover, so we start from index 1
    const remainingPhotos = photos.value.slice(1);
    const pages = [];

    // Group remaining photos into pages of 4
    for (let i = 0; i < remainingPhotos.length; i += 4) {
        pages.push({
            photos: remainingPhotos.slice(i, i + 4),
        });
    }

    return pages;
});

const loadMoreTrigger = ref(null);
let observer = null;

// Create observer function
const setupObserver = () => {
    if (observer) {
        observer.disconnect();
    }

    observer = new IntersectionObserver(
        async ([entry]) => {
            if (entry.isIntersecting) {
                await galleryStore.loadMore();
            }
        },
        {
            rootMargin: '100px',
        }
    );

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
};

// Watch for photos changes
watch(photos, () => {
    nextTick(() => {
        setupObserver();
    });
});

onMounted(() => {
    setupObserver();
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
});
</script>

<style lang="scss" scoped>
.photobook-gallery {
    padding: 1rem 0;
    width: 100%;

    @media (min-width: 768px) {
        padding: 2rem 0;
    }
}

.photobook {
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    padding: 0.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(90, 74, 58, 0.1);

    @media (min-width: 768px) {
        padding: 2rem;
        border-radius: 16px;
    }
}

.book-pages {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    @media (min-width: 768px) {
        gap: 3rem;
    }
}

.loading-wrapper {
    text-align: center;
    padding: 1rem;
    color: #8b7355;
    font-family: 'Times New Roman', serif;
    font-size: 0.9rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
}

.load-more-trigger {
    height: 20px;
    margin-top: 1rem;

    @media (min-width: 768px) {
        margin-top: 2rem;
    }
}
</style>