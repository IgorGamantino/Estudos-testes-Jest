import find, { remove } from 'lodash'

export class Cart {
  cart = []

  add(products) {
    if (find(this.cart, { product: products.product })) {
      remove(this.cart, { product: products.product })
    }
    this.cart.push(products)
  }

  remove(products) {
    remove(this.cart, { products })
  }

  getTotal() {
    return this.cart.reduce((acc, item) => {
      return acc + item.quantity * item.product.price
    }, 0)
  }

  summary() {
    const total = this.getTotal();
    const items = this.cart;

    return {
      total,
      items
    }
  }

  checkout() {
    const total = this.getTotal();
    const items = this.cart;

    this.cart = []

    return {
      total,
      items
    }
  }

}