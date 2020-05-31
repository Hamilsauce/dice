import Vue from './vue.js'



// export default Vue.component('AddProduct', {
export default Vue.component('AddProduct',{
// export default Vue.extend({
  // const AddProduct = vue.component( {
  // name: 'AddProduct',
  template: '#add-product',
  components: {},
  props: [],

  data() {
    return {
      product: {
        name: '',
        description: '',
        price: ''
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    createProduct() {
      let product = this.product;
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
        price: product.price
      });
      router.push('/');
    }
  },

  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
})
// {AddProduct}
// const AddProduct = Vue.extend({
// data() {
//   return {
//     product: {
//       name: '',
//       description: '',
//       price: ''
//     }
//   }
// },
// });