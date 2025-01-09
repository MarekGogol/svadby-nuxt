<template>
    <div class="photo-uploader">
        <div class="upload-area" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
            <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                accept="image/*"
                class="hidden"
            >
            <div class="upload-prompt">
                <span class="icon">📸</span>
                <p>Click or drag image here to upload</p>
            </div>
        </div>

        <div v-if="selectedFile" class="upload-form">
            <div class="form-group">
                <input
                    v-model="photoTitle"
                    type="text"
                    placeholder="Add a title (optional)"
                    class="title-input"
                >
                <button @click="uploadPhoto" class="upload-button" :disabled="uploading">
                    {{ uploading ? 'Uploading...' : 'Upload Photo' }}
                </button>
            </div>
            <div class="selected-file">
                Selected: {{ selectedFile.name }}
            </div>
            <div v-if="uploading" class="progress-wrapper">
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
                </div>
                <div class="progress-text">{{ uploadProgress }}%</div>
            </div>
        </div>

        <div v-if="photos.length" class="photos-grid">
            <div v-for="photo in photos" :key="photo.id" class="photo-item">
                <img :src="photo.image" :alt="photo.title">
                <div class="photo-title">{{ photo.title }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const fileInput = ref(null);
const photos = ref([]);
const selectedFile = ref(null);
const photoTitle = ref('');
const uploading = ref(false);
const uploadProgress = ref(0);

const triggerFileInput = () => {
    fileInput.value.click();
};

const uploadPhoto = async () => {
    if (!selectedFile.value) return;

    const formData = new FormData();
    formData.append('title', photoTitle.value || selectedFile.value.name);
    formData.append('image', selectedFile.value);

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

        photos.value.push(data.file);
        // Reset form
        selectedFile.value = null;
        photoTitle.value = '';
    } catch (error) {
        console.error('Upload failed:', error);
    } finally {
        uploading.value = false;
        uploadProgress.value = 0;
    }
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
    }
};

const handleDrop = (event) => {
    const file = event.dataTransfer.files[0];
    if (file) {
        selectedFile.value = file;
    }
};
</script>

<style lang="scss" scoped>
.photo-uploader {
    .upload-area {
        border: 2px dashed #d4756d;
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: rgba(#d4756d, 0.05);
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

    .upload-form {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f8f8;
        border-radius: 0.5rem;

        .form-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
        }

        .title-input {
            flex: 1;
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
            font-family: 'Lato', sans-serif;

            &:focus {
                outline: none;
                border-color: #d4756d;
            }
        }

        .upload-button {
            padding: 0.5rem 1.5rem;
            background: #d4756d;
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;

            &:hover:not(:disabled) {
                background: darken(#d4756d, 5%);
            }

            &:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
        }

        .selected-file {
            font-size: 0.9rem;
            color: #666;
        }

        .progress-wrapper {
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
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
    }

    .photos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
    }

    .photo-item {
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .photo-title {
            padding: 0.5rem;
            background: white;
            font-size: 0.9rem;
            color: #2c3e50;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
