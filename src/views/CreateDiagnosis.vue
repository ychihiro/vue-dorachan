<template>
  <h1>診断名を入力</h1>
  <label for="">診断名
  <input type="text" v-model="diagnosis_name" placeholder="ドラえもん性格診断">
  </label>
    <div v-for="(character, index) in characters" :key="character">
      <div v-if="number > index">
      <character-input 
      v-model:name="character.character_name" 
      v-model:path="character.path" 
      v-model:description="character.description"
      ></character-input>
      <input type="file" ref="upfile" @change="upload">
      <character-point
      :characters="character"
      v-model:cooperation="character.cooperation"
      v-model:extroversion="character.extroversion"
      v-model:sincerity="character.sincerity"
      v-model:openness="character.openness"
      v-model:nerve="character.nerve"
      ></character-point>
    </div>
  </div>
  <button @click="add">追加</button>
  <button @click="del">削除</button>
</template>

<script>
import axios from 'axios';
import Character from '@/components/Character.vue';
import RadioBtn from '@/components/RadioBtn.vue';
export default {
  components: {
    'character-input': Character,
    'character-point': RadioBtn,
  },
  data() {
    return {
      diagnosis_name: '',
      characters: [{
        id1: 1,
        id2: 6,
        id3: 11,
        id4: 16,
        id5: 21,
        character_name: '',
        path: '',
        description: '',
        cooperation: 1,
        extroversion: 1,
        sincerity: 1,
        openness: 1,
        nerve: 1
      }],
      number: 1,
    }
  },
  methods: {
    upload() {
      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i].path = this.$refs.upfile[i].files[0]
      }
    },
    async send() {
      const data = new FormData;
      data.append('diagnosis_name', this.diagnosis_name);
      this.characters.filter(element => {
        data.append('character_name[]', element.character_name);
        data.append('upfile[]', element.path);
        data.append('description[]', element.description);
        data.append('cooperation[]', parseInt(element.cooperation));
        data.append('extroversion[]', parseInt(element.extroversion));
        data.append('sincerity[]', parseInt(element.sincerity));
        data.append('openness[]', parseInt(element.openness));
        data.append('nerve[]', parseInt(element.nerve));
      });
      await axios.post("http://localhost:8000/api/v1/diagnosis", data)
        .then(res => { console.log(res.data) });
    },
    add() {
      this.number++;
      const characterBox = {
        id1: this.characters[this.characters.length - 1].id1 + 1,
        id2: this.characters[this.characters.length - 1].id2 + 1,
        id3: this.characters[this.characters.length - 1].id3 + 1,
        id4: this.characters[this.characters.length - 1].id4 + 1,
        id5: this.characters[this.characters.length - 1].id5 + 1,
        character_name: '',
        path: '',
        description: '',
        cooperation: 1,
        extroversion: 1,
        sincerity: 1,
        openness: 1,
        nerve: 1
      }
      this.characters.push(characterBox)
    }
    ,
    del() {
      this.number--;
      this.characters.pop()
    }
  }
}
</script>