<template>
    <div class="attendance-page">
        <div class="page-header">
            <p class="page-description">
                {{ __('Prosíme o potvrdenie Vašej účasti.') }}
            </p>
        </div>

        <div v-if="!attendanceStore.isSubmitted" class="attendance-form">
            <div class="form-section">
                <h2 class="section-title">{{ __('Pridať účastníkov') }}</h2>
                
                <div class="attendees-list">
                    <div 
                        v-for="(attendee, index) in attendanceStore.attendees" 
                        :key="attendee.id"
                        class="attendee-row"
                    >
                        <div class="row-number">{{ index + 1 }}.</div>
                        <div class="attendee-fields">
                            <div class="field-group">
                                <input
                                    v-model="attendee.name"
                                    type="text"
                                    :placeholder="__('Meno a priezvisko')"
                                    class="name-input"
                                    @input="updateAttendee(attendee.id, 'name', $event.target.value)"
                                />
                                <input
                                    v-model="attendee.allergies"
                                    type="text"
                                    :placeholder="__('Alergie (voliteľné)')"
                                    class="allergies-input"
                                    @input="updateAttendee(attendee.id, 'allergies', $event.target.value)"
                                />
                            </div>
                            <button 
                                v-if="attendanceStore.attendees.length > 1"
                                @click="removeAttendee(attendee.id)"
                                class="remove-btn"
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button @click="addAttendee" class="add-btn" type="button">
                        <span class="btn-icon">+</span>
                        {{ __('Pridať ďalšiu osobu') }}
                    </button>
                </div>
            </div>

            <div class="submit-section">
                <button 
                    @click="submitAttendance"
                    :disabled="!attendanceStore.hasValidAttendees"
                    class="submit-btn"
                >
                    {{ __('Potvrdiť účasť') }}
                </button>
            </div>
        </div>

        <div v-else class="submitted-attendance">
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h2>{{ __('Ďakujeme za potvrdenie účasti!') }}</h2>
                <p>{{ __('Vaša účasť bola úspešne zaznamenaná. Môžete ju kedykoľvek zmeniť do týždňa pred svadbou.') }}</p>
            </div>

            <div class="attendees-summary">
                <h3 class="summary-title">{{ __('Vaši účastníci') }}</h3>
                <div class="attendees-list-submitted">
                    <div 
                        v-for="(attendee, index) in attendanceStore.attendees" 
                        :key="attendee.id"
                        class="submitted-attendee"
                    >
                        <div class="attendee-info">
                            <div class="attendee-name">{{ attendee.name }}</div>
                            <div v-if="attendee.allergies" class="attendee-allergies">
                                {{ __('Alergie') }}: {{ attendee.allergies }}
                            </div>
                        </div>
                        <div class="attendance-toggle">
                            <button
                                @click="toggleAttendance(attendee.id)"
                                class="attendance-btn"
                                :class="{ 'attending': attendee.attendance, 'not-attending': !attendee.attendance }"
                            >
                                {{ attendee.attendance ? __('Prídem') : __('Neprídem') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions-submitted">
                <button @click="resetForm" class="reset-btn">
                    {{ __('Upraviť účasť') }}
                </button>
            </div>
        </div>
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
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
        padding: 0 2rem;
    }
}

.page-header {
    text-align: center;
    margin-bottom: 1rem;
    padding: 1rem 0;
}

.page-description {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #8b7355;
    line-height: 1.6;
    font-style: italic;
    max-width: 600px;
    margin: 0 auto;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
}

.attendance-form {
    margin-bottom: 2rem;
}

.form-section {
    margin-bottom: 2rem;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
}

.attendees-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        gap: 1.5rem;
    }
}

.attendee-row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    border: 1px solid rgba(168, 144, 132, 0.2);

    @media (min-width: 768px) {
        padding: 1.5rem;
        border-radius: 12px;
    }
}

.row-number {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #8b7355;
    font-weight: bold;
    min-width: 1.5rem;
    margin-top: 0.5rem;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
}

.attendee-fields {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.field-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: 768px) {
        gap: 1rem;
    }
}

