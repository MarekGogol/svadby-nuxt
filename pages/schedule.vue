<template>
    <div class="timeline">
        <div v-for="(group, date) in groupedEvents" :key="date" class="timeline-group">
            <h2 class="timeline-title">{{ formatDate(date) }}</h2>
            <div class="events">
                <div v-for="event in group" :key="event.id" class="event">
                    <div class="time">{{ formatTime(event.datetime) }}</div>
                    <div class="details">
                        <h3>{{ event.name }}</h3>
                        <p>{{ event.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import moment from 'moment';
import { groupBy } from 'lodash';

definePageMeta({
    keepalive: true
});

const eventStore = useEventStore();
const event = eventStore.event;

// Group events by date using lodash groupBy
const groupedEvents = computed(() => {
    const events = event.timelines;
    return groupBy(events, (event) => moment(event.datetime).format('YYYY-MM-DD'));
});

// Format date to DD.MM.YY using moment.js
const formatDate = (dateStr) => {
    return moment(dateStr).format('DD.MM.YY');
};

// Format time to HH:mm using moment.js
const formatTime = (dateTimeStr) => {
    return moment(dateTimeStr).format('HH:mm');
};
</script>

<style lang="scss" scoped>
.timeline {
    .timeline-group {
        margin-bottom: 4rem;
    }

    .timeline-title {
        font-family: 'Times New Roman', serif;
        font-size: 1.5rem;
        color: #333;
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