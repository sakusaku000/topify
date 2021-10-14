<template>
    <div class="flex items-center gap-10 select-none">
        <router-link v-for="route in routes" :key="route.path" :to="route.path" class="px-3 py-2 rounded-lg hover:bg-green-500 hover:text-gray-900 duration-200 lowercase font-semibold" active-class="bg-green-500 text-gray-900">{{route.name}}</router-link>
    </div>
</template>

<script>
export default {
    name:"RouterLinks",
    data() {
        return {
            routes:this.$router.options.routes
        }
    }
}
</script>