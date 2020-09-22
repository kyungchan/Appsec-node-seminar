<template>
  <div>
    <HelloCompo :name="myName" :value="msg" @on-btn="onBtn"></HelloCompo>
    <v-text-field label="v-model테스트" v-model="msg"></v-text-field>
    안녕하세여
    <v-btn color="success">text</v-btn>
    <v-fade-transition>
      <div v-if="show" v-html="html"></div>
    </v-fade-transition>
    <div v-show="show" v-text="html"></div>
    <v-checkbox label="show test" v-model="show"></v-checkbox>
  </div>
</template>

<script>
/*
 v-bind: VM과 View를 연동시켜주는것 약어: (:)
 v-model: v-bind:value와 같은것
 v-on: 이벤트를 핸들링하는것 약어: @
 v-show: display: none을 적용시켜 안보이는것처럼
 v-if: 정말로 DOM을 없애주는것
 v-html: 태그안에 html을 랜더링해준다
 v-text: 태그안에 text를 넣어준다.
*/
import HelloCompo from "../components/HelloCompo";
export default {
  components: { HelloCompo },
  data: () => ({
    show: true,
    html: "<h1>test</h1>",
    myName: "김경찬",
    msg: "Hello world",
  }),
  methods: {
    onBtn() {
      this.msg += "clicked";
    },
  },
};
</script>

<style></style>
