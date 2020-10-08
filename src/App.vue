<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Appsec</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!userId" color="primary" to="/login" class="elevation-0"
        ><v-icon left>mdi-login</v-icon>Login</v-btn
      >
      <v-btn
        v-else
        color="primary"
        class="elevation-0"
        @click="$store.commit('logout')"
        ><v-icon left>mdi-logout</v-icon>Logout</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="primary--text text--accent-4"
        >
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-subheader>Admin</v-subheader>
          <v-list-item link to="/users">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </v-fade-transition>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="item in footerItems"
          :key="item"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ item.text }}
        </v-btn>

        <v-col class="primary lighten-2 pa-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Appsec, MJU</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  computed: {
    userId() {
      return this.$store.state.id;
    },
  },
  data: () => ({
    drawer: false,
    footerItems: [{ text: "Home", link: "/" }],
  }),
};
</script>
