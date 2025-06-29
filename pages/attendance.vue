<template>
    <div class="attendance-page">
        <!-- Hero Section with Background Image -->
        <div class="hero-section">
            <div class="hero-overlay"></div>
            <!-- <div class="hero-content">
                <div class="hero-ornament">❦</div>
                <h1 class="hero-title">{{ __('Potvrdenie účasti') }}</h1>
                <p class="hero-subtitle">
                    {{ __('Vaša prítomnosť je pre nás najkrajším darom') }}
                </p>
                <div class="hero-ornament bottom">❦</div>
            </div> -->
        </div>

        <div class="main-content">
            <div v-if="!attendanceStore.isSubmitted" class="attendance-form">
                <!-- Elegant Form Header -->
                <div class="form-header">
                    <div class="decorative-line"></div>
                    <h2 class="form-title">{{ __('Kto sa zúčastní?') }}</h2>
                    <div class="decorative-line"></div>
                </div>

                <!-- Attendees Cards -->
                <div class="attendees-container">
                    <div 
                        v-for="(attendee, index) in attendanceStore.attendees" 
                        :key="attendee.id"
                        class="attendee-card"
                    >
                        <div class="card-header">
                            <div class="guest-number">{{ index + 1 }}. {{ __('hosť') }}</div>
                            <button 
                                v-if="attendanceStore.attendees.length > 1"
                                @click="removeAttendee(attendee.id)"
                                class="remove-button"
                                type="button"
                            >
                                <span>×</span>
                            </button>
                        </div>
                        
                        <div class="card-content">
                            <div class="input-group">
                                <label class="input-label">{{ __('Meno a priezvisko') }}</label>
                                <input
                                    v-model="attendee.name"
                                    type="text"
                                    :placeholder="__('Zadajte celé meno')"
                                    class="elegant-input"
                                    @input="updateAttendee(attendee.id, 'name', $event.target.value)"
                                />
                            </div>
                            
                            <div class="input-group">
                                <label class="input-label">{{ __('Špeciálne požiadavky') }}</label>
                                <input
                                    v-model="attendee.allergies"
                                    type="text"
                                    :placeholder="__('Alergie, diéta... (voliteľné)')"
                                    class="elegant-input secondary"
                                    @input="updateAttendee(attendee.id, 'allergies', $event.target.value)"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Add Guest Button -->
                <div class="add-guest-section">
                    <button @click="addAttendee" class="add-guest-btn" type="button">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">{{ __('Pridať ďalšieho hosťa') }}</span>
                    </button>
                </div>

                <!-- Submit Section -->
                <div class="submit-section">
                    <div class="submit-ornament">✦</div>
                    <button 
                        @click="submitAttendance"
                        :disabled="!attendanceStore.hasValidAttendees"
                        class="submit-button"
                    >
                        <span class="submit-text">{{ __('Potvrdiť účasť') }}</span>
                        <span class="submit-icon">→</span>
                    </button>
                    <div class="submit-ornament">✦</div>
                </div>
            </div>

            <!-- Success State -->
            <div v-else class="success-state">
                <div class="success-card">
                    <div class="success-icon-wrapper">
                        <div class="success-icon">✓</div>
                    </div>
                    
                    <h2 class="success-title">{{ __('Ďakujeme za potvrdenie!') }}</h2>
                    <p class="success-message">
                        {{ __('Vaša účasť bola úspešne zaznamenaná. Tešíme sa na Vás!') }}
                    </p>

                    <!-- Attendees Summary -->
                    <div class="attendees-summary">
                        <h3 class="summary-title">{{ __('Potvrdení hostia') }}</h3>
                        <div class="summary-list">
                            <div 
                                v-for="(attendee, index) in attendanceStore.attendees" 
                                :key="attendee.id"
                                class="summary-item"
                            >
                                <div class="attendee-details">
                                    <div class="attendee-name">{{ attendee.name }}</div>
                                    <div v-if="attendee.allergies" class="attendee-notes">
                                        {{ attendee.allergies }}
                                    </div>
                                </div>
                                <div class="attendance-status">
                                    <button
                                        @click="toggleAttendance(attendee.id)"
                                        class="status-toggle"
                                        :class="{ 'attending': attendee.attendance, 'not-attending': !attendee.attendance }"
                                    >
                                        {{ attendee.attendance ? __('Prídem') : __('Neprídem') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Button -->
                    <div class="edit-section">
                        <button @click="resetForm" class="edit-button">
                            {{ __('Upraviť údaje') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom gradient to blend with background -->
        <div class="bottom-gradient"></div>
    </div>
</template>

<script setup>
const attendanceStore = useAttendanceStore();

// Initialize with one empty attendee if none exist
onMounted(() => {
    if (attendanceStore.attendees.length === 0) {
        attendanceStore.addAttendee();
    }
});

const addAttendee = () => {
    attendanceStore.addAttendee();
};

const removeAttendee = (id) => {
    attendanceStore.removeAttendee(id);
};

const updateAttendee = (id, field, value) => {
    attendanceStore.updateAttendee(id, field, value);
};

const submitAttendance = () => {
    attendanceStore.submitAttendance();
};

const toggleAttendance = (id) => {
    attendanceStore.toggleAttendance(id);
};

const resetForm = () => {
    attendanceStore.resetForm();
    attendanceStore.addAttendee();
};
</script>

<style lang="scss" scoped>
.attendance-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f1f0 0%, #ede3e0 100%);
    position: relative;
}

.hero-section {
    position: relative;
    height: 50vh;
    min-height: 350px;
    background-image: url('/images/A7407803.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 40vh;
        min-height: 280px;
        background-attachment: scroll;
    }
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgb(0 0 0 / 70%) 0%, rgb(97 89 79 / 60%) 50%, rgb(193 173 163 / 50%) 100%);
    backdrop-filter: blur(0.5px);
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 1.5rem;
    max-width: 600px;

    @media (min-width: 768px) {
        padding: 2rem;
    }
}

.hero-ornament {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    opacity: 0.8;
    
    &.bottom {
        margin-top: 0.8rem;
        margin-bottom: 0;
        transform: rotate(180deg);
    }

    @media (min-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 1.2rem;
        
        &.bottom {
            margin-top: 1.2rem;
        }
    }
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: normal;
    margin-bottom: 0.8rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.1rem;

    @media (min-width: 768px) {
        font-size: 3.2rem;
        margin-bottom: 1.2rem;
    }
}

.hero-subtitle {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-style: italic;
    opacity: 0.95;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    line-height: 1.6;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
}

.main-content {
    position: relative;
    z-index: 3;
    margin-top: -80px;
    padding: 0 1rem 3rem;

    @media (min-width: 768px) {
        padding: 0 2rem 4rem;
        margin-top: -100px;
    }
}

.attendance-form {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 
        0 20px 40px rgba(90, 74, 58, 0.1),
        0 8px 16px rgba(90, 74, 58, 0.05);
    padding: 3rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);

    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
}

.form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    gap: 1.5rem;

    @media (min-width: 768px) {
        margin-bottom: 4rem;
        gap: 2rem;
    }
}

