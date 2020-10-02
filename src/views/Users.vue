<template>
  <v-container>
    <v-dialog v-model="userDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title>Add User</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form ref="userForm">
                <v-text-field label="ID" v-model="userModel.id"></v-text-field>
                <v-text-field
                  v-model="userModel.password"
                  label="Password"
                  type="password"
                  counter=""
                ></v-text-field>
                <v-text-field
                  label="Name"
                  v-model="userModel.name"
                ></v-text-field>
                <v-text-field
                  label="Position"
                  v-model="userModel.position"
                ></v-text-field>
                <v-text-field
                  label="Contact"
                  hint="Email"
                  v-model="userModel.contact"
                ></v-text-field
              ></v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile depressed @click="onUserAdd">OK</v-btn>
          <v-btn color="primary" tile outlined>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8" class="text-center"><h3>인원관리</h3></v-col>
      <v-col cols="2" align="end">
        <v-btn icon @click="userDialog = true">
          <v-icon>mdi-plus</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      @click:row="onRowClick"
      class="elevation-2"
      :headers="headers"
      :items="items"
    >
      <template v-slot:item.edit>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
      </template>
      <template v-slot:item.delete>
        <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
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
    onRowClick() {},
    onUserAdd() {
      if (this.$refs.userForm.validate())
        this.$axios
          .post("/api/users", this.userModel)
          .then((this.userDialog = false))
          .catch((err) => console.log(err));
    },
  },
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
    userModel: {
      id: "",
      password: "",
      name: "",
      position: "",
      contact: "",
    },
    userDialog: false,
    items: [
      { name: "홍길동", position: "교수", contact: "test@test.com", at: "In" },
      {
        name: "김철수",
        position: "석사연구생",
        contact: "test@test.com",
        at: "In",
      },
      {
        name: "김나래",
        position: "석사연구생",
        contact: "test@test.com",
        at: "In",
      },
      {
        name: "박민정",
        position: "학부연구생",
        contact: "test@test.com",
        at: "In",
      },
      {
        name: "구민지",
        position: "학부연구생",
        contact: "test@test.com",
        at: "In",
      },
      {
        name: "현승철",
        position: "학부연구생",
        contact: "test@test.com",
        at: "In",
      },
    ],
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
