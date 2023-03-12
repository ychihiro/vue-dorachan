<template>
  <h1 class="ttl">あなたにそっくりなキャラクターは・・・</h1>
    <div class="img-wrapper">
      <img v-if="character.path" :src="'http://localhost:8000/storage/' + character.path" alt="ステッカー画像" class="img">
    </div>
    <h2 class="name">{{ character.name }}</h2>
    <p class="description">{{ character.description }}</p>
    <p v-if="character.average" class="percent">
    マッチ度{{ character.average }}％
    </p>
</template>

<script>
export default {
  name: 'Result',
  props: ['character'],
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