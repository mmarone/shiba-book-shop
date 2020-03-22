module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/sass/_variables.sass"`
      },
      scss: {
        data: `@import "@/assets/scss/main.scss";`
      }
    }
  }
};
