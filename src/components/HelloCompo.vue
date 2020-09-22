<template>
  <div>
    {{ name }} 님 안녕하세요.<br />
    받은 메시지: {{ value }}
    <v-btn @click="onClick">Click Me</v-btn>
  </div>
</template>

<script>
export default {
  props: ["value", "name"],
  data: () => ({
    localName: "KKC",
  }),
  methods: {
    onClick() {
      this.$emit("on-btn");
    },
  },
};
</script>

<style></style>
