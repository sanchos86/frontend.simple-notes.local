<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.text"
          :to="item.to"
          link
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
    <v-app-bar
      color="primary"
      clipped-left
      app
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-app>
</template>

<script>
  import menu from '@/utils/menu';

  export default {
    data() {
      return {
        menu,
        drawer: false,
      };
    },
  };
</script>
