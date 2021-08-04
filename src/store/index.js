import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const data = [...Array(500)].map((_, id) => ({
  name: `array-item-${id + 1}`,
}));

console.log(data);

export default new Vuex.Store({
  state: {
    data,
  },
  mutations: {},
  actions: {},
  modules: {},
});
