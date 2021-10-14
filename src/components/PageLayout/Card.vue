<template>
    <div class="m-6 p-6 rounded-xl shadow-lg" :class="`bg-gradient-to-br from-${bg}-400 to-${bg}-500 ${text} ${(click) ? 'cursor-pointer' : ''}`">
        <slot/>
    </div>
</template>

<script>
export default {
    name:"Card",
    props:{
        bg:String,
        text:String,
        click:Boolean
    }
}
</script>