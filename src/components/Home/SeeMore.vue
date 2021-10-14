<template>
    <div class="flex justify-end">
        <button class="flex items-center p-2 mt-2 cursor-pointer rounded-full duration-200" :class="`hover:bg-${colour}-300`">
            <span class="text-sm">see more</span> <span class="material-icons ml-2">arrow_circle_right</span> 
        </button>
    </div>
</template>

<script>
export default {
    name:"SeeMoreButton",
    props:{
        colour:String
    }
}
</script>