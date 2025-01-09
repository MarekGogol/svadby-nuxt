<template>
    <nav class="navigation">
        <NuxtLink to="/photos" class="nav-link">PHOTOGRAPHS</NuxtLink>
        <span class="divider"></span>
        <NuxtLink to="/schedule" class="nav-link">TIMELINE</NuxtLink>
    </nav>
</template>

<style lang="scss" scoped>
.navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 1.5rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .nav-link {
        font-family: 'Times New Roman', serif;
        font-size: 0.875rem;
        color: #999;
        text-decoration: none;
        letter-spacing: 0.2rem;
        transition: all 0.3s;

        &:hover, &.router-link-active {
            color: #000;
        }
    }

    .divider {
        width: 1px;
        height: 1rem;
        background-color: #eee;
    }
}
</style>