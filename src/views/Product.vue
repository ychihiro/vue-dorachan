<template>
  <div class="wrapper">
    <div class="head-wrapper">
      <router-link to="/detail" class="link">
      戻る
      </router-link>
      <h1 class="ttl">商品一覧</h1>
      <router-link to="/cart" class="cart-btn">
      カートを見る
      </router-link>
    </div>
    <div class="grid-wrap">
      <div v-for="item in items" :key="item" @click="cart(item)">
        <div class="img-wrapper">
          <img :src="'http://localhost:8000/storage/' + item.path" alt="ステッカー画像" class="image">
        </div>
        <p class="item-name">{{ item.name }}</p>
        <p>¥{{ item.price }}(税込)</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async mounted() {
    const response = await axios.get("http://localhost:8000/api/v1/purchase");
    response.data.filter(element => {
      if (element.diagnosis_id === this.diagnosisId) {
        this.items.push(element);
      }
    });
  },
  data() {
    return {
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      items: [],
    }
  },
  methods: {
    cart(item) {
      this.$store.commit('purchase/setCarts', item)
      this.$router.push('/detail');
    }
  },
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  padding: 30px 70px 50px;
}
.head-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.ttl {
  font-size: 40px;
  margin-left: 100px;
}
.cart-btn {
  font-size: 18px;
  width: 130px;
}
.grid-wrap {
  display: grid;
  gap: 60px;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: repeat(3, 1fr);
}
.img-wrapper {
  width: 100%;
  height: 180px;
}
.image {
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
}
.item-name {
  margin-top: 20px;
  font-size: 20px;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 10% 40px 25%;
  }
  .head-wrapper {
    margin-bottom: 136px;
  }
  .grid-wrap {
    display: grid;
    gap: 60px;
    width: 90%;
    margin: 0 auto;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>