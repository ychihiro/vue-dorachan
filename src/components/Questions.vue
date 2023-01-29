<template>
  <div v-for="question in filteredItems" :key="question">
    <p>Q{{ question.id }}</p>
    <p>{{ question.content }}</p>
  </div>
  <div v-for="choice in filteredItems" :key="choice">
    <p @click="buttonClicked">
    {{ choice["choices"][0].content }}
    </p>
    <p @click="buttonClicked">
    {{ choice["choices"][1].content }}
    </p>
    <p @click="buttonClicked">
    {{ choice["choices"][2].content }}
    </p>
  </div>
</template>

<script>
// import axios from 'axios';
// import { response } from 'express';

export default {
  name: 'Questions',
  props: ['questions', 'currentQuestion'],
  
  mounted() {
    // axios
    //   .get("http://localhost:8000/api/v1/question")
    //   .then((response) => {
    //     this.questions = response.data
    //   })
  },
  data() {
    return {
      diagnoses: [],
      // questions: [],
      // currentQuestion: 1,
    }
  },
  computed: {
    filteredItems() {
      return this.searchItem(this.questions, this.currentQuestion)
    }
  },
  methods: {
    searchItem(list, key) {
      return list.filter(question => {
        return question.number === key;
      });
    },
    nextClick() {
      this.$emit("next-btn");
    }
    // prevPage() {
    //   if (this.currentQuestion !== 1) {
    //     this.currentQuestion--;
    //     console.log(this.currentQuestion);
    //   }
    // },
    // nextPage() {
    //   if (this.currentQuestion !== 10) {
    //     this.currentQuestion++;
    //     console.log(this.currentQuestion);
    //   }
    //   if (this.currentQuestion == 10) {
    //     this.msg = '結果';
    //   }
    //   }
    },
  }

</script>