<template>
    <div class="container">
        <div class="side-text">
            {{ formatSideText() }}
        </div>
        <div class="content-wrapper">
            <header>
                <div class="logo-container" v-if="event?.name">
                    <img src="/images/logo.png" alt="Logo" class="logo" />
                </div>
                <div class="names" v-if="event?.name">
                    {{ formatNames(event.name) }}
                </div>
                <div class="date">{{ formattedDate }}</div>
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

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
    padding: 1rem;
    
    @media (min-width: 768px) {
        padding: 2rem;
    }
}

header {
    text-align: center;
    margin-bottom: 1rem;
    padding: 0rem 1rem 1rem;

    @media (min-width: 768px) {
        margin-bottom: 1.5rem;
        padding: 0rem 1rem 1rem;
    }

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0rem;

        @media (min-width: 768px) {
            margin-bottom: 0.75rem;
        }
    }

    .logo {
        max-width: 70px;
        height: auto;
        opacity: 0.9;
        transition: all 0.3s ease;

        @media (min-width: 768px) {
            max-width: 100px;
        }

        @media (min-width: 1024px) {
            max-width: 200px;
        }

        &:hover {
            opacity: 1;
            transform: scale(1.02);
        }
    }

    .names {
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        line-height: 1.2;
        color: #5a4a3a;
        font-weight: 400;
        margin-bottom: 1rem;

        @media (min-width: 768px) {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
        }
    }

    .date {
        font-family: 'Times New Roman', serif;
        font-size: 0.75rem;
        color: #a89084;
        letter-spacing: 0.25rem;

        @media (min-width: 768px) {
            font-size: 0.875rem;
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
    padding: 1rem;

    @media (min-width: 768px) {
        padding: 3rem;
    }
}
</style>