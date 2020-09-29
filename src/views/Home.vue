<template>
  <v-container>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title>재실 상태 변경</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selectedStatus">
            <v-radio label="Lab" value="Lab"></v-radio>
            <v-radio label="Class" value="Class"></v-radio>
            <v-radio label="In Campus" value="In Campus"></v-radio>
            <v-radio label="Out Campus" value="Out Campus"></v-radio>
            <v-radio label="Trip" value="Trip"></v-radio>
            <v-radio label="Home" value="Home"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onEditStatus" depressed>OK</v-btn>
          <v-btn color="primary" @click="editDialog = false" outlined
            >Cancle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" class="text-center"><h3>출입현황판</h3></v-col>
      <v-col cols="12" md="8">
        <v-data-table
          class="elevation-2"
          @click:row="onRowClick"
          :headers="headers"
          :items="items"
        >
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
  methods: {
    onRowClick(user) {
      this.selectedStatus = user.at || "Lab";
      this.editDialog = true;
      this.selectedUser = user;
    },
    onEditStatus() {
      this.$axios
        .patch(`/api/users/${this.selectedUser.id}`, {
          at: this.selectedStatus,
        })
        .then(() => {
          this.selectedUser.at = this.selectedStatus;
          this.editDialog = false;
        });
    },
  },
};
</script>

<style></style>
