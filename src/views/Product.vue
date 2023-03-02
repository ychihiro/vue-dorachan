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
        <select v-model="quantity[index]" @change="count(item, this.quantity[index])">
          <template v-for="number in 11" :key="number">
          <option :value="number - 1">{{ number - 1 }}</option>
          </template>
        </select>
      </div>
    </div>
    <p>{{ quantity }}</p>
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
  },
  data() {
    return {
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      items: [],
      quantity: [],
    }
  },
  methods: {
    count(item, number) {
      item.count = number
    },
    carts() {
      let carts = [];
      this.items.forEach(element => {
        if (element.count > 0) {
          carts.push(element);
        }
      })
      this.$store.commit('diagnoses/setCarts', carts)
      this.$router.push('/purchase')
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