.decorative-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
        to right,
        transparent,
        rgba(139, 115, 85, 0.3),
        transparent
    );
    max-width: 100px;

    @media (min-width: 768px) {
        max-width: 150px;
    }
}

.form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #5a4a3a;
    font-weight: normal;
    white-space: nowrap;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 1.8rem;
    }
}

.attendees-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        gap: 2.5rem;
        margin-bottom: 3rem;
    }
}

.attendee-card {
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(168, 144, 132, 0.2);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(90, 74, 58, 0.1);
        border-color: rgba(139, 115, 85, 0.3);
    }

    @media (min-width: 768px) {
        padding: 2.5rem;
    }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.guest-number {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #8b7355;
    font-weight: 500;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
}

.remove-button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid rgba(231, 76, 60, 0.3);
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;

    &:hover {
        background: #e74c3c;
        color: white;
        transform: scale(1.1);
    }

    @media (min-width: 768px) {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.4rem;
    }
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 768px) {
        gap: 2rem;
    }
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-label {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #5a4a3a;
    font-weight: 500;
    letter-spacing: 0.02rem;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}

.elegant-input {
    padding: 1rem 1.25rem;
    border: 2px solid rgba(168, 144, 132, 0.2);
    border-radius: 12px;
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    color: #5a4a3a;

    &:focus {
        outline: none;
        border-color: #8b7355;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
        transform: translateY(-1px);
    }

    &::placeholder {
        color: #a89084;
        font-style: italic;
    }

    &.secondary {
        border-style: dashed;
        border-color: rgba(168, 144, 132, 0.15);
        
        &:focus {
            border-style: solid;
        }
    }

    @media (min-width: 768px) {
        padding: 1.25rem 1.5rem;
        font-size: 1.05rem;
    }
}

