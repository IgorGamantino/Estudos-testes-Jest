import { Cart } from './Cart'

describe('Cart', () => {
  let cart;
  let product = {
    title: 'tenis adidas',
    price: 35

  }
  let productTwo = {
    title: 'tenis nike',
    price: 80

  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {

    it('shoud be return 0 when getTotal() is executed in a newly created instance', () => {

      expect(cart.getTotal()).toEqual(0)
    })

    it('shoud be multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2
      }
      cart.add(item)

      expect(cart.getTotal()).toEqual(70)

    })

    it('shoud be ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal()).toEqual(35)
    })

    it('shoud be update total when a product gets included and then remove', () => {
      cart.add({
        product,
        quantity: 2
      })

      cart.add({
        product: productTwo,
        quantity: 1
      })

      cart.remove(
        product,

      )

      expect(cart.getTotal()).toEqual(150)

    })
  })

  describe('checkout', () => {
    it('should be return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2
      })

      cart.add({
        product: productTwo,
        quantity: 6
      })

      expect(cart.checkout()).toMatchSnapshot()

    })

    it('should be reset the cart when checkout() is called', () => {
      cart.add({
        product,
        quantity: 3
      })

      cart.checkout()


      expect(cart.getTotal()).toEqual(0)

    })
  })

})

