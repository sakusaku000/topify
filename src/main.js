import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

const app = createApp(App);

// -- Use vuex store
app.use(store);
// -- Use vue router
app.use(router);

// -- Mount application
app.mount("#app");
