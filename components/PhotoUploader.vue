<template>
    <div class="photo-uploader">
        <div class="title-input-wrapper">
            <input
                v-model="photoTitle"
                type="text"
                placeholder="Add a title for your next photo (optional)"
                class="title-input"
            >
        </div>

        <div class="upload-area" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
            <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                accept="image/*"
                class="hidden"
            >
            <div v-if="!uploading" class="upload-prompt">
                <span class="icon">📸</span>
                <p>Click or drag image here to upload</p>
            </div>
            <div v-else class="upload-status">
                <div class="progress-wrapper">
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
                    </div>
                    <div class="progress-text">{{ uploadProgress }}%</div>
                </div>
                <div class="selected-file">
                    Uploading: {{ selectedFile?.name }}
                </div>
            </div>
        </div>

        <div v-if="photos.length || galleryPhotos.length" class="gallery-section">
            <div class="section-divider">
                <hr>
                <span>Photo Gallery</span>
                <hr>
            </div>

            <div class="photos-grid">
                <div v-for="photo in [...photos, ...galleryPhotos]" :key="photo.id" class="photo-item">
                    <div class="photo-container">
                        <img :src="photo.image" :alt="photo.title">
                        <div class="photo-title">{{ photo.title }}</div>
                    </div>
                </div>
            </div>

            <div v-if="pagination" class="pagination-wrapper">
                <div class="pagination">
                    <button
                        class="page-link"
                        :disabled="!pagination.from"
                        @click="loadPage(pagination.current_page - 1)"
                    >
                        Previous
                    </button>

                    <div class="page-info">
                        {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }}
                    </div>

                    <button
                        class="page-link"
                        :disabled="pagination.to === pagination.total"
                        @click="loadPage(pagination.current_page + 1)"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const fileInput = ref(null);
const photos = ref([]);
const galleryPhotos = ref([]);
const selectedFile = ref(null);
const photoTitle = ref('');
const uploading = ref(false);
const uploadProgress = ref(0);
const pagination = ref(null);

const loadPage = async (page) => {
    try {
        const { data } = await useAxios().$get('/api/wedding/photos', {
            params: { page }
        });

        if (data?.pagination?.data) {
            galleryPhotos.value = data?.pagination.data;

            pagination.value = data?.pagination;
        }
    } catch (error) {
        console.error('Failed to fetch photos:', error);
    }
};

onMounted(async () => {
    await loadPage(1);
});

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadPhoto = async (file) => {
    if (!file) return;

    selectedFile.value = file;
    const formData = new FormData();
    formData.append('title', photoTitle.value || file.name);
    formData.append('image', file);

    uploading.value = true;
    uploadProgress.value = 0;

    try {
        const { data } = await useAxios()
            .$post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    uploadProgress.value = percentCompleted;
                }
            });

        if (data && data.file) {
            photos.value.unshift(data.file);
            if (pagination.value?.current_page !== 1) {
                await loadPage(1);
            }
        }
        photoTitle.value = '';
    } catch (error) {
        console.error('Upload failed:', error);
    } finally {
        uploading.value = false;
        uploadProgress.value = 0;
        selectedFile.value = null;
    }
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadPhoto(file);
    }
};

const handleDrop = (event) => {
    const file = event.dataTransfer.files[0];
    if (file) {
        uploadPhoto(file);
    }
};
</script>

<style lang="scss" scoped>
.photo-uploader {
    .title-input-wrapper {
        margin-bottom: 1rem;
    }

    .title-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        font-family: 'Lato', sans-serif;
        font-size: 0.95rem;
        transition: all 0.3s;

        &:focus {
            outline: none;
            border-color: #d4756d;
            box-shadow: 0 0 0 2px rgba(#d4756d, 0.1);
        }

        &::placeholder {
            color: #999;
        }
    }

    .upload-area {
        border: 2px dashed #d4756d;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover:not(.uploading) {
            background-color: rgba(#d4756d, 0.05);
        }

        &.uploading {
            cursor: default;
        }
    }

    .hidden {
        display: none;
    }

    .upload-prompt {
        .icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
        }

        p {
            color: #666;
            margin: 0;
        }
    }

    .upload-status {
        width: 100%;

        .progress-wrapper {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .progress-bar {
            flex: 1;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: #d4756d;
            transition: width 0.3s ease;
        }

        .progress-text {
            font-size: 0.9rem;
            color: #666;
            min-width: 3.5rem;
        }

        .selected-file {
            font-size: 0.9rem;
            color: #666;
        }
    }

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

    .pagination-wrapper {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }

    .pagination {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

        .page-link {
            padding: 0.5rem 1rem;
            border: 1px solid #eee;
            border-radius: 0.25rem;
            background: white;
            color: #666;
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'Times New Roman', serif;
            font-size: 0.9rem;

            &:hover:not(:disabled) {
                background: #f8f8f8;
                border-color: #ddd;
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }

        .page-info {
            color: #666;
            font-family: 'Times New Roman', serif;
            font-size: 0.9rem;
        }
    }
}
</style>