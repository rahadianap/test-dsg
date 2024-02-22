<template>
    <div v-if="errors">
        <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
            <p v-for="error in v" :key="error" class="text-sm">
                {{ error }}
            </p>
        </div>
    </div>
 
    <form class="space-y-6" v-on:submit.prevent="saveProduct">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="product_brand" class="block text-sm font-medium text-gray-700">Brand</label>
                <div class="mt-1">
                    <input type="text" name="product_brand" id="product_brand"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            v-model="product.product_brand">
                </div>
            </div>
            <br>
            <div>
                <label for="product_type" class="block text-sm font-medium text-gray-700">Type</label>
                <div class="mt-1">
                    <input type="text" name="product_type" id="product_type"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            v-model="product.product_type">
                </div>
            </div>
            <br>
            <div>
                <label for="product_stock" class="block text-sm font-medium text-gray-700">Stock</label>
                <div class="mt-1">
                    <input type="number" name="product_stock" id="product_stock"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            v-model="product.product_stock">
                </div>
            </div>
            <br>
            <div>
                <label for="product_price" class="block text-sm font-medium text-gray-700">Price</label>
                <div class="mt-1">
                    <input type="number" name="product_price" id="product_price"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            v-model="product.product_price">
                </div>
            </div>
            <br>
            <div>
                <label for="product_description" class="block text-sm font-medium text-gray-700">Description</label>
                <div class="mt-1">
                    <input type="text" name="product_description" id="product_description"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            v-model="product.product_description">
                </div>
            </div>
        </div>
 
        <button type="submit"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md ring-gray-300 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
            Save
        </button>
    </form>
</template>
 
<script setup>
import useProducts from '../products'
import { onMounted } from 'vue';
 
const { errors, product, updateProduct, getProduct } = useProducts()
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
 
onMounted(() => getProduct(props.id))
 
const saveProduct = async () => {
    await updateProduct(props.id)
}
</script>