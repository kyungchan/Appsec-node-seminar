<template>
  <v-container>
    <v-dialog v-model="atDialog" max-width="500px">
      <v-card>
        <v-card-title> 재실 상태 변경 </v-card-title>
        <v-card-text>
          <v-row>
            <v-radio-group v-model="seletedAt">
              <v-radio label="Lab" value="Lab"></v-radio>
              <v-radio label="In Campus" value="In Campus"></v-radio>
              <v-radio label="Out Campus" value="Out Campus"></v-radio>
              <v-radio label="Home" value="Home"></v-radio>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onOk" tile depressed>OK</v-btn>
          <v-btn color="primary" @click="atDialog = false" tile outlined
            >Cancle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" class="text-center"><h3>출입현황판</h3></v-col>
      <v-col cols="12">
        <v-data-table
          :footer-props="{
            'items-per-page-options': [10, 25, 50, 100, -1],
          }"
          @click:row="onRowClick"
          class="elevation-2"
          :headers="headers"
          :items="items"
        >
          <template v-slot:item.at="{ item }">
            <v-chip :color="getColor(item.at)" dark>{{ item.at }}</v-chip>
          </template>
        </v-data-table></v-col
      >
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
    atDialog: false,
    userModel: {},
    seletedAt: "",
    editDialog: false,
    items: [],
    headers: [
      { text: "이름", value: "name" },
      { text: "직급", value: "position" },
      { text: "연락처", value: "contact" },
      { text: "재실", value: "at" },
    ],
  }),
  methods: {
    getColor(at) {
      if (at == "Lab") return "green";
      else if (at == "In Campus") return "light-green";
      else if (at == "Out Campus") return "orange";
      else return "gray";
    },
    onOk() {
      this.$axios
        .patch(`/api/users/${this.userModel.id}`, {
          at: this.seletedAt,
        })
        .then(() => {
          this.userModel.at = this.seletedAt;
          this.atDialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onRowClick(user) {
      this.seletedAt = user.at;
      this.userModel = user;
      this.atDialog = true;
    },
  },
};
</script>

<style></style>
