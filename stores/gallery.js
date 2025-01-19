import { defineStore } from 'pinia';

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        photos: [],
        loading: false,
        pagination: null,
        type: 'gallery'
    }),

    actions: {
        addPhoto(photo) {
            this.photos.unshift(photo);
        },

        async fetchPhotos(page = 1, type = null) {
            if (this.loading) return;

            if (type) {
                this.type = type;
            }

            this.loading = true;
            try {
                const { data } = await useAxios().$get('/api/event/galleries', {
                    params: {
                        type: this.type,
                        page
                    }
                });

                if (data?.pagination?.data) {
                    if (page === 1) {
                        this.photos = data.pagination.data;
                    } else {
                        this.photos = [...this.photos, ...data.pagination.data];
                    }
                    this.pagination = data.pagination;
                }
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            } finally {
                this.loading = false;
            }
        },

        hasMorePages() {
            if (!this.pagination) return false;
            return this.pagination.current_page < this.pagination.last_page;
        },

        clearPhotos() {
            this.photos = [];
            this.pagination = null;
        },

        async loadMore() {
            if (!this.hasMorePages() || this.loading) return;

            await this.fetchPhotos(this.pagination.current_page + 1);
        },

        setType(type) {
            if (this.type !== type) {
                this.type = type;
                this.clearPhotos();
            }
        }
    }
});