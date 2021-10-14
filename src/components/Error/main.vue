<template>
    <div class="h-screen flex flex-col items-center justify-center text-center">
        <div class="mb-5">
            <h1 class="font-bold text-4xl">an error has occurred</h1>
            <h2 class="text-lg">{{error_string}}</h2>
        </div>
        <button @click="reload" class="p-2 hover:bg-green-500 duration-200 ring-1 ring-green-500 w-32 rounded-xl">
            reload
        </button>
    </div>
</template>

<script>
export default {
    name:"Error",
    props:{
        error:String
    },
    data() {
        return {
            error_string:this.$props.error || "unknown_error"
        }
    },
    mounted() {
        this.$router.replace("/");
        switch(this.error_string) {
            case "access_denied":
                this.error_string = "access to spotify account has been denied";
                break;
        };
    },
    methods:{
        reload() {
            window.location.replace("/");
        }
    }
}
</script>