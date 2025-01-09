<script setup>
import { ref } from 'vue';

const isDragging = ref(false);
const files = ref([]);

const handleDrop = (e) => {
    e.preventDefault();
    isDragging.value = false;

    const newFiles = Array.from(e.dataTransfer.files);
    files.value = [...files.value, ...newFiles];
};

const handleDragOver = (e) => {
    e.preventDefault();
    isDragging.value = true;
};

const handleDragLeave = () => {
    isDragging.value = false;
};

const removeFile = (index) => {
    files.value.splice(index, 1);
};

const uploadFiles = () => {
    // Here you would implement the actual file upload logic
    console.log('Uploading files:', files.value);
};
</script>

<template>
    <div class="content-section">
        <h2>Share Your Moments! 📸</h2>

        <div
            class="upload-zone"
            :class="{ dragging: isDragging }"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
        >
            <div class="upload-content">
                <div class="camera-icon">📸</div>
                <h3>Drop Your Photos Here!</h3>
                <p>Or click to select files</p>
                <div class="hearts">
                    <span class="heart">💖</span>
                    <span class="heart">💝</span>
                    <span class="heart">💗</span>
                </div>
            </div>
        </div>

        <div v-if="files.length" class="files-preview">
            <h4>Selected Photos ({{ files.length }})</h4>
            <div class="file-list">
                <div
                    v-for="(file, index) in files"
                    :key="index"
                    class="file-item"
                >
                    <span class="file-name">{{ file.name }}</span>
                    <button @click="removeFile(index)" class="remove-btn">
                        ❌
                    </button>
                </div>
            </div>
            <button @click="uploadFiles" class="upload-btn">
                Upload Photos 🚀
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$primary-color: #f8e8e8;
$secondary-color: #fff5f5;
$accent-color: #d4756d;
$text-color: #2c3e50;

.content-section {
    h2 {
        font-family: 'Great Vibes', cursive;
        font-size: 2.5rem;
        color: $accent-color;
        margin-bottom: 2rem;
        text-align: center;
    }
}

.upload-zone {
    min-height: 300px;
    border: 3px dashed lighten($accent-color, 20%);
    border-radius: 1rem;
    background-color: $secondary-color;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover,
    &.dragging {
        border-color: $accent-color;
        background-color: lighten($primary-color, 2%);
        transform: scale(1.01);

        .heart {
            animation: float 2s ease-in-out infinite;
        }
    }
}

.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
    padding: 2rem;
    text-align: center;

    .camera-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        animation: bounce 2s infinite;
    }

    h3 {
        font-size: 1.5rem;
        color: $accent-color;
        margin-bottom: 0.5rem;
        font-family: 'Lato', sans-serif;
    }

    p {
        color: lighten($text-color, 20%);
        margin-bottom: 1rem;
    }
}

.hearts {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    .heart {
        font-size: 1.5rem;
        transition: all 0.3s ease;

        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: 0.5s;
        }
        &:nth-child(3) {
            animation-delay: 1s;
        }
    }
}

.files-preview {
    margin-top: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

    h4 {
        color: $accent-color;
        margin-bottom: 1rem;
        font-family: 'Lato', sans-serif;
    }
}

.file-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: $secondary-color;
    border-radius: 0.5rem;

    .file-name {
        font-size: 0.9rem;
        color: $text-color;
    }

    .remove-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.2rem;
        opacity: 0.7;
        transition: opacity 0.3s;

        &:hover {
            opacity: 1;
        }
    }
}

.upload-btn {
    width: 100%;
    padding: 1rem;
    background-color: $accent-color;
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba($accent-color, 0.3);
    }
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-10px) rotate(10deg);
    }
}
</style>
