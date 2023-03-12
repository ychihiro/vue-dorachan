<template>
  <div class="wrapper">
    <div class="head-wrapper">
      <router-link to="/result" class="link">
      戻る
      </router-link>
      <h1 class="ttl">商品情報</h1>
      <router-link to="/product" class="link">
      商品一覧
      </router-link>
    </div>
    <div class="sub-wrapper">
      <h2 class="name">{{ carts.name }}</h2>
      <img :src="'http://localhost:8000/storage/' + carts.path" alt="ステッカー">
      <p class="price">
      ￥{{ carts.price }}(税込)
      </p>
      <p class="msg">
      ※抽選で当たった方にはステッカー1枚を無料でプレゼントします
      </p>
      <button class="cart-btn" @click="cart">
      カートに入れる
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  
export default {
  data() {
    return {
      carts: this.$store.state.purchase.carts,
      presentItem: this.$store.state.purchase.presentItem,
    }
  },
  methods: {
    async cart() {
      await axios.post("http://localhost:8000/api/v1/cart/", {
        product_id: this.carts.id,
      }).then(() => {
        this.$router.push('/cart');
      });
    },
  }
}
</script>

<style scoped>
.wrapper {
  padding: 30px 80px 100px;
  background-color: #fff;
}
.sub-wrapper {
  padding: 75px 15px 30px;
  background-color: #fff;
}
.head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link {
  color: #3F89CD
}
.ttl {
  font-size: 40px;
  margin-left: 30px;
}
.price {
  font-size: 30px;
}
.msg {
  margin-bottom: 40px;
  color: #dd6868;
}
.cart-btn {
  width: 200px
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 10% 10% 43%;
  }
  .sub-wrapper {
    padding: 100px ;
  }
  .head-wrapper {
    margin-bottom: 180px;
  }
  .name {
    margin-bottom: 20px;
  }
  .price {
    margin: 10px 0px;
  }
  .msg {
    width: 340px;
    margin-left: 40px;
  }
}
</style>