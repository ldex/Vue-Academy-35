import { defineStore } from "pinia";
import ProductService from "@/services/ProductService.js";

export const useProductStore = defineStore("product", {
  state: () => ({
    errorMessage: null,
    isLoading: false,
    products: [],
    product: {}
  }),
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  },
  actions: {
    fetchProduct(id) {
      let p = this.getProductById(id);
      if (p == null) {
        this.isLoading = true;
        ProductService.getProduct(id).then((data) => {
          this.product = data;
        })
        .catch(error => {
            this.errorMessage = 'There was an error getting the product from server, ' + error;
        })
        .finally(() => (this.isLoading = false))
      } else {
        this.product = p;
      }
    },
    fetchProducts() {
        this.isLoading = true;
        ProductService.getProducts()
          .then((data) => {
            this.products = data;
          })
          .catch(error => {
              this.errorMessage = 'There was an error getting products from server, ' + error;
          })
          .finally(() => (this.isLoading = false));
      },
      addProduct(newProduct) {
        return ProductService.insertProduct(newProduct).then(() => {
          this.products.push(newProduct);
        });
      },
 },
});
