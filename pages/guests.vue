<template>
    <div class="guests-page">
        <GuestHeader />
        
        <div v-if="guestsStore.loading" class="loading">
            {{ __('Načítavam zoznam hostí...') }}
        </div>
        
        <div v-else class="tables-list">
            <TableGuests
                v-for="table in sortedTables"
                :key="table.id"
                :table="table"
                :guests="guestsStore.guestsByTable[table.id]"
            />
        </div>
    </div>
</template>

<script setup>
const guestsStore = useGuestsStore();

// Computed property to sort tables - user's table first
const sortedTables = computed(() => {
    if (!guestsStore.tables.length || !guestsStore.userGuest) {
        return guestsStore.tables;
    }

    return [...guestsStore.tables].sort((a, b) => {
        // If table A is user's table, it should come first
        if (a.id === guestsStore.userGuest.table_id) return -1;
        // If table B is user's table, it should come first
        if (b.id === guestsStore.userGuest.table_id) return 1;
        // Otherwise, maintain original order
        return 0;
    });
});

// Fetch guests data on page load
await guestsStore.fetchGuests();
</script>

<style lang="scss" scoped>
.guests-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
}

.loading {
    text-align: center;
    padding: 3rem;
    font-family: 'Times New Roman', serif;
    color: #666;
    font-style: italic;
}

.tables-list {
    padding: 2rem 0;
}
</style>