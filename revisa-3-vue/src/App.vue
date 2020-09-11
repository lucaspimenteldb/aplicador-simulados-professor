<template>
  <v-app>

    <MenuLateral />
    <Toolbar />

    <v-main class="pa-sm-16 mr-0 grey lighten-4">
      <router-view
              class="pa-4 mx-0" :class="'mr-0 ml-0'"
      />
    </v-main>
  </v-app>
</template>

<script>

import MenuLateral from './components-professores/MenuLateral.vue';
import Toolbar from './components-professores/Toolbar.vue';

export default {
  name: 'App',

  components: {
    MenuLateral, Toolbar,
  },

  data: () => ({
    //
  }),
};
</script>
