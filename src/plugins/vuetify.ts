import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#424242",
        secondary: "#f3cc65",
        accent: "#25916a",
        error: "#ff5f5d",
        info: "#36a0f3",
        success: "#54af59",
        warning: "#F3CC65"
      }
    }
  }
});
