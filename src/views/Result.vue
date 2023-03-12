<template>
  <div class="header">
    <router-link to="/product" class="head-btn" v-if="this.$store.state.isLogin">
    商品を見る
    </router-link>
    <router-link to="/" class="head-btn">
    ホーム
    </router-link>
  </div>
  <div class="wrapper">
    <my-result :character="characters[0]"></my-result>
    <router-link to="/share" class="share-btn">結果をシェア</router-link>
    <div v-if="characters[0].result" class="sticker-wrapper">
      <p>おめでとうございます！</p>
      <p>{{ characters[0].name }}ステッカーを無料でプレゼント！！！</p>
      <button @click="present" class="cart-btn">
      ステッカーを受け取る
      </button>
    </div>
    <div class="evalueation-wrapper" v-if="show">
      <h2>評価</h2>
      <div class="star-wrapper">
        <span @click="starBtn(1)" class="star" :class="{color: this.count > 0}">
        <i class="fa-solid fa-star"></i>
        </span>
        <span @click="starBtn(2)" class="star" :class="{ color: this.count > 1 }">
        <i class="fa-solid fa-star"></i>
        </span>
        <span @click="starBtn(3)" class="star" :class="{ color: this.count > 2 }">
        <i class="fa-solid fa-star"></i>
        </span>
        <span @click="starBtn(4)" class="star" :class="{ color: this.count > 3 }">
        <i class="fa-solid fa-star"></i>
        </span>
        <span @click="starBtn(5)" class="star" :class="{ color: this.count > 4 }">
        <i class="fa-solid fa-star"></i>
        </span>
      </div>
      <p>コメント</p>
      <textarea v-model="comment" class="comment"></textarea>
      <p v-if="requireError" class="error">
      ※入力必須項目です
      </p>
      <p v-if="numberError" class="error">
      ※最大255文字で入力してください
      </p>
      <button @click="submit" class="send-btn">
      送信
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '../main';
import Result from '@/components/Result.vue';

export default {
  components: {
    'my-result': Result,
  },
  created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userUid = this.$store.getters.user.uid;
      })
  },
  mounted() {
    if (!this.$store.state.isLogin || this.$store.state.diagnoses.evalueation) {
      this.show = false;
    } 
  },
  data() {
    return {
      userUid: '',
      characters: this.$store.state.diagnoses.results,
      count: 0,
      comment: '',
      show: true,
      requireError: false,
      numberError: false,
    }
  },
  methods: {
    async present() {
      const stickerName = this.characters[0].name + 'ステッカー';
      const response = await axios.get("http://localhost:8000/api/v1/purchase");
      response.data.filter(element => {
        if (element.diagnosis_id === this.characters[0].diagnosis_id && element.name == stickerName) {
          this.$store.commit('purchase/setCarts', element);
          this.$store.commit('purchase/setPresentItem', 1);
        }
      });
      this.$router.push('/detail');
    },
    async submit() {
      if (this.comment === '') {
        this.requireError = true;
      } else if (this.comment.length > 255) {
        this.numberError = true;
      } else {
        await axios.post("http://localhost:8000/api/v1/evalueation", {
          user_id: this.userUid,
          diagnosis_id: this.characters[0].diagnosis_id,
          score: this.count,
          comment: this.comment
        }).then(() => {
          this.$store.commit('diagnoses/setEvalueation', true);
        }
        );
        this.show = null;
      }
    },
    starBtn(id) {
      this.count = 0;
      this.count += id;
    },
    async move() {
      this.$store.commit('purchase/reset');
      this.$store.commit('diagnoses/reset');
      const cartBox = await axios.get("http://localhost:8000/api/v1/cart");
      cartBox.data.forEach(element => {
        axios.delete("http://localhost:8000/api/v1/cart/all-delete/" + element.product_id);
      });
    }
  },
}
</script>

<style scoped>
.wrapper {
  padding: 40px ;
}
.header {
  padding: 15px;
}
.sticker-wrapper {
  width: 500px;
  margin: 40px auto;
  padding: 20px;
  font-weight: bold;
  border-radius: 10px;
  background-color: #f0e9e9;
}
.share-btn {
  display: block;
  width: 160px;
  margin: 15px auto 20px;
  align-items: center;
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}
.cart-btn {
  width: 230px;
  margin-top: 10px;
  border-radius: 5px;
}
.evalueation-wrapper {
  background-color: #fff;
  margin: 0px auto;
  padding: 40px 10px;
  width: 60%;
  border-radius: 10px 10px 130px 130px;
}
.star-wrapper {
  margin: 20px 20px;
  font-size: 70px;
  color: #999;
}
.star{
  margin: 0px 10px;
}
.comment {
  width: 70%;
  height: 60px;
  padding: 10px;
  margin-top: 15px;
  font-size: 18px;
  border-radius: 10px;
}
.send-btn {
  display: block;
  cursor: pointer;
  margin: 20px auto 0px; 
  color: #fff;
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}
.color {
  color: #D1DA6D;
}
.head-btn {
  margin-left: 10px;
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 20% 0px;
  }
  .cart-btn {
    width: 300px;
  }
  .star-wrapper {
    font-size: 50px;
  }
}
</style>