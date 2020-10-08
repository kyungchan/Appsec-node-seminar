<template>
  <v-container>
    <v-dialog v-model="userDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title primary-title>{{
          addFlag ? "Add user" : "Edit user"
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form ref="userForm">
                <v-text-field
                  label="ID"
                  :disabled="!addFlag"
                  :rules="[
                    (v) => !!v || '필수로 입력해주세요.',
                    (v) => (!!v && v.length > 2) || '3글자 이상 입력해주세요',
                  ]"
                  v-model="userModel.id"
                ></v-text-field>
                <v-text-field
                  v-if="addFlag"
                  v-model="userModel.password"
                  label="Password"
                  :rules="[
                    (v) => !!v || '필수로 입력해주세요.',
                    (v) => (!!v && v.length > 5) || '5글자 이상 입력해주세요',
                  ]"
                  type="password"
                  counter=""
                ></v-text-field>
                <v-text-field
                  label="Name"
                  :rules="[(v) => !!v || '필수로 입력해주세요.']"
                  v-model="userModel.name"
                ></v-text-field>
                <v-text-field
                  label="Position"
                  :rules="[(v) => !!v || '필수로 입력해주세요.']"
                  v-model="userModel.position"
                ></v-text-field>
                <v-text-field
                  label="Contact"
                  :rules="[(v) => !!v || '필수로 입력해주세요.']"
                  hint="Email"
                  v-model="userModel.contact"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile depressed @click="onOk">OK</v-btn>
          <v-btn color="primary" tile outlined @click="onCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8" class="text-center"><h3>인원관리</h3></v-col>
      <v-col cols="2" align="end">
        <v-btn icon @click="onAddBtn"> <v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-data-table
      @click:row="onRowClick"
      class="elevation-2"
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.edit="{ item }">
        <v-btn icon @click="onEdit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn icon @click="onDelete(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ $moment(item.createdAt).format("YYYY-MM-DD HH:MM:SS") }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  methods: {
    onCancel() {
      this.userDialog = false;
      this.$refs.userForm.reset();
    },
    onAddBtn() {
      this.addFlag = true;
      this.userDialog = true;
      this.userModel = {};
    },
    onEdit(item) {
      this.userModel = Object.assign({}, item);
      this.addFlag = false;
      this.userDialog = true;
    },
    onDelete(item) {
      this.$axios
        .delete(`/api/users/${item.id}`)
        .then(() => {
          this.getUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
      this.$axios
        .get("/api/users")
        .then((result) => {
          this.items = result.data;
        })
        .catch(() => {
          console.log("불러오기 실패");
        });
    },
    onRowClick() {},
    onOk() {
      if (!this.$refs.userForm.validate()) return;
      if (this.addFlag)
        this.$axios
          .post("/api/users", this.userModel)
          .then((this.userDialog = false))
          .catch((err) => console.log(err));
      else
        this.$axios
          .patch(`/api/users/${this.userModel.id}`, {
            id: this.userModel.id,
            name: this.userModel.name,
            contact: this.userModel.contact,
            position: this.userModel.position,
          })
          .then(() => {
            this.getUser();
          })
          .catch((err) => {
            console.log(err);
          });
      this.userDialog = false;
      this.$refs.userForm.reset();
    },
  },
  mounted() {
    this.getUser();
  },
  data: () => ({
    tempUserModel: {},
    addFlag: true,
    userModel: {
      id: "",
      password: "",
      name: "",
      position: "",
      contact: "",
    },
    userDialog: false,
    items: [],
    headers: [
      { text: "Id", value: "id" },
      { text: "Name", value: "name" },
      { text: "Position", value: "position" },
      { text: "Contact", value: "contact" },
      { text: "Now at", value: "at" },
      { text: "Created at", value: "createdAt" },
      { text: "Edit", value: "edit" },
      { text: "Delete", value: "delete" },
    ],
  }),
};
</script>

<style></style>
