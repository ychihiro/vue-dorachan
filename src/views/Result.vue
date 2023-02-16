<template>
  <p>あなたにそっくりなキャラクターは・・・</p>
  <h1>{{ characters[0].name }}</h1>
  <dir>
  <img src="" alt="">
  <img v-bind:src="imagePath" alt="">
  <img src="@/assets/images/ドラミちゃん.jpg" alt="">
  </dir>
  <p>{{ characters[0].path }}</p>
  <p>{{ characters[0].description }}</p>
  <p>マッチ度{{ characters[0].average }}％</p>
  <div v-if="!characters[0].results">
  おめでとうございます！<br>抽選が当たりました！ステッカーをプレゼントします！<br>
  <button>住所を入力する</button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.characters)
    console.log(this.imagePath)

  },
  data() {
    return {
      characters: this.$store.state.diagnoses.results,
      imagePath: 'ドラミちゃん.jpg'
    }
  },
}
</script>