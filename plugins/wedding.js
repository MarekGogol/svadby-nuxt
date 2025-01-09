export default defineNuxtPlugin(async () => {
    const wedding = useWedding();

    // Fetch wedding data on app initialization
    await wedding.fetchWedding();
});
