<template>
    <nav class="navigation">
        <!-- <NuxtLink to="/gallery" class="nav-link">
            {{ __('Fotogaléria') }}
        </NuxtLink>
        <span class="divider"></span> -->
        <NuxtLink to="/photobook" class="nav-link">
            {{ __('Fotokniha') }}
        </NuxtLink>
        <span class="divider"></span>
        <NuxtLink to="/schedule" class="nav-link">
            {{ __('Harmonogram') }}
        </NuxtLink>
        <span class="divider"></span>
        <NuxtLink to="/attendance" class="nav-link">
            {{ __('Účasť') }}
        </NuxtLink>
    </nav>
</template>

<style lang="scss" scoped>
.navigation {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    flex-wrap: wrap;

    @media (min-width: 768px) {
        padding: 1.5rem;
        flex-wrap: nowrap;
    }

    .nav-link {
        font-family: 'Playfair Display', serif;
        font-size: 0.75rem;
        color: #6d6d6d;
        text-decoration: none;
        letter-spacing: 0.15rem;
        transition: all 0.3s;
        text-transform: uppercase;
        text-align: center;
        padding: 0.5rem 0;

        @media (min-width: 768px) {
            font-size: 0.875rem;
            letter-spacing: 0.2rem;
        }

        &:hover,
        &.router-link-active {
            color: #5a4a3a;
        }
    }

    .divider {
        width: 1px;
        height: 1rem;
        background-color: rgba(168, 144, 132, 0.3);
        display: block;

        @media (min-width: 768px) {
            height: 1.2rem;
        }
    }
}
</style>
