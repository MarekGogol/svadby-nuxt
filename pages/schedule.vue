<template>
    <div class="timeline">
        <div
            v-for="(group, date, index) in groupedEvents"
            :key="date"
            class="timeline-group"
        >
            <h2 class="timeline-title">
                <div class="title-wrapper">
                    <div class="day-number">{{ index + 1 }}. deň</div>
                    <div class="date">{{ formatDate(date) }}</div>
                </div>
            </h2>
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
    keepalive: true,
});

const eventStore = useEventStore();
const event = eventStore.event;

// Group events by date using lodash groupBy
const groupedEvents = computed(() => {
    const events = event.timelines;
    return groupBy(events, (event) =>
        moment(event.datetime).format('YYYY-MM-DD')
    );
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

        &:last-child {
            margin-bottom: 0;
        }
    }

    .timeline-title {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
        padding: 2rem 0;

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 1px;
            background: rgba(139, 115, 85, 0.3);
        }

        &::before {
            top: 0;
        }

        &::after {
            bottom: 0;
        }

        .title-wrapper {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            position: relative;
            padding: 0 2rem;

            &::before,
            &::after {
                content: '•';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(139, 115, 85, 0.4);
                font-size: 1.2rem;
            }

            &::before {
                left: 0;
            }

            &::after {
                right: 0;
            }
        }

        .day-number {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            color: #5a4a3a;
            font-weight: normal;
            letter-spacing: 0.1rem;
        }

        .date {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            color: #a89084;
            letter-spacing: 0.2rem;
            text-transform: uppercase;
        }
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
        border-bottom: 1px solid rgba(168, 144, 132, 0.2);

        &:last-child {
            border-bottom: none;
        }

        .time {
            font-family: 'Playfair Display', serif;
            font-size: 0.875rem;
            color: #a89084;
        }

        .details {
            h3 {
                font-family: 'Playfair Display', serif;
                font-size: 1.25rem;
                color: #5a4a3a;
                margin-bottom: 0.5rem;
                font-weight: normal;
            }

            p {
                font-family: 'Playfair Display', serif;
                font-size: 1rem;
                color: #8b7355;
                line-height: 1.5;
            }
        }
    }
}
</style>