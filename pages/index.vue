<template>
    <div class="homepage">
        <!-- Hero Section with Background Image -->
        <PageHero background-image="/images/A7408066.jpg" />

        <div class="main-content">
            <div class="welcome-section">
                <div class="welcome-card">
                    <div class="ornament top">❦</div>
                    <h1 class="welcome-title">{{ __('Vitajte na našej svadobnej stránke') }}</h1>
                    <p class="welcome-message">
                        {{ __('Tešíme sa, že budete súčasťou nášho veľkého dňa. Nájdete tu všetky dôležité informácie o našej svadbe.') }}
                    </p>
                    <div class="ornament bottom">❦</div>
                </div>
            </div>

            <div class="quick-links">
                <div class="link-card">
                    <NuxtLink to="/photobook" class="quick-link">
                        <div class="link-icon">📸</div>
                        <h3>{{ __('Fotokniha') }}</h3>
                        <p>{{ __('Pridajte svoje fotografie do našej spoločnej fotoknihy') }}</p>
                    </NuxtLink>
                </div>

                <div class="link-card">
                    <NuxtLink to="/schedule" class="quick-link">
                        <div class="link-icon">📅</div>
                        <h3>{{ __('Harmonogram') }}</h3>
                        <p>{{ __('Pozrite si program svadobného dňa') }}</p>
                    </NuxtLink>
                </div>

                <div class="link-card">
                    <NuxtLink to="/attendance" class="quick-link">
                        <div class="link-icon">✉️</div>
                        <h3>{{ __('Účasť') }}</h3>
                        <p>{{ __('Potvrďte svoju účasť na našej svadbe') }}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Bottom gradient to blend with background -->
        <div class="bottom-gradient"></div>
    </div>
</template>

<script setup>
// No redirect needed anymore - this is now the proper homepage
</script>

<style lang="scss" scoped>
.homepage {
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f1f0 0%, #ede3e0 100%);
    position: relative;
}

.main-content {
    position: relative;
    z-index: 3;
    margin-top: -6.5rem;
    padding: 0 1rem 3rem;

    @media (min-width: 768px) {
        padding: 0 2rem 4rem;
        margin-top: -100px;
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

.welcome-section {
    margin-bottom: 3rem;

    @media (min-width: 768px) {
        margin-bottom: 4rem;
    }
}

.welcome-card {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 
        0 20px 40px rgba(90, 74, 58, 0.1),
        0 8px 16px rgba(90, 74, 58, 0.05);
    padding: 2.5rem 2rem;
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-align: center;

    @media (min-width: 768px) {
        padding: 4rem 3rem;
    }
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

.welcome-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: #5a4a3a;
    margin-bottom: 1.5rem;
    font-weight: normal;
    letter-spacing: 0.05rem;

    @media (min-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }
}

.welcome-message {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #8b7355;
    line-height: 1.7;
    font-style: italic;

    @media (min-width: 768px) {
        font-size: 1.2rem;
        line-height: 1.8;
    }
}

.quick-links {
    display: grid;
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }
}

.link-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 
        0 10px 25px rgba(90, 74, 58, 0.08),
        0 4px 10px rgba(90, 74, 58, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 
            0 20px 40px rgba(90, 74, 58, 0.12),
            0 8px 16px rgba(90, 74, 58, 0.08);
    }
}

.quick-link {
    display: block;
    padding: 2rem 1.5rem;
    text-decoration: none;
    color: inherit;
    text-align: center;

    @media (min-width: 768px) {
        padding: 2.5rem 2rem;
    }

    .link-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        display: block;

        @media (min-width: 768px) {
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }
    }

    h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.3rem;
        color: #5a4a3a;
        margin-bottom: 0.75rem;
        font-weight: normal;

        @media (min-width: 768px) {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    }

    p {
        font-family: 'Playfair Display', serif;
        font-size: 0.95rem;
        color: #8b7355;
        line-height: 1.5;
        font-style: italic;
        margin: 0;

        @media (min-width: 768px) {
            font-size: 1rem;
            line-height: 1.6;
        }
    }

    &:hover {
        h3 {
            color: #4a3a2a;
        }
    }
}
</style>