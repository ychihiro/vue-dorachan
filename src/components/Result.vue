<template>
  <h1 class="ttl">あなたにそっくりなキャラクターは・・・</h1>
    <div class="img-wrapper">
    <img v-if="image" :src="'http://localhost:8000/storage/' + image" alt="ドラミちゃん" class="img">
    </div>
    <h2 class="name">{{ characters[0].name }}</h2>
    <p class="description">{{ characters[0].description }}</p>
    <p class="percent">マッチ度{{ characters[0].average }}％</p>
</template>

<script>
import firebase from '../main';
export default {
  name: 'Result',
  // props: ['name', 'diagnoses'],
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
      image: this.$store.state.diagnoses.results[0].path,
    }
  },
  methods: {

  },
}
</script>

<style scoped>
.ttl {
  color: #fff;
  margin: 0px 0px 40px;
}

.img-wrapper {
  width: 230px;
  margin: 0 auto;
}

.img {
  width: 100%;
  /* height: 250px; */
  /* object-fit: cover; */
}

.name {
  color: #fff;
  margin: 10px 0px;
}

.description,
.percent {
  color: #fff;
}
</style>