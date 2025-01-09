<template>
    <div class="content-section">
        <h2>Wedding Details</h2>
        <div class="data-display">
            <div v-if="loading" class="loading">
                <div class="spinner"></div>
                <p>Loading wedding details...</p>
            </div>
            <div v-else-if="error" class="error">
                <p>{{ error }}</p>
                <button @click="retryLoad" class="retry-btn">Retry</button>
            </div>
            <div v-else class="wedding-info">
                <pre><code>{{ JSON.stringify(weddingData, null, 2) }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const weddingData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get('https://api.svadba.test/api/wedding');
        weddingData.value = response.data;
    } catch (e) {
        error.value = 'Failed to load wedding details';
    } finally {
        loading.value = false;
    }
});
</script>

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

.data-display {
    .loading {
        text-align: center;
        padding: 2rem;
        color: $text-color;

        .spinner {
            width: 40px;
            height: 40px;
            margin: 0 auto 1rem;
            border: 3px solid $primary-color;
            border-top-color: $accent-color;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    }

    .error {
        text-align: center;
        padding: 2rem;
        color: #dc3545;

        .retry-btn {
            margin-top: 1rem;
            padding: 0.5rem 1.5rem;
            background-color: $accent-color;
            color: white;
            border: none;
            border-radius: 2rem;
            cursor: pointer;
            transition: opacity 0.3s;

            &:hover {
                opacity: 0.9;
            }
        }
    }

    .wedding-info {
        background-color: $secondary-color;
        padding: 1.5rem;
        border-radius: 1rem;
        overflow-x: auto;

        pre {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        code {
            color: $text-color;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
        }
    }
}
</style>
