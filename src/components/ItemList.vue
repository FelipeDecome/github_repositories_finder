<template>
  <div class="container">
    <div ref="wrapper" class="wrapper">
      <div v-if="mockItem" class="mock-wrapper">
        <profile-item ref="mock" />
      </div>
      <ul v-else ref="listBody" :style="[listBodyStyle]" class="item-list">
        <li
          v-for="{ id, ...item } in view"
          :style="{ height: `${itemSize}px` }"
          :id="item.name"
          :key="id"
        >
          <profile-item v-bind="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ProfileItem from "./ProfileItem.vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProfileItem,
  },
  data() {
    return {
      // viewElement: null,
      viewport: 0,
      itemSize: 60,
      itemsGap: 10,
      currentRow: 0,
      maxPerLoad: 100,
      ready: false,
      mockItem: true,
      spacing: 15,
    };
  },
  mounted() {
    this.itemSize = this.$refs.mock.$el.offsetHeight;
    this.$nextTick(() => {
      this.ready = true;
      this.mockItem = false;
    });
  },
  beforeDestroy() {
    if (this.$refs.wrapper)
      this.$refs.wrapper.removeEventListener("scroll", this.updateScroll, true);
  },
  watch: {
    ready(value) {
      if (value) {
        this.viewport = this.$refs.wrapper.offsetHeight;

        this.handleScroll();
        this.$refs.wrapper.addEventListener("scroll", this.updateScroll, true);
      }
    },
  },
  computed: {
    lastIndexRetrievedFromItems() {
      return this.currentRow + this.rows + 4;
    },

    rows() {
      return Math.floor(this.viewport / this.itemSize);
    },

    totalRows() {
      return this.items.length;
    },

    virtualViewport() {
      return this.itemSize * this.totalRows;
    },

    listBodyStyle() {
      const paddingBottom = `${
        this.virtualViewport -
        this.currentRow * this.itemSize +
        ((this.totalRows - 1) * this.itemsGap -
          this.currentRow * this.itemsGap) +
        this.spacing
      }px`;
      return {
        paddingTop: `${this.spacing}px`,
        paddingBottom,
        gap: `${this.itemsGap}px`,
        transform: `translateY(${this.currentRow * this.itemSize}px)`,
      };
    },

    view() {
      if (this.ready)
        return this.items.slice(
          Math.max(this.currentRow, this.currentRow - this.rows),
          this.lastIndexRetrievedFromItems
        );

      return [];
    },
  },
  methods: {
    updateScroll() {
      requestAnimationFrame(this.handleScroll);
    },

    handleScroll() {
      const {
        wrapper: { scrollTop },
      } = this.$refs;

      const { itemSize, totalRows } = this;

      const indexOfCurrentElement = Math.floor(scrollTop / itemSize);

      this.currentRow = Math.max(
        0,
        Math.min(totalRows, indexOfCurrentElement || 0)
      );
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  position: relative;

  width: 100%;
  flex: 1;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;

    box-shadow: 4px 0 16px 4px rgba(0, 0, 0, 0.1);
  }

  .mock-wrapper {
    opacity: 0;
    pointer-events: none;
  }

  .wrapper {
    display: flex;
    overflow: auto;
    scroll-behavior: smooth;
    border-top: 1px solid rgb(230, 230, 230);
    border-bottom: 1px solid rgb(230, 230, 230);
    flex: 1;
    width: 100%;

    .item-list {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      /* &.even {
      background: #f1f1f1;
    } */
    }
  }
}
</style>
