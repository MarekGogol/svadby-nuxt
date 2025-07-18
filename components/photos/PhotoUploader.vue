<template>
    <div class="photo-uploader">
        <div v-if="showTitle" class="title-input-wrapper">
            <input
                v-model="photoTitle"
                type="text"
                :placeholder="__('Zadajte popis alebo spomienku k fotke')"
                class="title-input"
            />
        </div>

        <div
            class="upload-area"
            :class="{ uploading }"
            @click="triggerFileInput"
            @drop.prevent="handleDrop"
            @dragover.prevent
        >
            <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                accept="image/*"
                multiple
                class="hidden"
            />
            <div v-if="!uploading" class="upload-prompt">
                <span class="icon">📸</span>
                <p>{{ __('Klikni alebo pretiahni fotografie') }}</p>
            </div>
            <div v-else class="upload-status">
                <div class="progress-wrapper">
                    <div class="progress-bar">
                        <div
                            class="progress-fill"
                            :style="{ width: `${totalProgress}%` }"
                        ></div>
                    </div>
                    <div class="progress-text">{{ totalProgress }}%</div>
                </div>
                <div class="selected-file">
                    {{ __('Nahrávam') }}: {{ uploadingMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    showTitle: {
        type: Boolean,
        default: true,
    },
});

const galleryStore = useGalleryStore();
const fileInput = ref(null);
const selectedFiles = ref([]);
const photoTitle = ref('');
const uploading = ref(false);
const currentFileIndex = ref(0);
const fileProgresses = ref({});

const totalProgress = computed(() => {
    if (!selectedFiles.value.length) return 0;
    
    const total = Object.values(fileProgresses.value).reduce((sum, progress) => sum + progress, 0);
    return Math.round(total / selectedFiles.value.length);
});

const uploadingMessage = computed(() => {
    if (!selectedFiles.value.length) return '';
    return `${currentFileIndex.value + 1}/${selectedFiles.value.length} ${__('fotografií')}`;
});

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadSingleFile = async (file, index) => {
    const formData = new FormData();
    formData.append('title', photoTitle.value);
    formData.append('image', file);
    formData.append('type', galleryStore.type);

    try {
        const { data } = await useAxios().$post(
            '/api/event/galleries',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    fileProgresses.value[index] = percentCompleted;
                },
            }
        );

        if (data && data.file) {
            galleryStore.addPhoto(data.file);
        }
        return true;
    } catch (error) {
        console.error(`Upload failed for file ${file.name}:`, error);
        return false;
    }
};

const uploadPhotos = async (files) => {
    if (!files?.length) return;

    selectedFiles.value = Array.from(files);
    fileProgresses.value = {};
    currentFileIndex.value = 0;
    uploading.value = true;

    try {
        for (let i = 0; i < selectedFiles.value.length; i++) {
            currentFileIndex.value = i;
            fileProgresses.value[i] = 0;
            await uploadSingleFile(selectedFiles.value[i], i);
        }
        photoTitle.value = '';
    } finally {
        uploading.value = false;
        selectedFiles.value = [];
        currentFileIndex.value = 0;
        fileProgresses.value = {};
    }
};

const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files?.length) {
        uploadPhotos(files);
    }
};

const handleDrop = (event) => {
    const files = event.dataTransfer.files;
    if (files?.length) {
        uploadPhotos(files);
    }
};
</script>

<style lang="scss" scoped>
.photo-uploader {
    .title-input-wrapper {
        margin-bottom: 0.5rem;

        @media (min-width: 768px) {
            margin-bottom: 1rem;
        }
    }

    .title-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid rgba(168, 144, 132, 0.3);
        border-radius: 8px;
        font-family: 'Playfair Display', serif;
        font-size: 0.9rem;
        transition: all 0.3s;
        background: rgba(255, 255, 255, 0.9);

        @media (min-width: 768px) {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
        }

        &:focus {
            outline: none;
            border-color: #5a4a3a;
            box-shadow: 0 0 0 2px rgba(90, 74, 58, 0.1);
            background: rgba(255, 255, 255, 1);
        }

        &::placeholder {
            color: #6d6d6d;
        }
    }

    .upload-area {
        border: 2px dashed rgba(168, 144, 132, 0.4);
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        min-height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.6);

        @media (min-width: 768px) {
            border-radius: 16px;
            padding: 2rem;
            min-height: 200px;
        }

        &:hover:not(.uploading) {
            background: rgba(255, 255, 255, 0.8);
            border-color: #5a4a3a;
        }

        &.uploading {
            cursor: default;
            border-style: solid;
            border-color: #5a4a3a;
            background: rgba(255, 255, 255, 0.9);
        }
    }

    .hidden {
        display: none;
    }

    .upload-prompt {
        .icon {
            font-size: 1.5rem;
            margin-bottom: 0.25rem;
            display: block;

            @media (min-width: 768px) {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
        }

        p {
            color: #8b7355;
            margin: 0;
            font-size: 0.9rem;
            font-family: 'Playfair Display', serif;

            @media (min-width: 768px) {
                font-size: 1rem;
            }
        }
    }

    .upload-status {
        width: 100%;
        padding: 0 0.5rem;

        @media (min-width: 768px) {
            padding: 0;
        }

        .progress-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;

            @media (min-width: 768px) {
                gap: 1rem;
                margin-bottom: 1rem;
            }
        }

        .progress-bar {
            flex: 1;
            height: 6px;
            background: rgba(168, 144, 132, 0.2);
            border-radius: 3px;
            overflow: hidden;

            @media (min-width: 768px) {
                height: 8px;
                border-radius: 4px;
            }
        }

        .progress-fill {
            height: 100%;
            background: #5a4a3a;
            transition: width 0.3s ease;
        }

        .progress-text {
            font-size: 0.85rem;
            color: #8b7355;
            min-width: 3rem;
            font-family: 'Playfair Display', serif;

            @media (min-width: 768px) {
                font-size: 0.9rem;
                min-width: 3.5rem;
            }
        }

        .selected-file {
            font-size: 0.85rem;
            color: #8b7355;
            font-family: 'Playfair Display', serif;

            @media (min-width: 768px) {
                font-size: 0.9rem;
            }
        }
    }
}
</style>