import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
 
export default function useProducts() {
    const product = ref([])
    const products = ref([])
 
    const errors = ref('')
    const router = useRouter()
 
    const getProducts = async () => {
        let response = await axios.get('/api/products')
        products.value = response.data.data
    }
 
    const getProduct = async (id) => {
        let response = await axios.get(`/api/products/${id}`)
        product.value = response.data.data
    }
 
    const storeProduct = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/products', data)
            await router.push({ name: 'products.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
 
    }
 
    const updateProduct = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/api/products/` + id, product.value)
            await router.push({ name: 'products.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    const destroyProduct = async (id) => {
        await axios.delete('/api/products/' + id)
    }
 
    return {
        errors,
        product,
        products,
        getProduct,
        getProducts,
        storeProduct,
        updateProduct,
        destroyProduct
    }
}