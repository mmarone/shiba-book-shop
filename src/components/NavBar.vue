<template>
  <nav>
    <v-navigation-drawer color="blue" v-model="drawer" app>
      <v-img :aspect-ratio="12 / 9" src="@/assets/image/shiba-reading.png">
      </v-img>
      <v-divider class="white"></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            MENUS
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list dense>
        <v-list-item link :to="`/`" active-class="highlighted">
          <v-list-item-action>
            <v-icon color="white">mdi-storefront</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Shop
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="dialog = !dialog">
          <v-list-item-action>
            <v-icon color="white">mdi-tablet-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="dialog = !dialog">
          <v-list-item-action>
            <v-icon color="white">mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Transaction
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Shiba Book Shop</v-toolbar-title>
    </v-app-bar>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Coming Soon...</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      color: "blue",
      dialog: false
    };
  }
};
</script>

<style lang="scss">
.v-toolbar__title {
  font-weight: 700;
}

.v-list {
  &-item__subtitle {
    color: white !important;
  }
  &-item__content {
    font-weight: 700 !important;

    .v-list-item__title {
      color: white !important;
      font-size: 1rem !important;
    }
  }
}
</style>
