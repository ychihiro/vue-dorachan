<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
    font-size: 18px;
    line-height:1.5;
    color: #555;
    background-color: #3F89CD;
}

.header {
  display: flex;
  justify-content: right;
  padding: 20px 10px;
}

.username,
.email,
.password {
  display: block;
  text-align: left;
  margin-bottom: 30px;
}

.cart-btn,
.search-btn,
.login-btn,
.register-btn,
.send-btn,
.home-btn,
.head-btn,
.product-page,
.share-btn,
.card-btn,
.change-btn {
  width: 110px;
  padding: 10px 10px;
  font-size: 20px;
  font-weight: normal;
  text-decoration: none;
  color:#fff;
  background-color: #CA8A8A;
  cursor: pointer;
  border-radius: 25px;
  border: 1px solid #CA8A8A;
}

.cart-btn:hover,
.search-btn:hover,
.login-btn:hover,
.register-btn:hover,
.send-btn:hover,
.home-btn:hover,
.head-btn:hover,
.product-page:hover,
.share-btn:hover,
.card-btn:hover,
.change-btn:hover {
  font-weight: bold;
}

.link {
  color: #3F89CD;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.error,
.register-msg {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: red;
}
</style>
