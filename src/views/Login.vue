<template>
  <v-row class="fill-height" align="center" justify="center">
    <v-card>
      <v-card-title primary-title> Login </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="pt-0 pb-0">
            <v-text-field label="ID"></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0 pb-0">
            <v-text-field
              label="Password"
              type="password"
              counter=""
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" tile depressed>text</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
