<template>
  {{ character }}
  <h1>商品情報</h1>
  <div v-if="character">
  <h2>{{ character.name }}</h2>
  <div>
  <img :src="'http://localhost:8000/storage/' + character.path" alt="">
  </div>
  <p>￥{{ character.price }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: this.$store.state.diagnoses.results[0],
    }
  },
}
</script>