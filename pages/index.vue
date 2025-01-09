<template>
    <div class="container">
        <div class="wrapper">
            <header>
                <h1>Simona & Marek</h1>
                <div class="wedding-date">August 15, 2024</div>
                <div class="divider">
                    <span>❦</span>
                </div>
            </header>

            <div class="content">
                <div class="tabs">
                    <button
                        @click="activeTab = 'tabA'"
                        :class="['tab', { active: activeTab === 'tabA' }]"
                    >
                        <span class="tab-icon">📸</span>
                        <span class="tab-text">Upload Photos</span>
                    </button>
                    <button
                        @click="activeTab = 'tabB'"
                        :class="['tab', { active: activeTab === 'tabB' }]"
                    >
                        <span class="tab-icon">📅</span>
                        <span class="tab-text">Schedule</span>
                    </button>
                </div>

                <div class="tab-content">
                    <PhotoUploader v-if="activeTab === 'tabA'" />
                    <TabB v-if="activeTab === 'tabB'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PhotoUploader from './components/PhotoUploader.vue';
import TabB from './components/TabB.vue';

const activeTab = ref('tabA');
</script>

<style lang="scss" scoped>
$primary-color: #f8e8e8;
$secondary-color: #fff5f5;
$accent-color: #d4756d;
$text-color: #2c3e50;

.container {
    min-height: 100vh;
    background-color: $secondary-color;
    padding: 1rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
}

.wrapper {
    max-width: 600px;
    margin: 0 auto;
}

header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem 1rem;

    h1 {
        font-family: 'Great Vibes', cursive;
        font-size: 3rem;
        color: $accent-color;
        margin-bottom: 0.5rem;
        line-height: 1.2;

        @media (min-width: 768px) {
            font-size: 4rem;
        }
    }

    .wedding-date {
        font-family: 'Lato', sans-serif;
        font-size: 1.2rem;
        color: $text-color;
        margin-bottom: 1rem;
        font-weight: 300;
        letter-spacing: 2px;
    }

    .divider {
        position: relative;
        height: 1px;
        background-color: $accent-color;
        opacity: 0.3;
        width: 80%;
        max-width: 200px;
        margin: 1rem auto;

        span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: $secondary-color;
            padding: 0 1rem;
            color: $accent-color;
            font-size: 1.5rem;
        }
    }
}

.content {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.tabs {
    display: flex;
    background-color: $primary-color;
    padding: 0.5rem;
    gap: 0.5rem;

    .tab {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        font-size: 0.9rem;
        font-weight: 500;
        border: none;
        background: none;
        cursor: pointer;
        transition: all 0.3s;
        color: $text-color;
        font-family: 'Lato', sans-serif;
        border-radius: 0.75rem;

        .tab-icon {
            font-size: 1.5rem;
        }

        .tab-text {
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        &:hover {
            background-color: rgba($accent-color, 0.1);
        }

        &.active {
            background-color: white;
            color: $accent-color;
            box-shadow: 0 2px 8px rgba($accent-color, 0.15);
            transform: translateY(-2px);
        }
    }
}

.tab-content {
    padding: 1.5rem 1rem;

    @media (min-width: 768px) {
        padding: 2rem;
    }
}
</style>
