import { createRouter, createWebHistory } from 'vue-router'
 
import ProductIndex from '../components/ProductIndex.vue'
import ProductCreate from '../components/ProductCreate.vue'
import ProductEdit from '../components/ProductEdit.vue'
 
const routes = [
    {
        path: '/dashboard',
        name: 'products.index',
        component: ProductIndex
    },
    {
        path: '/products/create',
        name: 'products.create',
        component: ProductCreate
    },
    {
        path: '/products/:id/edit',
        name: 'products.edit',
        component: ProductEdit,
        props: true
    }
];
 
export default createRouter({
    history: createWebHistory(),
    routes
})