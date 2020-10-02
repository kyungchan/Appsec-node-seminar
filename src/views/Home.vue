<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="text-center"><h3>출입현황판</h3></v-col>
      <v-col cols="12">
        <v-data-table class="elevation-2" :headers="headers" :items="items">
        </v-data-table
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$axios
      .get("/api/users")
      .then((result) => {
        this.items = result.data;
      })
      .catch(() => {
        console.log("불러오기 실패");
      });
  },
  data: () => ({
    selectedStatus: "",
    editDialog: false,
    selectedUser: {},
    items: [],
    headers: [
      { text: "이름", value: "name" },
      { text: "직급", value: "position" },
      { text: "연락처", value: "contact" },
      { text: "재실", value: "at" },
    ],
  }),
  methods: {},
};
</script>

<style></style>
