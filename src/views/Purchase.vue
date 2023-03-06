<template>
  <!-- <my-address></my-address> -->
<h1></h1>
</template>

<script>
// import Address from '@/components/Address.vue';
// import Cart from '@/components/Cart.vue';
export default {
  components: {
    // 'my-address': Address,
    // 'my-stripe': StripeElementPayment
    // StripeElementCard
  },
  // props: [stripeKey],
  data() {
    return {
      cartItem: this.$store.state.diagnoses.carts,
      // stripe: 'pk_test_51MhDWaIyOIzAJ2a5mH4EtBdCebBr8GDdnnN51dg7XZiLi32UDcJ517Wf5n5XiIYDxqyhSXZ0UFnHUd0Hx5GYlyst00FraPX1Qt',
      // cardForm: null,
      // result: null,
      // stripe: 'pk_test_51MhDWaIyOIzAJ2a5mH4EtBdCebBr8GDdnnN51dg7XZiLi32UDcJ517Wf5n5XiIYDxqyhSXZ0UFnHUd0Hx5GYlyst00FraPX1Qt',
      // card: null,
      // token: '',
    }
  },
  mounted() {
    // let elements = stripe.elements();
    // let card = elements.create('card');
    // card.mount('#card-element');
    // this.stripe = 
  },
  methods: {
    // payment(event) {
    //   event.target.disabled = true;
    //   event.target.innerText = '決済処理中';
    //   this.stripe.createToken(this.cardForm).then((result) => {
    //     console.log(result)
    //     if (result.error) {
    //       this.result = result.error.message;
    //       event.target.disabled = false;
    //       event.target.innerText = '購入する';
    //     }
    //   });
    // }
    // generatePaymentIntent() {

    // }
  },
}
</script>