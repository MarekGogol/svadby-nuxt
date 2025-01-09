<template>
    <div class="timeline">
        <div class="timeline-title">THE DAY OF</div>
        <div class="events">
            <div v-for="(event, index) in events" :key="index" class="event">
                <div class="time">{{ event.time }}</div>
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
.timeline {
    .timeline-title {
        font-family: 'Times New Roman', serif;
        font-size: 0.875rem;
        color: #999;
        letter-spacing: 0.2rem;
        text-align: center;
        margin-bottom: 3rem;
    }

    .events {
        max-width: 600px;
        margin: 0 auto;
    }

    .event {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 2rem;
        padding: 2rem 0;
        border-bottom: 1px solid #eee;

        &:last-child {
            border-bottom: none;
        }

        .time {
            font-family: 'Times New Roman', serif;
            font-size: 0.875rem;
            color: #999;
        }

        .details {
            h3 {
                font-family: 'Times New Roman', serif;
                font-size: 1.25rem;
                color: #000;
                margin-bottom: 0.5rem;
                font-weight: normal;
            }

            p {
                font-family: 'Times New Roman', serif;
                font-size: 1rem;
                color: #666;
                line-height: 1.5;
            }
        }
    }
}
</style>