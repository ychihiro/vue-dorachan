<template>
  <!-- <Header/> -->
  
  <!-- <nav> -->
    <!-- <router-link to="/"></router-link>  -->
    <!-- <router-link to="/about">About</router-link> | -->
    
  <!-- </nav> -->
  <router-view/>
</template>

<script>
// import Header from '@/components/Header.vue'
export default {
  name: 'App',
  // components: {
  //   Header
  // }
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

.register {
  background-color: #fff;
  width: 250px;
  padding: 20px 30px;
  margin: 0 auto;
  border-radius: 10px;
}

.username,
.email,
.password {
  /* border: 2px solid red; */
  display: block;
  text-align: left;
  margin-bottom: 30px;
}

.cart-btn {
  width: 110px;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: normal;
  text-decoration: none;
  color:#fff;
  background-color: #CA8A8A;
  cursor: pointer;
  border-radius: 25px;
  border: 1px solid #CA8A8A;
}

.cart-btn:hover {
  font-weight: bold;
}


/* input {
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
} */
</style>
