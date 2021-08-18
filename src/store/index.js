import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { axiosConfig } from "../config/axios";
import debounce from "lodash.debounce";

Vue.use(Vuex);

// const getRandom = (min = 10, max = 500) =>
//   ~~(Math.random() * (max - min) + min);

// const data = [...Array(100)].map((_, id) => ({
//   id,
//   name: `John Doe ${id + 1}`,
//   stars: getRandom(5, 50),
//   repos: getRandom(1, 30),
//   watchers: getRandom(0, 2000),
// }));

const parseReposData = (repos) => {
  return repos.map((repo) => {
    const {
      id,
      full_name,
      description,
      watchers_count,
      stargazers_count,
      forks_count,
      owner: { avatar_url },
      url,
    } = repo;

    return {
      id,
      avatar: avatar_url,
      name: full_name,
      description,
      watchers: watchers_count,
      stars: stargazers_count,
      forks: forks_count,
      url,
    };
  });
};

export default new Vuex.Store({
  state: {
    data: [],
    searchInput: "",
    loading: false,
  },
  mutations: {
    SET_DATA(state, payload) {
      state.data = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async setData({ commit, state, dispatch }, payload) {
      if (!payload && state.searchInput !== payload) {
        commit("SET_DATA", []);
        return;
      }

      commit("SET_LOADING", true);
      await dispatch("findRepos", payload);
    },
    findRepos: debounce(async function ({ commit }, payload) {
      const response = await axios.get(axiosConfig.paths.REPOS, {
        params: { q: payload, per_page: 500 },
      });

      commit("SET_DATA", parseReposData(response.data.items));
      commit("SET_LOADING", false);
    }, 400),
  },
  modules: {},
});
