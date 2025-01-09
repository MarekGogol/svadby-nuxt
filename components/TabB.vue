<template>
    <div class="content-section">
        <h2>Wedding Day Timeline</h2>
        <div class="schedule">
            <div v-for="(event, index) in events" :key="index" class="event">
                <div class="time">
                    <span>{{ event.time }}</span>
                </div>
                <div class="details">
                    <h3>{{ event.title }}</h3>
                    <p>{{ event.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const events = [
    {
        time: '3:00 PM',
        title: 'Wedding Ceremony',
        description: 'Join us as we exchange vows in the garden',
    },
    {
        time: '5:00 PM',
        title: 'Cocktail Hour',
        description: "Enjoy refreshments and hors d'oeuvres",
    },
    {
        time: '6:00 PM',
        title: 'Reception Dinner',
        description: 'Celebration continues with dinner and dancing',
    },
];
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

.schedule {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.event {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: $secondary-color;
    border-radius: 1rem;
    text-align: center;

    @media (min-width: 768px) {
        flex-direction: row;
        text-align: left;
        align-items: center;
    }

    .time {
        margin-bottom: 0.5rem;

        @media (min-width: 768px) {
            width: 6rem;
            margin-bottom: 0;
        }

        span {
            font-size: 1.125rem;
            font-weight: 500;
            color: $accent-color;
        }
    }

    .details {
        flex-grow: 1;

        h3 {
            font-size: 1.25rem;
            font-family: 'Lato', sans-serif;
            color: $accent-color;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        p {
            color: $text-color;
            margin: 0;
            font-weight: 300;
        }
    }
}
</style>
