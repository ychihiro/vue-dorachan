<template>
  <h2>あなたにそっくりなキャラクターは・・・</h2>
  <h3>{{ characters[0].name }}</h3>
  <p>{{ characters[0].path }}</p>
  <p>{{ characters[0].description }}</p>
  <p>マッチ度{{ characters[0].average }}％</p>
  <div v-if="!characters[0].results">
  おめでとうございます！<br>抽選が当たりました！ステッカーをプレゼントします！<br>
  <button>住所を入力する</button>
  </div>
  <div class="result-wrapper" v-if="show">
    <h2>評価</h2>
    <div class="star">
    <span @click="test(1)" :class="{color: this.star[1]}">
    <i class="fa-solid fa-star a"></i>
    </span>
    <span @click="test(2)" :class="{ color: this.star[2]}">
    <i class="fa-solid fa-star"></i>
    </span>
    <span @click="test(3)" :class="{ color: this.star[3] }">
    <i class="fa-solid fa-star"></i>
    </span>
    <span @click="test(4)" :class="{ color: this.star[4] }">
    <i class="fa-solid fa-star"></i>
    </span>
    <span @click="test(5)" :class="{ color: this.star[5] }">
    <i class="fa-solid fa-star"></i>
    </span>
    </div>
    <p>コメント</p>
    <textarea v-model="comment" class="comment"></textarea>
    <button @click="submit" class="submit">送信</button>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '../main';
export default {
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
  mounted() {
    
  },
  data() {
    return {
      userUid: '',
      characters: this.$store.state.diagnoses.results,
      imagePath: 'ドラミちゃん.jpg',
      star: [],
      comment: '',
      show: true
    }
  },
  methods: {
    async submit() {
      await axios .post("http://localhost:8000/api/v1/like", {
        
      });
      console.log(this.userUid)
      console.log(this.characters[0].diagnosis_id)
      console.log(this.comment)
      let count = 0
      this.star.forEach(element => {
        if (element) {
          count++
        }
      })
      console.log(count)
      this.show = null;
    },
    test(id) {
      if (!this.star[id]) {
        console.log('アイテムなし')
        this.star[id] = id
        console.log(this.star)
      }
      else {
        console.log(this.star)
        console.log('アイテムあり')
        console.log(id)
        delete this.star[id]
        console.log(this.star)
      }
    }
  },
  
}
</script>

<style>
.result-wrapper {
  background-color: #fff;
  margin: 60px auto 0px;
  padding: 5px 10px;
  width: 70%;
}

.star {
  margin: 0px 20px;
  font-size: 60px;
  color: #999;
}

.comment {
  width: 70%;
  height: 60px;
  padding: 10px;
  font-size: 16px;
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

.color {
  color: #D1DA6D;
}
</style>