.add-guest-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
    border-top: 1px solid rgba(168, 144, 132, 0.1);
    border-bottom: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        margin-bottom: 4rem;
    }
}

.add-guest-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(168, 144, 132, 0.1));
    border: 2px dashed rgba(139, 115, 85, 0.3);
    border-radius: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    color: #5a4a3a;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 400;

    &:hover {
        background: linear-gradient(135deg, rgba(139, 115, 85, 0.15), rgba(168, 144, 132, 0.15));
        border-color: #8b7355;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 115, 85, 0.2);
    }

    .btn-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }

    @media (min-width: 768px) {
        padding: 1.25rem 2.5rem;
        font-size: 1rem;
        gap: 1rem;
    }
}

.submit-section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.submit-ornament {
    font-size: 1.5rem;
    color: rgba(139, 115, 85, 0.4);
    
    @media (min-width: 768px) {
        font-size: 2rem;
    }
}

.submit-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 3rem;
    background: linear-gradient(135deg, #5a4a3a, #4a3a2a);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
        transition: opacity 0.3s ease;
    }

    &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(90, 74, 58, 0.3);
        
        .submit-icon {
            transform: translateX(5px);
        }
    }

    &:disabled {
        background: linear-gradient(135deg, #ccc, #bbb);
        cursor: not-allowed;
        opacity: 0.6;
        
        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    .submit-icon {
        transition: transform 0.3s ease;
        font-size: 1.2rem;
    }

    @media (min-width: 768px) {
        padding: 1.5rem 4rem;
        font-size: 1.1rem;
    }
}

.success-state {
    max-width: 800px;
    margin: 0 auto;
}

.success-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 
        0 20px 40px rgba(90, 74, 58, 0.1),
        0 8px 16px rgba(90, 74, 58, 0.05);
    padding: 3rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-align: center;

    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
}

.success-icon-wrapper {
    margin-bottom: 2rem;
}

.success-icon {
    width: 5rem;
    height: 5rem;
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);

    @media (min-width: 768px) {
        width: 6rem;
        height: 6rem;
        font-size: 3rem;
    }
}

.success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: #5a4a3a;
    margin-bottom: 1rem;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
    }
}

.success-message {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #8b7355;
    line-height: 1.6;
    font-style: italic;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
        font-size: 1.2rem;
        margin-bottom: 4rem;
    }
}

.attendees-summary {
    text-align: left;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    border: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        padding: 2.5rem;
        margin-bottom: 4rem;
    }
}

.summary-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;
    text-align: center;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
}

.summary-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 1.5rem;
    }
}

.summary-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    border: 1px solid rgba(168, 144, 132, 0.1);

    @media (min-width: 768px) {
        padding: 2rem;
    }
}

.attendee-details {
    flex: 1;
}

.attendee-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #5a4a3a;
    font-weight: 500;
    margin-bottom: 0.25rem;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
}

.attendee-notes {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #8b7355;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 1rem;
    }
}

.attendance-status {
    margin-left: 1rem;
}

.status-toggle {
    padding: 0.75rem 1.5rem;
    border: 2px solid;
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;

    &.attending {
        background: rgba(39, 174, 96, 0.1);
        border-color: #27ae60;
        color: #27ae60;

        &:hover {
            background: rgba(39, 174, 96, 0.2);
            transform: translateY(-1px);
        }
    }

    &.not-attending {
        background: rgba(231, 76, 60, 0.1);
        border-color: #e74c3c;
        color: #e74c3c;

        &:hover {
            background: rgba(231, 76, 60, 0.2);
            transform: translateY(-1px);
        }
    }

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: 1rem;
        min-width: 120px;
    }
}

.edit-section {
    padding-top: 2rem;
    border-top: 1px solid rgba(168, 144, 132, 0.1);
}

.edit-button {
    padding: 1rem 2.5rem;
    background: transparent;
    color: #8b7355;
    border: 2px solid rgba(139, 115, 85, 0.3);
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(139, 115, 85, 0.1);
        border-color: #8b7355;
        color: #5a4a3a;
        transform: translateY(-2px);
    }

    @media (min-width: 768px) {
        padding: 1.25rem 3rem;
        font-size: 1rem;
    }
}

.bottom-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(246, 241, 240, 0.3) 30%,
        rgba(246, 241, 240, 0.8) 70%,
        #f6f1f0 100%
    );
    pointer-events: none;
    z-index: 1;
}
</style>