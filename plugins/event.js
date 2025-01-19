export default defineNuxtPlugin(async () => {
    // Fetch event data on app initialization
    await useEventStore().fetchEvent();
});
