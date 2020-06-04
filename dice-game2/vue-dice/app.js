import Vue from './vue.js'

import Die from './dice.js'


console.log('logging');
console.log(vue);
const products = [
  { id: 1, name: 'Angular', description: 'Superheroic JavaScript MVW Framework.', price: 100 },
  { id: 2, name: 'Ember', description: 'A framework for creating ambitious web applications.', price: 100 },
  { id: 3, name: 'React', description: 'A JavaScript Library for building user interfaces.', price: 100 }
];

function findProduct(productId) {
  return products[findProductKey(productId)];
};

function findProductKey(productId) {
  for (let key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

const List = Vue.extend({
  template: '#product-list',
  data() {
    return { products: products, searchKey: '' };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(function(product) {
        return this.searchKey == '' || product.name.indexOf(this.searchKey) !== -1;
      }, this);
    }
  }
});

const Product = Vue.extend({
  template: '#product',
  data() {
    return { product: findProduct(this.$route.params.product_id) };
  }
});

const ProductEdit = Vue.extend({
  template: '#product-edit',
  data() {
    return { product: findProduct(this.$route.params.product_id) };
  },
  methods: {
    updateProduct() {
      let product = this.product;
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      };
      router.push('/');
    }
  }
});

const ProductDelete = Vue.extend({
  template: '#product-delete',
  data() {
    return { product: findProduct(this.$route.params.product_id) };
  },
  methods: {
    deleteProduct() {
      products.splice(findProductKey(this.$route.params.product_id), 1);
      router.push('/');
    }
  }
});


// const AddProduct = Vue.extend({
//   template: '#add-product',
//   data() {
//     return {
//       product: {
//         name: '',
//         description: '',
//         price: ''
//       }
//     }
//   },
//   methods: {
//     createProduct() {
//       let product = this.product;
//       products.push({
//         id: Math.random().toString().split('.')[1],
//         name: product.name,
//         description: product.description,
//         price: product.price
//       });
//       router.push('/');
//     }
//   }
// });
 Vue.component('Die', {
   name: 'v-die',
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

//* ROUTER
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/product/:product_id',
      component: Product,
      name: 'product'
    },
    {
      path: '/die',
      component: AddProduct
    },
    {
      path: '/product/:product_id/edit',
      component: ProductEdit,
      name: 'product-edit'
    },
    {
      path: '/product/:product_id/delete',
      component: ProductDelete,
      name: 'product-delete'
    }
]
});

let vueApp = new Vue({
  el: '#app',
  components: {
    Die
  }
});

// RENDER FUNCTION
// new Vue({
//   router: router
// }).$mount('#app')