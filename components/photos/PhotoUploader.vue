<template>
    <div class="photo-uploader">
        <div class="title-input-wrapper">
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
                            :style="{ width: `${uploadProgress}%` }"
                        ></div>
                    </div>
                    <div class="progress-text">{{ uploadProgress }}%</div>
                </div>
                <div class="selected-file">
                    {{ __('Nahrávam') }}: {{ selectedFile?.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'gallery'
    }
});

const galleryStore = useGalleryStore();
const fileInput = ref(null);
const selectedFile = ref(null);
const photoTitle = ref('');
const uploading = ref(false);
const uploadProgress = ref(0);

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadPhoto = async (file) => {
    if (!file) return;

    selectedFile.value = file;
    const formData = new FormData();
    formData.append('title', photoTitle.value || file.name);
    formData.append('image', file);
    formData.append('type', props.type);

    uploading.value = true;
    uploadProgress.value = 0;

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
                    uploadProgress.value = percentCompleted;
                },
            }
        );

        if (data && data.file) {
            galleryStore.addPhoto(data.file);
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
            border-color: #49454f;
            box-shadow: 0 0 0 2px rgba(#49454f, 0.1);
        }

        &::placeholder {
            color: #999;
        }
    }

    .upload-area {
        border: 2px dashed #ccd0d5;
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
            background-color: rgba(#49454f, 0.03);
            border-color: #49454f;
        }

        &.uploading {
            cursor: default;
            border-style: solid;
            border-color: #49454f;
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
            background: #49454f;
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
}
</style>
