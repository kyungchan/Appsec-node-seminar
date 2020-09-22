<template>
  <v-container>
    Wrike User Information <br />

    First Name: <v-text-field label="name" v-model="firstName"></v-text-field>
    <br />
    <v-btn @click="onClick">Get user information</v-btn>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    firstName: "No Name",
  }),
  methods: {
    onClick() {
      console.log("Loaded");
      var https = require("https");
      var permanent_token =
        "eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjEzMjc2NzEsXCJpXCI6NzIzNTU3OCxcImNcIjo0NjIxNjM5LFwidVwiOjI1ODk4MTYsXCJyXCI6XCJVU1wiLFwic1wiOltcIldcIixcIkZcIixcIklcIixcIlVcIixcIktcIixcIkNcIixcIkRcIixcIk1cIixcIkFcIixcIkxcIixcIlBcIl0sXCJ6XCI6W10sXCJ0XCI6MH0iLCJpYXQiOjE2MDA3MDgzODN9.I3dJtr_sWDZ0_ajQDX4PipzUPpdFE_VxTtKhKnk3poU";

      var options = {
        agent: false,
      };
      options.hostname = "www.wrike.com";
      options.port = 443;
      options.method = "GET";
      options.headers = { Authorization: "bearer " + permanent_token };
      options.path = "/api/v4/contacts?me=true";

      var req = https.request(options, (res) => {
        var body = [];
        res
          .on("data", (data) => {
            body.push(data);
          })
          .on("end", () => {
            body = Buffer.concat(body);
            var user = JSON.parse(body.toString()).data[0];
            this.firstName = "Babo";
            console.log(user.firstName);
            console.log(this.firstName);
            printUserInfo(user);
          });
      });
      //this.firstName = user.firstName;

      req.end();
    },
  },
};

function printUserInfo(user) {
  console.log(user);
  //print out   information about user who generates permanent
  //token for this application to console
  console.log("name       -", user.firstName);
  console.log("last name  -", user.lastName);
  console.log("id         -", user.id);
  console.log("accountId  -", user.profiles[0].accountId);
}
</script>

<style></style>
