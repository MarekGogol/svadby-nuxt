<template>
    <div class="table-section">
        <h3 class="table-title">{{ __('STÔL') }} {{ table.number }}</h3>
        <div class="table-container">
            <div class="round-table">
                <div class="table-top">
                    <span class="table-number">{{ table.number }}</span>
                </div>
                <div 
                    v-for="(guest, index) in guests" 
                    :key="guest.id"
                    class="guest-seat"
                    :style="calculatePosition(index, guests.length)"
                >
                    <div
                        class="guest-item"
                        :class="{
                            'is-selected': guestsStore.currentGuest?.id === guest.id,
                            'is-attending': guest.attendance === true,
                            'not-attending': guest.attendance === false,
                            'is-clickable': isClickable(guest),
                            'is-current-user': isCurrentUser(guest)
                        }"
                        @click="handleGuestClick(guest)"
                    >
                        {{ guest.username }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const guestsStore = useGuestsStore();

defineProps({
    table: {
        type: Object,
        required: true
    },
    guests: {
        type: Array,
        required: true
    }
});

const isClickable = (guest) => {
    return guest.id === guestsStore.userGuest?.id;
};

const isCurrentUser = (guest) => {
    return guest.id === guestsStore.userGuest?.id;
};

const handleGuestClick = (guest) => {
    if (isClickable(guest)) {
        guestsStore.setCurrentGuest(guest);
    }
};

const calculatePosition = (index, total) => {
    if (total === 0) return {};
    
    // Calculate the angle for this guest
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2; // Start from top
    
    // Calculate position on the circle
    const radius = 220; // Increased radius for bigger circle
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return {
        transform: `translate(${x}px, ${y}px)`,
    };
};
</script>

<style lang="scss" scoped>
.table-section {
    margin-bottom: 6rem;
}

.table-title {
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    color: #999;
    letter-spacing: 0.2rem;
    margin-bottom: 2rem;
    font-weight: normal;
    text-align: center;
}

.table-container {
    position: relative;
    height: 600px; // Increased height
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
}

.round-table {
    position: relative;
    width: 220px; // Increased size
    height: 220px; // Increased size
}

.table-top {
    position: absolute;
    width: 220px; // Increased size
    height: 220px; // Increased size
    background: #f5f5f5;
    border: 3px solid #ddd; // Slightly thicker border
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px; // Adjusted inner circle
        height: 200px; // Adjusted inner circle
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
}

.table-number {
    font-family: 'Times New Roman', serif;
    font-size: 3rem; // Bigger number
    color: #999;
}

.guest-seat {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
}

.guest-item {
    position: absolute;
    transform: translate(-50%, -50%);
    font-family: 'Times New Roman', serif;
    padding: 1rem 2rem; // Increased padding
    background: white;
    border: 1px solid #eee;
    border-radius: 25px; // Slightly larger radius
    color: #666;
    text-align: center;
    user-select: none;
    white-space: nowrap;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    font-size: 1.1rem; // Slightly larger font

    &.is-clickable {
        cursor: pointer;
        
        &:hover {
            border-color: #000;
            color: #000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    }

    &.is-current-user {
        border-style: dashed;
    }

    &.is-selected {
        border-color: #000;
        color: #000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &.is-attending {
        background-color: rgba(0, 128, 0, 0.1);
        border-color: rgba(0, 128, 0, 0.2);
    }

    &.not-attending {
        background-color: rgba(255, 0, 0, 0.1);
        border-color: rgba(255, 0, 0, 0.2);
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .table-container {
        height: 500px;
        transform: scale(0.8);
        transform-origin: center center;
    }

    .guest-item {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .table-container {
        transform: scale(0.6);
    }
}
</style>