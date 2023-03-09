<template>
  <div class="wrapper">
    <item-component></item-component>
    <div>
      <table>
        <tr>
          <th>商品名</th>
          <th>値段</th>
          <th>個数</th>
          <th>小計</th>
          <th>削除</th>
        </tr>
        <template v-for="item in products" :key="item">
        <tr v-if="item.count">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
          <p>{{ item.count }}</p>
          <button @click="plus(item)">＋</button>
          <button @click="minus(item)">ー</button>
          </td>
          <td>{{ item.price * item.count }}</td>
          <td>
          <button @click="remove(item)">×</button>
          </td>
        </tr>
        </template>
      </table>
    </div>
    <div class="btn-wrapper">
      <router-link to="/product">買い物を続ける</router-link>
      <router-link to="/customer">次へ</router-link>
      <!-- <button>次へ</button> -->
    </div>
  </div>
</template>

<script>
import StepItem from '@/components/StepItem.vue';
import axios from 'axios';

export default {
  components: {
    'item-component': StepItem
  },
  async mounted() {
    const cartBox = await axios
      .get("http://localhost:8000/api/v1/cart");
    const productItem = await axios
      .get("http://localhost:8000/api/v1/purchase");
      productItem.data.filter(element => {
        if (element.diagnosis_id === this.diagnosisId) {
        this.products.push(element);
      }
      })
    this.products.forEach(element => {
      element.count = 0;
      cartBox.data.forEach(value => {
        
        if (element.id === value.product_id) {
          element.count++;
          element.cartId = value.id
        }
      })
    })
    console.log(this.products);
  },
  data() {
    return {
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      // items: [],
      products: [],
      // userUid: ''
    }
  },
  methods: {
    async plus(item) {
      console.log(this.userUid)
      await axios.post("http://localhost:8000/api/v1/cart", {
        product_id: item.id
      });
      item.count++;
    },
    async minus(item) {
      await axios.delete("http://localhost:8000/api/v1/cart/" + item.id);
      item.count--;
    },
    async remove(item) {
      await axios.delete("http://localhost:8000/api/v1/purchase/" + item.id);
      item.count = 0;      
    }
  },
}
</script>



<style scoped>
.wrapper {
  background-color: #fff;
  padding: 40px;
}

.image,
.price,
.count,
.total {
  border-bottom: 1px solid #999;
}

.image,
.count,
.total {
  border-left: 1px solid #999;
}

.total {
  border-right: 1px solid #999;
}

.cart-table {
  border-collapse: separate;
  width: 70%;
  margin: 0 auto;
}

.sub-table {
  width: 100%;
  height: 200px;
}

.item-img {
  vertical-align: top;
  display: inline-block;
  vertical-align: middle;
}

.header-row {
  height: 50px;
  line-height: 50px;
  color: #fff;
  background-color: #3F89CD;
}

.count,
.total {
  vertical-align: middle;
}

.name {
  vertical-align: bottom;
  text-align: left;
}

.price {
  vertical-align: top;
  text-align: left;
}

.btn-wrapper {
  display: flex;
  justify-content: left;
  /* margin: 10px 0px; */
}

.plus,
.minus {
  display: block;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #999;
  background-color: #fff;
}

.plus:hover,
.minus:hover {
  border: 2px solid #999;
}

.minus {
  margin-left: 10px;
}

.next-btn-wrap {
  width: 90%;
  margin: 80px auto;
  text-align: right;
  /* background-color: pink; */
}

.cart-btn {
  padding: 12px 40px;
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}</style>