<template>
    <div class="container">
        <div class="side-text">
            {{ formatSideText() }}
        </div>
        <div class="content-wrapper">
            <header>
                <div class="date">{{ formattedDate }}</div>
                <div class="names" v-if="event?.name">
                    {{ formatNames(event.name) }}
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

const eventStore = useEventStore();

const event = computed(() => eventStore.event);

const formattedDate = computed(() => {
    if (!event.value?.date) return '';
    return moment(event.value.date).format('MMMM D, YYYY').toUpperCase();
});

const formatNames = (name) => {
    if (!name) return '';
    return name
        .split('&')
        .map((part) => part.trim().toUpperCase())
        .join('\n&\n');
};

const formatSideText = () => {
    return (
        event.value?.firstname_man.substr(0, 1) +
        ' & ' +
        event.value?.firstname_woman.substr(0, 1)
    );
};
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    position: relative;
    display: flex;
    padding: 0;
    background-color: #f6f1f0;
}

.side-text {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    color: #a89084;
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
    padding: 1rem;
    
    @media (min-width: 768px) {
        padding: 2rem;
    }
}

header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem 1rem;

    @media (min-width: 768px) {
        margin-bottom: 4rem;
        padding: 4rem 1rem;
    }

    .date {
        font-family: 'Times New Roman', serif;
        font-size: 0.75rem;
        color: #a89084;
        letter-spacing: 0.25rem;
        margin-bottom: 1.5rem;

        @media (min-width: 768px) {
            font-size: 0.875rem;
            margin-bottom: 2rem;
        }
    }

    .names {
        font-family: 'Times New Roman', serif;
        font-size: 2.5rem;
        line-height: 1.2;
        color: #5a4a3a;
        font-weight: normal;

        @media (min-width: 768px) {
            font-size: 5rem;
        }
    }
}

.content {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(90, 74, 58, 0.08);
    backdrop-filter: blur(10px);
}

.page-content {
    padding: 1rem;

    @media (min-width: 768px) {
        padding: 3rem;
    }
}
</style>