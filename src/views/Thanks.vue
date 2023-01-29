<template>
  <div>
    <h2>{{message}}ありがとうございました</h2>
    <button>ログイン</button>
    <p>{{ this.$store.getters.user.email }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.getters.isLogin);
    console.log(this.$store.getters.user);
  },
  data() {
    return {
      message: "ログイン",

    }
  }
}
</script>