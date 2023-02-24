<template>
  <Header/>
  
  <!-- <nav> -->
    <!-- <router-link to="/"></router-link>  -->
    <!-- <router-link to="/about">About</router-link> | -->
    
  <!-- </nav> -->
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #3F89CD;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
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

/* input {
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
} */
</style>
