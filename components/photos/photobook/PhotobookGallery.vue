<template>
    <div class="photobook-gallery">
        <div v-if="photos.length" class="photobook">
            <div class="book-pages">
                <template
                    v-for="(page, pageIndex) in photoPages"
                    :key="pageIndex"
                >
                    <div
                        class="book-page"
                        :class="{ 'page-cover': pageIndex === 0 }"
                        :style="
                            pageIndex === 0
                                ? { backgroundImage: `url(${photos[0].image})` }
                                : {}
                        "
                    >
                        <template v-if="pageIndex === 0">
                            <div class="cover-overlay"></div>
                            <div class="cover-content">
                                <h1>{{ __('Naša fotokniha') }}</h1>
                                <div class="cover-date">
                                    {{ formattedDate }}
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="photo-grid">
                                <div
                                    v-for="(slot, index) in 4"
                                    :key="index"
                                    class="photo-slot"
                                >
                                    <div
                                        class="photo-frame"
                                        v-if="page.photos[index]"
                                    >
                                        <div class="photo-wrapper">
                                            <div
                                                class="photo-container"
                                                :style="{
                                                    backgroundImage: `url(${page.photos[index].image})`,
                                                }"
                                                role="img"
                                                :aria-label="
                                                    page.photos[index].title ||
                                                    ''
                                                "
                                            ></div>
                                            <div
                                                v-if="page.photos[index].title"
                                                class="photo-caption"
                                            >
                                                {{ page.photos[index].title }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="page-number">{{ pageIndex }}</div>
                        </template>
                    </div>
                </template>
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
import moment from 'moment';

const galleryStore = useGalleryStore();
const eventStore = useEventStore();

const photos = computed(() => galleryStore.photos);

const formattedDate = computed(() => {
    if (!eventStore.event?.date) return '';
    return moment(eventStore.event.date).format('MMMM D, YYYY').toUpperCase();
});

const photoPages = computed(() => {
    if (!photos.value.length) return [];

    // First photo is used for cover, so we start from index 1
    const remainingPhotos = photos.value.slice(1);
    const pages = [{ photos: [photos.value[0]] }]; // Cover page

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
    padding: 2rem 0;
    width: 100%;
}

.photobook {
    width: 100%;
    background: #f8f8f8;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.book-pages {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
}

.book-page {
    width: 100%;
    aspect-ratio: 1.4;
    background: white;
    padding: 3rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;

    &.page-cover {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;

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
                font-family: 'Times New Roman', serif;
                font-size: clamp(1.5rem, 4vw, 2.5rem);
                margin-bottom: 1rem;
                font-weight: normal;
            }

            .cover-date {
                font-family: 'Times New Roman', serif;
                font-size: clamp(0.9rem, 2vw, 1.2rem);
                color: rgba(255, 255, 255, 0.8);
            }
        }
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
    border-radius: 0.33rem;
}

.photo-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
    padding: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
    color: #000;
    font-family: 'Times New Roman', serif;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.loading-wrapper {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-family: 'Times New Roman', serif;
    font-size: 0.9rem;
}

.load-more-trigger {
    height: 20px;
    margin-top: 2rem;
}
</style>
