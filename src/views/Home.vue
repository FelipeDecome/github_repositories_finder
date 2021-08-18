<template>
  <div class="app-container">
    <div>
      <h2>Github Repositories finder</h2>
      <controlled-input
        placeholder="Enter anything to start searching"
        :value="searchInput"
        @input="setSearchInput"
      />
    </div>
    <loading v-if="loading" />

    <item-list v-else-if="data.length" :items="data" />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import { mapState, mapActions } from "vuex";
import ControlledInput from "@/components/Input.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "Home",
  components: { ItemList, ControlledInput, Loading },
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    ...mapState(["data", "loading"]),
  },
  methods: {
    /**
     * @param {KeyboardEvent} e
     */
    setSearchInput(e) {
      if (e.target.value) this.searchInput = e.target.value;
    },
    ...mapActions(["setData"]),
  },
  watch: {
    searchInput(value, oldValue) {
      if (value !== oldValue) this.setData(value);
    },
  },
};
</script>

<style lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  height: 100%;
  padding: 2.5rem 0 0;

  h2 {
    /* font-weight: 400; */
    letter-spacing: 1.2px;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }
}
</style>
