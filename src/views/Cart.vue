<template>
  <div class="wrapper">
    <item-component></item-component>
    <table class="cart-table">
      <tr class="header-row">
        <th colspan="2">商品内容</th>
        <th>数量</th>
        <th>小計</th>
      </tr>
      <template v-for="item in newItem" :key="item">
        <tr>
          <td class="image">
            <img :src="'http://localhost:8000/storage/' + item.path" :alt="item.name" class="item-img">
          </td>
          <table class="sub-table">
            <tr>
              <td class="name">{{ item.name }}</td>
            </tr>
            <td class="price">
              ￥{{ item.price }}(税込)
              <div class="btn-wrapper">
                <button class="plus" @click="plus(item.id)">＋</button>
                <button class="minus" @click="minus(item.id)">ー</button>
              </div>
            </td>
          </table>
          <td class="count">{{ item.count }}</td>
          <td class="total">￥{{ item.price * item.count }}(税込)</td>
        </tr>
      </template>
    </table>
    <div class="next-btn-wrap">
      <router-link to="/customer" class="cart-btn">次へ</router-link>
    </div>
  </div>
</template>

<script>
import StepItem from '@/components/StepItem.vue';
export default {
  components: {
    'item-component': StepItem
  },
  mounted() {
    console.log('カートページ')
    console.log(this.$store.state.purchase.carts)
    let a = this.$store.state.purchase.carts.filter(Boolean)
    console.log(this.newItem)
    this.newItem = a.filter(element => {
        return element.count !== 0
      })
    this.$store.commit('purchase/setCarts', this.newItem);
  },
  data() {
    return {
      cartItem: this.$store.state.purchase.carts,
      newItem: []
    }
  },
  methods: {
    plus(id) {
      this.newItem.forEach(element => {
        if (id === element.id && element.count < 10) {
          element.count += 1;
          this.$store.commit('purchase/setCarts', this.newItem);
        }
      });
    },
    minus(id) {
      console.log(id)
      this.newItem.forEach( element => {
        if (id === element.id && element.count > 0) {
          element.count -= 1;
          this.$store.commit('purchase/setCarts', this.newItem);
          // if (element.count === 0) {
          //   console.log(element)
          //   const a = this.newItem.indexOf(element)
          //   console.log(a)
          //   delete this.newItem[a]
          //   this.$store.commit('purchase/setCarts', this.newItem);
          //   console.log(this.newItem)
          // }
        } 
      });
    },
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
}
</style>