<template>
  <p>協調性</p>
  <template v-for="(option, index) in options" :key="index">
    <label>{{ option.label }}
    <input type="radio" name="cooperation" :checked="option.value === 1" :value="option.value" @input="$emit('update:cooperation', $event.target.value)">
    </label>
  </template>
  <p>外向性</p>
  <template v-for="(option, index) in options" :key="index">
    <label>{{ option.label }}
    <input type="radio" name="extroversion" :checked="option.value === 1" :value="option.value" @change="$emit('update:extroversion', $event.target.value)">
    </label>
  </template>
  <p>誠実性</p>
  <template v-for="(option, index) in options" :key="index">
    <label>{{ option.label }}
    <input type="radio" name="sincerity" :checked="option.value === 1" :value="option.value" @change="$emit('update:sincerity', $event.target.value)">
    </label>
  </template>
  <p>開放性</p>
  <template v-for="(option, index) in options" :key="index">
    <label>{{ option.label }}
    <input type="radio" name="openness" :checked="option.value === 1" :value="option.value" @change="$emit('update:openness', $event.target.value)">
    </label>
  </template>
  <p>神経症的傾向</p>
  <template v-for="(option, index) in options" :key="index">
    <label>{{ option.label }}
    <input type="radio" name="nerve" :checked="option.value === 1" :value="option.value" @change="$emit('update:nerve', $event.target.value)">
    </label>
  </template>
</template>

<script>
export default {
  name: 'RadioBtn',
  props: [ 'cooperation', 'extroversion', 'sincerity', 'openness', 'nerve', 'characters'],
  emits: ['update:cooperation', 'update:extroversion', 'update:sincerity', 'update:openness', 'update:nerve'],
  data() {
    return {
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
      ]
    }
  },
}
</script>