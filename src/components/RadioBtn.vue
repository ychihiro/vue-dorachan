<template>
  <p>協調性</p>
  <template v-for="item in 5" :key="item">
    <label>{{ item }}
    <input type="radio" :value="item" :checked="item == 1" :name="characters.id1" @change="$emit('update:cooperation', $event.target.value)">
    </label>
  </template>
  <p>外向性</p>
  <template v-for="item in 5" :key="item">
      <label>{{ item }}
      <input type="radio" :value="item" :checked="item == 1" :name="characters.id2" @change="$emit('update:extroversion', $event.target.value)">
      </label>
  </template>
  <p>誠実性</p>
  <template v-for="item in 5" :key="item">
    <label>{{ item }}
    <input type="radio" :value="item" :checked="item == 1" :name="characters.id3" @change="$emit('update:sincerity', $event.target.value)">
    </label>
  </template>
  <p>開放性</p>
  <template v-for="item in 5" :key="item">
    <label>{{ item }}
    <input type="radio" :value="item" :checked="item == 1" :name="characters.id4" @change="$emit('update:openness', $event.target.value)">
    </label>
  </template>
  <p>神経症的傾向</p>
  <template v-for="item in 5" :key="item">
    <label>{{ item }}
    <input type="radio" :value="item" :checked="item == 1" :name="characters.id5" @change="$emit('update:nerve', $event.target.value)">
    </label>
  </template>
</template>

<script>
export default {
  name: 'RadioBtn',
  props: [ 'cooperation', 'extroversion', 'sincerity', 'openness', 'nerve', 'characters'],
  emits: ['update:cooperation', 'update:extroversion', 'update:sincerity', 'update:openness', 'update:nerve'],
}
</script>