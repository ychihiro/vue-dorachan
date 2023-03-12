<template>
  <Header></Header>
  <div class="wrapper">
    <item-component :number="number"></item-component>
      <table class="cart-table">
        <tr class="row">
          <th class="label">商品名</th>
          <th class="label">値段</th>
          <th class="label">個数</th>
          <th class="label">小計</th>
          <th class="label">削除</th>
        </tr>
        <template v-for="item in products" :key="item">
        <tr v-if="item.count" class="row">
          <td class="product" >{{ item.name }}</td>
          <td class="product">{{ item.price }}</td>
          <td class="product">
          <div class="item-wrapper">
            <p>{{ item.count }}</p>
              <div class="plus-minus">
                <button @click="plus(item)" class="plus">＋
                </button>
                <button @click="minus(item)" class="minus">ー
                </button>
              </div>
          </div>
          </td>
          <td class="product">{{ item.price * item.count }}</td>
          <td class="product">
            <button @click="remove(item)" class="delete">×
            </button>
          </td>
        </tr>
        </template>
      </table>
      <p v-if="showError" class="error">
      カートに商品はありません
      </p>
      <div class="btn-wrapper">
        <router-link to="/product" class="product-page">
        買い物を続ける
        </router-link>
        <a class="link" @click="check">次へ</a>
      </div>
  </div>
</template>

<script>
import StepItem from '@/components/StepItem.vue';
import axios from 'axios';
import Header from '@/components/SubHeader.vue';

export default {
  components: {
    'item-component': StepItem,
    Header
  },
  async mounted() {
    const cartBox = await axios.get("http://localhost:8000/api/v1/cart");
    const productItem = await axios.get("http://localhost:8000/api/v1/purchase");
    productItem.data.filter(element => {
      if (element.diagnosis_id === this.diagnosisId) {
        this.products.push(element);
      }
    });
    this.products.forEach(element => {
      element.count = 0;
      cartBox.data.forEach(value => {
        if (element.id === value.product_id) {
          element.count++;
          element.cartId = value.id
        }
      });
    });
  },
  data() {
    return {
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      products: [],
      showError: false,
      number: 1
    }
  },
  methods: {
    async plus(item) {
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
      await axios.delete("http://localhost:8000/api/v1/cart/all-delete/" + item.id);
      item.count = 0;      
    },
    check() {
      let checkItem = [];
      this.products.forEach(element => {
        if (element.count > 0) {
          checkItem.push(element);
        }
      });
      if (checkItem.length) {
        this.$router.push('/customer');
      } else {
        this.showError = true;
      }
    }
  },
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  padding: 40px 40px 60px;
}
.cart-table {
  width: 70%;
  margin: 0 auto;
}
.label {
  padding: 20px;
  color: #fff;
  background-color: #3F89CD;
}
.product {
  padding: 40px 10px;
  vertical-align: middle;
}
.item-wrapper {
  display: flex;
  justify-content: center;
}
.plus-minus {
  margin-left: 20px;
}
.plus,
.minus,
.delete {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #999;
  background-color: #fff;
}
.plus:hover,
.minus:hover {
  color: #CA8A8A;
  border: 1px solid #CA8A8A;
}
.minus {
  margin-left: 5px;
}
.delete {
  color: #fff;
  border: 1px solid rgb(211, 84, 84);
  background-color: rgb(211, 84, 84);
}
.row {
  border: 1px solid #999;
}
.btn-wrapper {
  display: flex;
  justify-content: right;
  margin: 50px 80px 40px;
  align-items: center;
}
.product-page {
  width: 150px;
  font-size: 18px;
  margin-top: 20px;
  margin-right: 410px;
  border-radius: 5px;
}
.error {
  margin-top: 40px;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 130px 0px 600px;
  }
  .cart-table {
    width: 80%;
    margin-top: 150px;
  }
  .product {
    padding: 50px 10px;
  }
  .product-page {
    margin-right: 180px;
  }
  .btn-wrapper {
    margin-top: 70px;
  }
}
</style>