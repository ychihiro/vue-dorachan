<template>
  <span @click="goodBtn(diagnosis)" class="heart">
      <i class="fa-solid fa-heart like" :class="{ liked: diagnosis.isliked }"></i>
      {{ diagnosis.count }}
  </span>
</template>

<script>
import firebase from '../main';
import axios from 'axios';

export default {
  name: 'Like',
  props: ['diagnosisItem'],
  data() {
    return {
      diagnosis: this.diagnosisItem,
      userUid: ''
    }
  },
  created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userUid = this.$store.getters.user.uid;
        this.checkedlike(this.userUid);
      })
  },
  methods: {
    async checkedlike(id) {
      const likedItem = await axios.get("http://localhost:8000/api/v1/like");
      this.diagnosis.count = 0;
      const myFavorite = [];
      likedItem.data.forEach(element => {
        if (element.user_id === id) {
          myFavorite.push(element);
        }
        if (element.diagnosis_id === this.diagnosisItem.id) {
          this.diagnosis.count++;
        }
      })
      myFavorite.forEach(element => {
        if (element.diagnosis_id === this.diagnosis.id) {
          this.diagnosis.isliked = true;
        }
      })
    },
    goodBtn(diagnosis) {
      if (this.$store.state.isLogin) {
        if (diagnosis.isliked) {
          diagnosis.isliked = null;
          this.unlike(diagnosis);
        } else {
          diagnosis.isliked = true;
          this.like(diagnosis);
        }
      }
      
    },
    async like(diagnosis) {
      diagnosis.count++
      await axios.post("http://localhost:8000/api/v1/like", {
        user_id: this.userUid,
        diagnosis_id: diagnosis.id
      });
    },
    async unlike(diagnosis) {
      diagnosis.count--;
      await axios.delete("http://localhost:8000/api/v1/like/" + diagnosis.id, {
        data: { user_id: this.userUid }
      });
    },
  },
}
</script>

<style scoped>
.liked {
  font-size: 26px;
  color: palevioletred;
}
.heart {
  font-size: 25px;
  color: #999;
}
</style>