.name-input,
.allergies-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(168, 144, 132, 0.3);
    border-radius: 8px;
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.9);
    transition: all 0.3s;

    @media (min-width: 768px) {
        padding: 1rem 1.25rem;
        font-size: 1rem;
    }

    &:focus {
        outline: none;
        border-color: #5a4a3a;
        box-shadow: 0 0 0 2px rgba(90, 74, 58, 0.1);
        background: rgba(255, 255, 255, 1);
    }

    &::placeholder {
        color: #a89084;
        font-style: italic;
    }
}

.remove-btn {
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s;
    margin-top: 0.375rem;

    @media (min-width: 768px) {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.4rem;
    }

    &:hover {
        background: #c0392b;
        transform: scale(1.1);
    }
}

.form-actions {
    margin-top: 1.5rem;
    text-align: center;

    @media (min-width: 768px) {
        margin-top: 2rem;
    }
}

.add-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(90, 74, 58, 0.1);
    color: #5a4a3a;
    border: 2px dashed rgba(90, 74, 58, 0.3);
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;

    @media (min-width: 768px) {
        padding: 1rem 2rem;
        font-size: 1rem;
    }

    &:hover {
        background: rgba(90, 74, 58, 0.15);
        border-color: #5a4a3a;
        transform: translateY(-1px);
    }

    .btn-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }
}

.submit-section {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(168, 144, 132, 0.2);
}

.submit-btn {
    padding: 1rem 3rem;
    background: #5a4a3a;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    @media (min-width: 768px) {
        padding: 1.25rem 4rem;
        font-size: 1.1rem;
    }

    &:hover:not(:disabled) {
        background: #4a3a2a;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(90, 74, 58, 0.3);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.submitted-attendance {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(90, 74, 58, 0.1);

    @media (min-width: 768px) {
        padding: 3rem;
        border-radius: 16px;
    }
}

.success-message {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(168, 144, 132, 0.2);
}

.success-icon {
    width: 4rem;
    height: 4rem;
    background: #27ae60;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 1.5rem;

    @media (min-width: 768px) {
        width: 5rem;
        height: 5rem;
        font-size: 2.5rem;
    }
}

.success-message h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #5a4a3a;
    margin-bottom: 1rem;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 2rem;
    }
}

.success-message p {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #8b7355;
    line-height: 1.6;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
}

.attendees-summary {
    margin-bottom: 2rem;
}

.summary-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 1.5rem;
    }
}

.attendees-list-submitted {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.submitted-attendee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    border: 1px solid rgba(168, 144, 132, 0.2);

    @media (min-width: 768px) {
        padding: 1.5rem;
        border-radius: 12px;
    }
}

.attendee-info {
    flex: 1;
}

.attendee-name {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #5a4a3a;
    font-weight: bold;
    margin-bottom: 0.25rem;

    @media (min-width: 768px) {
        font-size: 1.1rem;
    }
}

.attendee-allergies {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    color: #8b7355;
    font-style: italic;
}

.attendance-toggle {
    margin-left: 1rem;
}

.attendance-btn {
    padding: 0.5rem 1rem;
    border: 1px solid;
    border-radius: 6px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 80px;

    @media (min-width: 768px) {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        min-width: 100px;
    }

    &.attending {
        background: rgba(39, 174, 96, 0.1);
        border-color: #27ae60;
        color: #27ae60;

        &:hover {
            background: rgba(39, 174, 96, 0.2);
        }
    }

    &.not-attending {
        background: rgba(231, 76, 60, 0.1);
        border-color: #e74c3c;
        color: #e74c3c;

        &:hover {
            background: rgba(231, 76, 60, 0.2);
        }
    }
}

.form-actions-submitted {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(168, 144, 132, 0.2);
}

.reset-btn {
    padding: 0.75rem 2rem;
    background: transparent;
    color: #8b7355;
    border: 1px solid rgba(139, 115, 85, 0.3);
    border-radius: 8px;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s;

    @media (min-width: 768px) {
        padding: 1rem 2.5rem;
        font-size: 1rem;
    }

    &:hover {
        background: rgba(139, 115, 85, 0.1);
        border-color: #8b7355;
        color: #5a4a3a;
    }
}
</style>