<template>
    <div class="p-5 md:p-10 flex items-center justify-between">
        <Title/>

        <RouterLinks class="hidden md:flex"/>

        <User/>
    </div>
</template>

<script>
import Title from './NavBar/Title.vue';
import RouterLinks from './NavBar/RouterLinks.vue';
import User from './NavBar/User.vue';

export default {
    name:"NavBar",
    components:{
        Title,
        RouterLinks,
        User
    }
}
</script>