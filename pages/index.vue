<template>
    <div class="welcome">
        <h2>Welcome to Our Wedding Website</h2>
        <p>We're excited to share our special day with you!</p>
    </div>
</template>

<script setup>
onMounted(() => {
    console.log('wuala');
    test();
});

const test = async () => {
    let response = await useAxios().$get('/api/wedding');

    console.log('lala', response);
};
</script>

<style lang="scss" scoped>
.welcome {
    text-align: center;

    h2 {
        color: #d4756d;
        margin-bottom: 1rem;
        font-family: 'Lato', sans-serif;
    }

    p {
        color: #2c3e50;
        font-family: 'Lato', sans-serif;
    }
}
</style>
