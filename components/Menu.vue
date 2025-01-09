<template>
    <div class="navigation">
        <NuxtLink
            to="/"
            class="nav-button"
        >
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Home</span>
        </NuxtLink>
        <NuxtLink
            to="/photos"
            class="nav-button"
        >
            <span class="nav-icon">📸</span>
            <span class="nav-text">Upload Photos</span>
        </NuxtLink>
        <NuxtLink
            to="/schedule"
            class="nav-button"
        >
            <span class="nav-icon">📅</span>
            <span class="nav-text">Schedule</span>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
$primary-color: #f8e8e8;
$accent-color: #d4756d;
$text-color: #2c3e50;

.navigation {
    display: flex;
    background-color: $primary-color;
    padding: 0.5rem;
    gap: 0.5rem;

    .nav-button {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem;
        font-size: 0.9rem;
        font-weight: 500;
        background: none;
        cursor: pointer;
        transition: all 0.3s;
        color: $text-color;
        font-family: 'Lato', sans-serif;
        border-radius: 0.75rem;
        text-decoration: none;

        .nav-icon {
            font-size: 1.5rem;
        }

        .nav-text {
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        &:hover {
            background-color: rgba($accent-color, 0.1);
        }

        &.router-link-active {
            background-color: white;
            color: $accent-color;
            box-shadow: 0 2px 8px rgba($accent-color, 0.15);
            transform: translateY(-2px);
        }
    }
}
</style>