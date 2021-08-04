<template>
  <item-list :items="data" />
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { ItemList },
  computed: mapState(["data"]),
};
</script>

<style lang="scss"></style>
