<template>
    <div class="p-2 hover:bg-trueGray-700 text-gray-50 rounded-lg cursor-pointer flex items-center justify-end" :class="(active) ? 'bg-trueGray-700' : ''"><slot/></div>
</template>

<script>
export default {
    name:"SettingsModalButton",
    props:{
        active:Boolean
    }
}
</script>