import find, { remove } from 'lodash'
import Dinero from 'dinero.js'


Dinero.defaultCurrency = 'BRL';
Dinero.defaultPrecision = 2;


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
      const amount = Dinero({ amount: item.quantity * item.product.price })
      let discount = Dinero({ amount: 0 })


      if (item.condition && item.condition.percentage && item.quantity > 2) {
        discount = amount.percentage(item.condition.percentage
        )
      }

      return acc.add(amount).subtract(discount)
    }, Dinero({ amount: 0 }))
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.cart;

    return {
      total,
      items
    }
  }

  checkout() {
    const total = this.getTotal()
    const items = this.cart;

    this.cart = []

    return {
      total,
      items
    }
  }

}