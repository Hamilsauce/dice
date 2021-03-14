import Vue from './vue.js'



// export default Vue.component('AddProduct', {
export default Vue.component('Die', {
  template: '#die-temp',
  components: {},
  props: [],

  data() {
    return {
      nums: [1, 1, 3],
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
    createProduct() {}
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