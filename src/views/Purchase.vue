<template>
  <!-- <my-address></my-address> -->
  <StripeCheckout></StripeCheckout>
  <my-cart></my-cart>

</template>

<script>
// import Address from '@/components/Address.vue';
import Cart from '@/components/Cart.vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    // 'my-address': Address,
    'my-cart': Cart,
    StripeCheckout,
  },
  data() {
    return {
      
    }
  },
}
</script>