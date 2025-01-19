<template>
    <div class="container">
        <div class="side-text">
            {{ formatSideText(wedding) }}
        </div>
        <div class="content-wrapper">
            <header>
                <div class="date">{{ formattedDate }}</div>
                <div class="names" v-if="wedding?.name">
                    {{ formatNames(wedding.name) }}
                </div>
            </header>

            <div class="content">
                <Menu />
                <div class="page-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';

const weddingStore = useWedding();

const wedding = computed(() => weddingStore.wedding);

const formattedDate = computed(() => {
    if (!wedding?.date) return '';
    return moment(wedding.date).format('MMMM D, YYYY').toUpperCase();
});

const formatNames = (name) => {
    if (!name) return '';
    return name
        .split('&')
        .map((part) => part.trim().toUpperCase())
        .join('\n&\n');
};

const formatSideText = (wedding) => {
    return (
        wedding.firstname_man.substr(0, 1) +
        ' & ' +
        wedding.firstname_woman.substr(0, 1)
    );
};
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    position: relative;
    display: flex;
    padding: 0;
}

.side-text {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    color: #999;
    letter-spacing: 0.5rem;
    white-space: nowrap;
    display: none;

    @media (min-width: 1200px) {
        display: block;
    }
}

.content-wrapper {
    flex: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    text-align: center;
    margin-bottom: 4rem;
    padding: 4rem 1rem;

    .date {
        font-family: 'Times New Roman', serif;
        font-size: 0.875rem;
        color: #999;
        letter-spacing: 0.25rem;
        margin-bottom: 2rem;
    }

    .names {
        font-family: 'Times New Roman', serif;
        font-size: 3.5rem;
        line-height: 1.2;
        color: #000;
        font-weight: normal;

        @media (min-width: 768px) {
            font-size: 5rem;
        }
    }
}

.content {
    background-color: white;
    border: none;
    max-width: 800px;
    margin: 0 auto;
}

.page-content {
    padding: 2rem;

    @media (min-width: 768px) {
        padding: 3rem;
    }
}
</style>
