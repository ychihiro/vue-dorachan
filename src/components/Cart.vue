<template>
  <div class="wrapper">
    <div class="step-wrapper">
      <button class="step1">1</button>
      <div class="line"></div>
      <button class="step2">2</button>
      <div class="line"></div>
      <button class="step3">3</button>
    </div>
    <div class="guide-wrapper">
    <p class="guide1">カートの商品</p>
    <p class="guide2">お客様情報登録</p>
    <p class="guide3">ご注文内容確認</p>
    </div>
    <div>
      <table>
        <!-- <template v-for="item in cartItem" :key="item"> -->
          <tr class="header-row">
            <th colspan="2">商品内容</th> 
            <th>数量</th>
            <th>小計</th>
          </tr>
          <template v-for="item in cartItem" :key="item">
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
                    <button>＋</button>
                    <button>ー</button>
                  </td>
                </table>
                <td class="count">{{ item.count }}</td>
                <td class="total">￥{{ item.price * item.count }}(税込)</td>
            </tr>
          </template>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  // props: ['name', 'path', 'description'],
  data() {
    return {
      cartItem: this.$store.state.diagnoses.carts,
      price:[]
    }
  },
  mounted() {
    // console.log(this.cartItem)
    // this.cartItem.forEach(element => {
    //   console.log(element)
    //   this.price.push(element.price)
    // });
    // console.log(this.price)
  }
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

.total { border-right: 1px solid #999; }

table {
  border-collapse: separate;
  width: 70%;
  margin: 0 auto;
}
.sub-table {
  width: 100%;
  height: 240px;
}
.item-img {
  vertical-align:top;
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

/* ボタン */
.step-wrapper,
.guide-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.step1,
.step2,
.step3 {
  width: 70px;
  height: 70px;
  font-size: 22px;
  border-radius: 50%;
  border: none;
}
.step1 {
  color: #fff;
  font-weight: bold;
  background-color: #D1DA6D;
}
.line {
  width: 120px;
  height: 3px;
  background-color: #777;
}
.guide1 { margin-right: 0px; }
.guide2 { 
  margin-left: 75px;
  /* margin-right: 10px; */
}
.guide3 { margin-left: 70px; }
</style>