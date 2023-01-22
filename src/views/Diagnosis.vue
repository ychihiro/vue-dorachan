<template>
  <p></p>
  <p>{{ prev }}/{{ next }}</p>
</template>

<script>
export default {
  data() {
    return {
      prev: 1,
      next: 10,
      
      questions: [
        {
          question: '道に迷っている人がいます。あなたはどのような行動をとりますか？',
          answers: ['aaaaaaa','bbbbbbb','ccccccc'],
          nerve: 1,
          cooperate: 4,
          active: 7
        }
      ],
      scores: [
        {
          
        }
      ],
      characters: [
        {

        }
      ]
    };
  }
}
</script>