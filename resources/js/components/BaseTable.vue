<script setup>
/* eslint-disable */
import { computed, defineProps, ref } from "vue";
import SearchForm from './SearchForm.vue';
import useProducts from '../products'
import { onMounted } from 'vue';
 
const { products, getProducts, destroyProduct } = useProducts()
 
onMounted(getProducts)

const searchFilter = ref('');

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const filteredItems = computed(() => {
  let items = props.items;

  if(searchFilter.value != '') {
    items =  items.filter(
      item => item.product_brand.includes(searchFilter.value));
  }
  return items;
});

const handleSearch = (search) => {
  searchFilter.value = search;
};

const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyProduct(id);
    await getProducts();
}

</script>

<template>
  <div class="bg-white relative border rounded-lg">
    <div class="flex items-center justify-between">
      <SearchForm @search="handleSearch"></SearchForm>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-500">
        <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Brand</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Stock</th>
            <th class="px-4 py-3">Price</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">
                <span class="sr-only">...</span>
            </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id" class="border-b">
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.product_brand }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.product_type }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.product_stock }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.product_price }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.product_description }}</td>
          <td class="px-6 py-4 text-sm leading-5 space-x-2 text-center text-gray-900 whitespace-no-wrap">
                <router-link :to="{ name: 'products.edit', params: { id: item.id } }"
                                class="mr-5 inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md ring-gray-300 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">Edit</router-link> 
                <button @click="deleteProduct(item.id)"
                class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md ring-gray-300 hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">Delete</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>