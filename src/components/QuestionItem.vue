<template>
  <label for="">
  <textarea :value="content" @input="$emit('update:content', $event.target.value)"></textarea>
  </label>
</template>

<script>
export default {
  name: 'Question',
  props: ['content'],
  emits: ['update:content'],
  data() {
    return {
    }
  },
  mounted() {

  }
}
</script>