<template>
  <div class="wrapper">
    <p class="msg">ご購入ありがとうございました</p>
    <router-link to="/" class="home-btn">
    ホーム
    </router-link>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.wrapper {
  padding: 300px 0px;
}
.msg {
  margin-bottom: 30px;
  font-size: 30px;
  color: #fff;
}
.home-btn {
  padding: 10px 25px;
  margin-top: 20px auto;
  color: #fff;
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}

@media screen and (max-width:768px) {
  .wrapper {
    padding: 600px 0px;
  }
}
</style>