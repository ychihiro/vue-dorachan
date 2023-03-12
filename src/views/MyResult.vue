<template>
  <div class="header">
    <router-link to="/mypage" class="head-btn">
    戻る
    </router-link>
  </div>
  <div class="wrapper">
    <my-result :character="characters"></my-result>
  </div>
</template>

<script>
import Result from '@/components/Result.vue';
export default {
  components: {
    'my-result': Result
  },
  data() {
    return {
      characters: this.$store.state.diagnoses.myResults,
    }
  },
}
</script>

<style>
.wrapper {
  padding: 120px;
}
.head-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 380px 0px;
  }
}
</style>