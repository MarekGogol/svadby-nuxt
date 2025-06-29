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
    
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2;
    
    // Increase base radius by 10%
    const radius = 110; // Changed from 100 to 110
    const mobileScale = window.innerWidth < 768 ? 0.7 : 1;
    const finalRadius = radius * mobileScale;
    
    const x = Math.cos(angle) * finalRadius;
    const y = Math.sin(angle) * finalRadius;
    
    return {
        transform: `translate(${x}px, ${y}px)`,
    };
};
</script>

<style lang="scss" scoped>
.table-section {
    margin-bottom: 1.05rem; // Reduced by 30% from 1.5rem
    background: rgba(255, 255, 255, 0.6);
    padding: 0.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(90, 74, 58, 0.08);

    @media (min-width: 768px) {
        margin-bottom: 2.1rem; // Reduced by 30% from 3rem
        padding: 1rem;
        border-radius: 16px;
    }
}

.table-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.75rem;
    color: #a89084;
    letter-spacing: 0.1rem;
    margin-bottom: 0.75rem;
    font-weight: normal;
    text-align: center;

    @media (min-width: 768px) {
        font-size: 1rem;
        letter-spacing: 0.2rem;
        margin-bottom: 2rem;
    }
}

.table-container {
    position: relative;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;

    @media (min-width: 768px) {
        height: 400px;
        margin: 2rem 0;
    }
}

.round-table {
    position: relative;
    width: 100px;
    height: 100px;

    @media (min-width: 768px) {
        width: 180px;
        height: 180px;
    }
}

.table-top {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at center, 
            rgba(255,255,255,0.8) 0%, 
            rgba(255,255,255,0.4) 100%),
        repeating-radial-gradient(
            circle at center,
            #f0e5d4, /* Warmer base color */
            #f0e5d4 2px,
            #e5dac9 2px, /* Warmer secondary color */
            #e5dac9 4px
        );
    border: 4px solid #d4c9b8; /* Warmer border color */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
        inset 0 2px 5px rgba(255,255,255,0.6),
        inset 0 -2px 5px rgba(90, 74, 58, 0.1),
        0 5px 15px rgba(90, 74, 58, 0.1);
    
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        border: 2px solid rgba(212, 201, 184, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);

        @media (min-width: 768px) {
            width: calc(100% - 20px);
            height: calc(100% - 20px);
        }
    }
}

.table-number {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #8b7355;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);

    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
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
    font-family: 'Playfair Display', serif;
    padding: 0.35rem 0.75rem;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(168, 144, 132, 0.3);
    border-radius: 15px;
    color: #8b7355;
    text-align: center;
    user-select: none;
    white-space: nowrap;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px rgba(90, 74, 58, 0.1);
    font-size: 0.75rem;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 25px;
        max-width: 200px;
        box-shadow: 0 2px 4px rgba(90, 74, 58, 0.1);
    }

    &.is-clickable {
        cursor: pointer;
        
        &:hover {
            border-color: #5a4a3a;
            color: #5a4a3a;
            box-shadow: 0 2px 4px rgba(90, 74, 58, 0.2);
            background: rgba(255, 255, 255, 1);

            @media (min-width: 768px) {
                box-shadow: 0 4px 8px rgba(90, 74, 58, 0.2);
            }
        }
    }

    &.is-current-user {
        border-style: dashed;
        border-color: #8b7355;
    }

    &.is-selected {
        border-color: #5a4a3a;
        color: #5a4a3a;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(90, 74, 58, 0.25);
        background: rgba(255, 255, 255, 1);

        @media (min-width: 768px) {
            box-shadow: 0 4px 12px rgba(90, 74, 58, 0.25);
        }
    }

    &.is-attending {
        background-color: rgba(76, 175, 80, 0.1);
        border-color: rgba(76, 175, 80, 0.3);
    }

    &.not-attending {
        background-color: rgba(244, 67, 54, 0.1);
        border-color: rgba(244, 67, 54, 0.3);
    }
}
</style>