<template>
    <div class="app-section">
        <div class="app-wrapper">
            <div class="app-masonry">
                <div
                    v-for="image in images"
                    :key="image"
                    :style="`background-image: url(${image})`"
                >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import pluralize from '~/utils/pluralize'

export default {
    props: {
        images: {
            type: Array,
            required: true,
        }
    },
    methods: {
        // pluralize,
    }
}
</script>