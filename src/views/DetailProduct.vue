<template>
  <Header></Header>
  <div class="wrapper">
  <h1 class="ttl">商品情報</h1>
  <h2>{{ carts.name }}</h2>
  <div>
  <img :src="'http://localhost:8000/storage/' + carts.path" alt="ステッカー">
  </div>
  <p class="price">価格：{{ carts.price }}</p>
  <button class="cart-btn" @click="cart">カートに入れる</button>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
// import firebase from '../main';
  
export default {
  components: {
    Header
  },
  data() {
    return {
      carts: this.$store.state.purchase.carts,
      presentItem: this.$store.state.purchase.presentItem,
    }
  },
  methods: {
    async cart() {
      console.log(this.carts.id)
        await axios.post("http://localhost:8000/api/v1/cart/", {
            product_id: this.carts.id,
          }).then(res => {
            console.log(res.data);
            this.$router.push('/cart');
          });
        },
      
    }
  }

</script>

<style scoped>
.wrapper {
  padding: 70px 40px;
  background-color: #fff;
}
.ttl {
  margin-bottom: 40px;
  font-size: 45px;
}
.price {
  margin-bottom: 30px;
  font-size: 30px;
}
.cart-btn {
  width: 160px
}
</style>