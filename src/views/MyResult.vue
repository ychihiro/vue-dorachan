<template>
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