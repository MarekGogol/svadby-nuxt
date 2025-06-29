<template>
    <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-gradient-mask"></div>
    </div>
</template>

<style lang="scss" scoped>
.hero-section {
    position: relative;
    height: 50vh;
    min-height: 350px;
    background-image: url('/images/A7407803.jpg');
    background-size: contain;
    background-position: top center;
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
    backdrop-filter: blur(0.5px);
}

.hero-gradient-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(246, 241, 240, 0.1) 20%,
        rgba(246, 241, 240, 0.5) 50%,
        rgba(246, 241, 240, 0.8) 80%,
        #f6f1f0 100%
    );
    z-index: 3;
}
</style>
