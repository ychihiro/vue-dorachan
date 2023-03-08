<template>
  <div class="wrapper">
  <div class="head-wrapper">
  <router-link to="/result" class="tag">戻る</router-link>
  <h1 class="ttl">商品一覧</h1>
  <button @click="carts" class="cart-btn">カートを見る</button>
  <!-- <router-link to="/purchase" class="cart-btn"></router-link> -->
  </div>
  <div class="grid-wrap">
  <div v-for="(item, index) in items" :key="item">
  <div class="grid-box">
  <div class="img-wrapper">
  <img :src="'http://localhost:8000/storage/' + item.path" alt="">
  </div>
    <div class="inner-box">
      <p>{{ item.name }}</p>
      <div class="inner-detail">
        <p class="price">¥{{ item.price }}(税込)</p>
        <select v-model="quantity[index]" @change="count(item, index, this.quantity[index])">
          <template v-for="number in 11" :key="number">
          <option :value="number - 1">{{ number - 1 }}</option>
          </template>
        </select>
      </div>
    </div>
    <p>{{ quantity }}</p>
    <p>{{ this.cartItem }}</p>
    <button @click="hint">リセット</button>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  async mounted() {
    const response = await axios
      .get("http://localhost:8000/api/v1/purchase");
    response.data.filter(element => {
      if (element.diagnosis_id === this.diagnosisId) {
        this.items.push(element);
      }
    })
    // console.log(this.items)
    console.log('カート')
    console.log(this.$store.state.purchase.carts)
    console.log('数')
    console.log(this.$store.state.purchase.quantity)
    // let test = this.$store.state.purchase.quantity
    // for (let i = 0; i < test.length; i++) {
    //   if (test[i] !== '') {
    //     console.log(test[i])
    //   }
    // }
    // console.log('チャレンジ')
    // console.log(this.cartItem)
  },
  data() {
    return {
      
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      items: [],
      cartItem: [],
      test:[],
      // quantity: [],
    }
  },
  computed: {
    quantity: {
      get() {
        return this.$store.state.purchase.quantity;
      },
      set(value) {
        this.$store.commit('purchase/setQuantity', value)
      }
    },
  },
  methods: {
    count(item, index, number) {
      item.count = number
      console.log(item)
      console.log(index)
      this.cartItem[index] = item;
      // this.$store.commit('purchase/setCarts', item)
      console.log('test')
      console.log(this.cartItem)
      console.log(this.$store.state.purchase.carts)
    },
    carts() {
      // this.items.forEach(element => {
      //   if (element.count > 0) {
      //     this.cartItem.push(element);
      //   }
      // })
      // this.$store.commit('purchase/setCarts', this.cartItem)
      this.$store.commit('purchase/setCarts', this.cartItem)
      // this.$store.commit('purchase/setQuantity', this.quantity)
      this.$router.push('/cart')
      console.log(this.$store.state.purchase.carts)
      // this.$store.commit('diagnoses/setId', item[i].id,)
    },
    hint() {
      this.$store.commit('purchase/reset');
    }

  },
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  height: 200vh;
  padding: 30px 70px;
}

.head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid #000; */
  margin-bottom: 40px;
}

.ttl {
  margin-left: 80px;
}

.cart-btn {
  width: 130px;
}

.tag {
  color: #3F89CD
}

.grid-wrap {
  display: grid;
  gap: 60px;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
}

.grid-box {
  /* border: solid 1px #692927; */
}

.img-wrapper {
  width: 100%;
  height: 250px;
}
.inner-box {
  background-color: pink;
  /* padding: 20px; */
}

.inner-detail {
  display: flex;
}

</style>