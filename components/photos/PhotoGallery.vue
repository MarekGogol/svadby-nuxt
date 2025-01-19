<template>
    <div v-if="photos.length || galleryPhotos.length" class="gallery-section">
        <div class="section-divider">
            <hr />
            <span>{{ __('Nahrané fotografie') }}</span>
            <hr />
        </div>

        <div class="photos-grid">
            <div
                v-for="photo in [...photos, ...galleryPhotos]"
                :key="photo.id"
                class="photo-item"
            >
                <div class="photo-container">
                    <img loading="lazy" :src="photo.image" :alt="photo.title" />
                    <div class="photo-title">{{ photo.title }}</div>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="loading-wrapper">
            {{ __('Načitávam viac fotografii...') }}
        </div>

        <div
            v-if="hasMorePages"
            ref="loadMoreTrigger"
            class="load-more-trigger"
        ></div>
    </div>
</template>

<script setup>
const props = defineProps({
    photos: {
        type: Array,
        default: () => [],
    },
});

const galleryPhotos = ref([]);
const pagination = ref(null);
const isLoading = ref(false);
const loadMoreTrigger = ref(null);

const hasMorePages = computed(() => {
    if (!pagination.value) return false;
    return pagination.value.current_page < pagination.value.last_page;
});

const loadPage = async (page) => {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
        const { data } = await useAxios().$get('/api/event/galleries', {
            params: { page },
        });

        if (data?.pagination?.data) {
            if (page === 1) {
                galleryPhotos.value = data.pagination.data;
            } else {
                galleryPhotos.value = [
                    ...galleryPhotos.value,
                    ...data.pagination.data,
                ];
            }
            pagination.value = data.pagination;
        }
    } catch (error) {
        console.error('Failed to fetch photos:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await loadPage(1);

    const observer = new IntersectionObserver(
        async ([entry]) => {
            if (
                entry.isIntersecting &&
                hasMorePages.value &&
                !isLoading.value
            ) {
                await loadPage(pagination.value.current_page + 1);
            }
        },
        {
            rootMargin: '100px',
        }
    );

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});
</script>

<style lang="scss" scoped>
.gallery-section {
    margin-top: 2rem;
}

.section-divider {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    color: #666;

    hr {
        flex: 1;
        border: none;
        height: 1px;
        background: #ddd;
    }

    span {
        padding: 0 1rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: #666;
        font-family: 'Lato', sans-serif;
    }
}

.photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.photo-item {
    .photo-container {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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
