<template>
  <label for="">キャラクター名
  <input type="text" :value="name" @input="$emit('update:name', $event.target.value)">
  </label>
  <label for="">キャラクター説明
  <input type="text" :value="description" @input="$emit('update:description', $event.target.value)">
  </label>
</template>

<script>
export default {
  name: 'Character',
  props: ['name', 'description'],
  emits: ['update:name', 'update:description'],
}
</script>