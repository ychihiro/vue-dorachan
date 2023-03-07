<template>
  <li @click="clickName" class="item">{{ name }}</li>
</template>

<script>
export default {
  name: 'Diagnosis',
  props: ['name', 'diagnoses'],
  data() {
    return {
      diagnosesItem: this.diagnoses,
    }
  },
  methods: {
    clickName() {
      const item = this.diagnosesItem
      console.log(item)
      for (let i = 0; i < item.length; i++) {
        if (item[i].name === this.name) {
          console.log(item[i])
          this.$store.commit('diagnoses/setId', item[i].id,)
          this.$store.commit('diagnoses/setCharacters', item[i].characters);
          this.$store.commit('diagnoses/setQuestions', item[i].questions);
          console.log(item[i].id);
          console.log(item[i].characters);
          console.log(item[i].questions);
        }
      }
      this.$router.push('/diagnosis') 
    },
  },
}
</script>

<style scoped>
.item {
  font-size: 25px;
}
.item:hover {
  color: #CA8A8A;
  font-weight: bold;
}
</style>