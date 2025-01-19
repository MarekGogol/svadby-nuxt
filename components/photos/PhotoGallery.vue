<template>
    <div v-if="photos.length" class="gallery-section">
        <div class="section-divider">
            <hr />
            <span>{{ __('Nahrané fotografie') }}</span>
            <hr />
        </div>

        <div class="photos-grid">
            <div v-for="photo in photos" :key="photo.id" class="photo-item">
                <PhotoGalleryCard :photo="photo" />
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
const photos = computed(() => galleryStore.photos);
const loadMoreTrigger = ref(null);
let observer = null;

// Create observer function
const setupObserver = () => {
    if (observer) {
        observer.disconnect();
    }

    observer = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting) {
            await galleryStore.loadMore();
        }
    }, {
        rootMargin: '100px'
    });

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
.gallery-section {
    margin-top: 1rem;

    @media (min-width: 768px) {
        margin-top: 2rem;
    }
}

.section-divider {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    color: #666;

    @media (min-width: 768px) {
        margin: 2rem 0;
    }

    hr {
        flex: 1;
        border: none;
        height: 1px;
        background: #ddd;
    }

    span {
        padding: 0 0.5rem;
        font-size: 0.85rem;
        font-weight: 500;
        color: #666;
        font-family: 'Times New Roman', serif;

        @media (min-width: 768px) {
            padding: 0 1rem;
            font-size: 0.9rem;
        }
    }
}

.photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.5rem;
    padding: 0 0.25rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 0;
    }
}

.loading-wrapper {
    text-align: center;
    padding: 1rem;
    color: #666;
    font-family: 'Times New Roman', serif;
    font-size: 0.85rem;

    @media (min-width: 768px) {
        padding: 2rem;
        font-size: 0.9rem;
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