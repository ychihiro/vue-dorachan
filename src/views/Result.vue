<template>
  <div class="wrapper">
  <hamburger-menu></hamburger-menu>
  <my-result :character="characters[0]"></my-result>
  <div v-if="!characters[0].results" class="sticker-wrapper">
  <p>おめでとうございます！</p>
  <p>{{ characters[0].name }}ステッカーを無料でプレゼント！！！</p>
  <!-- <div class="flex-wrapper"> -->
  <button @click="present" class="cart-btn">ステッカーを受け取る</button>
  <!-- <router-link to="/detail">ステッカーを受け取る</router-link> -->
  <router-link to="/product" class="tag">他の商品を見る</router-link>
  <!-- </div> -->
  </div>
  <div class="evalueation-wrapper" v-if="show">
    <h2>評価</h2>
    <div class="star-wrapper">
    <span @click="starBtn(1)" class="star" :class="{color: this.count > 0}">
    <i class="fa-solid fa-star a"></i>
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
    <button @click="submit" class="submit">送信</button>
  </div>
  <vue-qrcode :value="url"></vue-qrcode>
  </div>
  <!-- <my-menu></my-menu> -->
</template>

<script>
import axios from 'axios';
import firebase from '../main';
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Result from '@/components/Result.vue';
// import Menu from '@/components/Menu.vue';
import Hamburger from '@/components/HamburgerMenu.vue';
export default {
  components: {
    'my-result': Result,
    // 'my-menu': Menu,
    'hamburger-menu': Hamburger,
    VueQrcode
  },
  created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userUid = this.$store.getters.user.uid
      })
  },
  data() {
    return {
      userUid: '',
      characters: this.$store.state.diagnoses.results,
      count: 0,
      comment: '',
      show: true,
      url: 'https://drive.google.com/file/d/1uD3hjYvlcieKsxbB72EZVqaIZOmhOKtE/view'
    }
  },
  methods: {
    async present() {
      const stickerName = this.characters[0].name + 'ステッカー'
      const response = await axios
        .get("http://localhost:8000/api/v1/purchase");
      response.data.filter(element => {
        if (element.diagnosis_id === this.characters[0].diagnosis_id && element.name == stickerName) {
          this.$store.commit('purchase/setCarts', element)
          this.$store.commit('purchase/setPresentItem', 1)
        }
      });
      this.$router.push('/detail');
    },
    async submit() {
      await axios .post("http://localhost:8000/api/v1/evalueation", {
        user_id: this.userUid,
        diagnosis_id: this.characters[0].diagnosis_id,
        score: this.count,
        comment: this.comment
      }).then(res => {
        console.log(res.data)
      }
      );
      console.log(this.userUid)
      console.log(this.characters[0].diagnosis_id)
      console.log(this.count)
      console.log(this.comment)
      this.show = null;
    },
    starBtn(id) {
      this.count = 0;
      this.count += id;
    }
  },
  
}
</script>

<style scoped>
.wrappper {
  
}
.sticker-wrapper {
  width: 500px;
  margin: 30px auto;
  padding: 20px;
  font-weight: bold;
  border-radius: 10px;
  background-color: #D1DA6D;
  /* background-color: #D1D889; */
}
.flex-wrapper {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 20px;
}
.cart-btn {
  width: 210px;
  margin-right: 20px;
}
.tag {
  margin-right: 70px;
  color: #CA8A8A;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
}
.tag:hover {
  color: #CA8A8A;
  border-bottom: 2px solid #CA8A8A;
}
.evalueation-wrapper {
  background-color: #fff;
  margin: 60px auto 60px;
  padding: 5px 10px;
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
.submit {
  display: block;
  margin: 20px auto;
  width: 100px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  background-color: #D1DA6D;
}
.submit:hover {
  background-color: #e0eb6f;
}
.color {
  color: #D1DA6D;
}
</style>