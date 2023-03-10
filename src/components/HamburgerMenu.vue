<template>
  <div class="menu" @click="toggle" :class="{ open: isActive }">
    <span class="menu__line--top"></span>
    <span class="menu__line--middle"></span>
    <span class="menu__line--bottom"></span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  data() {
    return {
      isActive: null
    }
  },
  methods: {
    toggle() {
      this.$router.push('/menu');
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
.menu {
  display: inline-block;
  /* width: 36px; */
  width: 65px;
  height: 60px;
  background-color: #D1DA6D;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  left: 40%;
  top: 20px;
}
.menu__line--top,
.menu__line--middle,
.menu__line--bottom {
  display: inline-block;
  width: 60%;
  height: 4px;
  background-color: #fff;
  position: absolute;
  left: 12px;
  transition: 0.5s;
} 
.menu__line--top {
  top: 15px;
}
.menu__line--middle {
  top: 28px;
}
.menu__line--bottom {
  bottom: 15px;
}
.menu.open span:nth-of-type(1) {
  top: 28px;
  transform: rotate(45deg);
}
.menu.open span:nth-of-type(2) {
  opacity: 0;
}
.menu.open span:nth-of-type(3) {
  top: 28px;
  transform: rotate(-45deg);
}
</style>