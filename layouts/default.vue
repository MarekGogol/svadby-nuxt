<template>
    <div class="container">
        <div class="side-text">S & M</div>
        <div class="content-wrapper">
            <header>
                <div class="date">SEPTEMBER 21, 2024</div>
                <div class="names">
                    ŠIMONA
                    <br />
                    &
                    <br />
                    MAREK
                </div>
            </header>

            <div class="content">
                <Menu />
                <div class="page-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment';
const wedding = useWedding();
</script>

<style lang="scss" scoped>
.container {
    min-height: 100vh;
    position: relative;
    display: flex;
    padding: 0;
}

.side-text {
    position: fixed;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    font-family: 'Times New Roman', serif;
    font-size: 1rem;
    color: #999;
    letter-spacing: 0.5rem;
    white-space: nowrap;
    display: none;

    @media (min-width: 1200px) {
        display: block;
    }
}

.content-wrapper {
    flex: 1;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    text-align: center;
    margin-bottom: 4rem;
    padding: 4rem 1rem;

    .date {
        font-family: 'Times New Roman', serif;
        font-size: 0.875rem;
        color: #999;
        letter-spacing: 0.25rem;
        margin-bottom: 2rem;
    }

    .names {
        font-family: 'Times New Roman', serif;
        font-size: 3.5rem;
        line-height: 1.2;
        color: #000;
        font-weight: normal;

        @media (min-width: 768px) {
            font-size: 5rem;
        }
    }
}

.content {
    background-color: white;
    border: none;
    max-width: 800px;
    margin: 0 auto;
}

.page-content {
    padding: 2rem;

    @media (min-width: 768px) {
        padding: 3rem;
    }
}
</style>
