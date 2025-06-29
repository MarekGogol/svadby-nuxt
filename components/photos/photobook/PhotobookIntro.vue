<template>
    <div v-if="!isHidden" class="photobook-intro">
        <div class="decorative-border">
            <div class="intro-content">
                <div class="ornament top">❦</div>
                <h1 class="title">{{ __('Naša svadobná fotokniha') }}</h1>
                <p class="description">
                    {{ __('Vytvorte s nami nezabudnuteľnú svadobnú fotoknihu. Každá fotografia, ktorú nahráte, sa stane súčasťou našich spoločných spomienok.') }}
                </p>
                <button class="cta-button" @click="handleClick">
                    <span class="button-text">{{ __('Pridať fotografie') }}</span>
                    <span class="button-ornament">❧</span>
                </button>
                <div class="ornament bottom">❦</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const isHidden = ref(false);

localStorage.setItem('photobookIntroHidden', false)
// Check localStorage on component mount
onMounted(() => {
    isHidden.value = localStorage.getItem('photobookIntroHidden') === 'true';
});

const handleClick = () => {
    // Save to localStorage and hide the component
    localStorage.setItem('photobookIntroHidden', 'true');
    isHidden.value = true;
    
    // Scroll to upload section
    scrollToUploadSection();
};

const scrollToUploadSection = () => {
        nextTick(() => {
            const uploadSection = document.querySelector('.upload-section');
            if (uploadSection) {
                const offset = uploadSection.offsetTop - 100;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    };
</script>

<style lang="scss" scoped>
.photobook-intro {
    padding: 1rem 1rem;
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.4)
    );
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(90, 74, 58, 0.08);
}

.decorative-border {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    padding: 2rem;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    &::before {
        border: 1px solid rgba(139, 115, 85, 0.2);
        transform: scale(0.98);
    }

    &::after {
        border: 1px solid rgba(139, 115, 85, 0.2);
        transform: scale(1.02);
    }
}

.intro-content {
    position: relative;
}

.ornament {
    font-size: 1.5rem;
    color: rgba(139, 115, 85, 0.6);
    margin: 1rem 0;

    &.top {
        transform: rotate(180deg);
    }

    @media (min-width: 768px) {
        font-size: 2rem;
        margin: 1.5rem 0;
    }
}

.title {
    font-family: 'Times New Roman', serif;
    font-size: 1.75rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;
    letter-spacing: 0.1rem;
    position: relative;
    display: inline-block;

    @media (min-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }

    &::before,
    &::after {
        content: '~';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(139, 115, 85, 0.4);
        font-size: 1.5rem;

        @media (min-width: 768px) {
            font-size: 2rem;
        }
    }

    &::before {
        left: -2rem;
    }

    &::after {
        right: -2rem;
    }
}

.description {
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    color: #8b7355;
    line-height: 1.8;
    font-style: italic;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 3rem;
    }
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 2rem;
    background: #5a4a3a;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
        padding: 1rem 3rem;
        font-size: 1.1rem;
        margin-bottom: 3rem;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            transparent
        );
    }

    &:hover {
        background: #4a3a2a;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(90, 74, 58, 0.3);

        .button-ornament {
            transform: rotate(180deg);
        }
    }

    .button-text {
        letter-spacing: 0.05em;
    }

    .button-ornament {
        font-size: 1.2rem;
        transition: transform 0.3s ease;
    }
}

.features {
    display: grid;
    gap: 2rem;
    max-width: 600px;
    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
    }
}

.feature {
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 1px;
        background: rgba(139, 115, 85, 0.3);
        top: 50%;
        display: none;

        @media (min-width: 768px) {
            display: block;
        }
    }

    &:first-child::before,
    &:last-child::after {
        display: none;
    }

    &::before {
        left: -20px;
    }

    &::after {
        right: -20px;
    }
}

.feature-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .icon {
        font-size: 1.5rem;
        color: rgba(139, 115, 85, 0.8);
        
        @media (min-width: 768px) {
            font-size: 1.75rem;
        }
    }

    .text {
        font-family: 'Times New Roman', serif;
        font-size: 0.9rem;
        color: #5a4a3a;
        text-align: center;
        line-height: 1.6;
        font-style: italic;

        @media (min-width: 768px) {
            font-size: 1rem;
        }
    }
}
</style>