import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue'; 
import router from './router'
import ProductIndex from '../js/components/ProductIndex.vue';
 
createApp({
    components: {
        ProductIndex
    }
}).use(router).mount('#app') 