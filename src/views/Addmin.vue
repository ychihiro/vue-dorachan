<template>
  <h1>診断名を入力</h1>
  <label for="">診断名
  <input type="text" v-model="diagnosis_name" placeholder="ドラえもん性格診断">
  </label>
  <!-- キャラクター１ -->
  <div v-if="number > 0">
    <character-input 
    v-model:name="characters[0].character_name" 
    v-model:path="characters[0].path" 
    v-model:description="characters[0].description"
    ></character-input>
    <label for="">画像
    <input type="file" ref="upfile" @change="upload(event)">
    </label>
    <character-point
    v-model:cooperation="characters[0].cooperation"
    v-model:extroversion="characters[0].extroversion"
    v-model:sincerity="characters[0].sincerity"
    v-model:openness="characters[0].openness"
    v-model:nerve="characters[0].nerve"
    ></character-point>
  </div>
  <!-- キャラクター２ -->
  <div v-if="number > 1">
    <character-input 
    v-model:name="characters[1].character_name" 
    v-model:path="characters[1].path" 
    v-model:description="characters[1].description"
    ></character-input>
    <character-point
    v-model:cooperation="characters[1].cooperation"
    v-model:extroversion="characters[1].extroversion"
    v-model:sincerity="characters[1].sincerity"
    v-model:openness="characters[1].openness"
    v-model:nerve="characters[1].nerve"
    ></character-point>
  </div>
  <!-- キャラクター３ -->
  <div v-if="number > 2">
    <character-input 
    v-model:name="characters[2].character_name" 
    v-model:path="characters[2].path" 
    v-model:description="characters[2].description"
    ></character-input>
    <character-point
    v-model:cooperation="characters[2].cooperation"
    v-model:extroversion="characters[2].extroversion"
    v-model:sincerity="characters[2].sincerity"
    v-model:openness="characters[2].openness"
    v-model:nerve="characters[2].nerve"
    ></character-point>
  </div>
  <button @click="add">追加</button>
  <button @click="test">テスト</button>
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
  mounted() {
  },
  data() {
    return {
      characters: [{
        character_name: '',
        path: '',
        description: '',
        cooperation: 1,
        extroversion: 1,
        sincerity: 1,
        openness: 1,
        nerve: 1
      },
      ],
      diagnosis_name: '',
      character_name: [],
      path: [],
      description: [],
      cooperation: [],
      extroversion: [],
      sincerity: [],
      openness: [],
      nerve: [],
      number: 1,
    }
  },
  methods: {
    upload() {
      this.path = this.$refs.upfile.files[0]
      console.log(this.path)
      // const data = new FormData;
      // data.append('upfile', this.$refs.upfile.files[0])
      // console.log(data)
      // console.log(this.$refs.upfile.files[0])
    },
    add() {
      this.number++;
      const characterBox = {
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
      console.log(this.characters)
    }
    ,
    del() {
      this.number--;
      this.characters.pop()
    },
    async test() {
      const data = new FormData;
      data.append('upfile', this.path);
      let config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      this.characters.fileter(element => {
        console.log(element)
      })
      // this.characters.filter(element => {
      //   element.cooperation = parseInt(element.cooperation)
      //   element.extroversion = parseInt(element.extroversion)
      //   element.sincerity = parseInt(element.sincerity)
      //   element.openness = parseInt(element.openness)
      //   element.nerve = parseInt(element.nerve)
      //   console.log(element)
      // })
      
      await axios.post("http://localhost:8000/api/v1/diagnosis", data, config, {
        diagnosis_name: this.diagnosis_name,
        characters: this.characters
      });
    }
  }
}
</script>