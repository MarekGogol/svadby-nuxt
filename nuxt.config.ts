// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2025-01-09',
    devtools: { enabled: false },
    modules: ['@pinia/nuxt'],
    components: {
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
                prefix: '',
                global: true
            },
        ],
    },
    imports: {
        dirs: ['stores'],
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true, // This suppresses deprecation warnings from dependencies
                },
            },
        },
        server: {
            headers: {
                'Cross-Origin-Opener-Policy': 'same-origin',
                'Cross-Origin-Embedder-Policy': 'require-corp',
            },
        },
    },
    css: ['@/assets/scss/main.scss'],
});
