<script setup>
// Redirect to photos page
const router = useRouter();
onMounted(() => {
    router.push({ name: 'gallery' });
});
</script>
