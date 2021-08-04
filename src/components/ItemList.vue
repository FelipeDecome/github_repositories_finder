<template>
  <div ref="wrapper" class="wrapper">
    <ul ref="listBody" :style="listBodyStyle" class="item-list">
      <li
        v-for="item in view"
        :style="{ height: `${itemSize}px` }"
        :id="item.name"
        :key="item.name"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      viewElement: null,
      viewport: 0,
      itemSize: 60,
      currentRow: 0,
    };
  },
  mounted() {
    const { listBody } = this.$refs;

    this.viewport = listBody.offsetHeight;
  },
  computed: {
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
      const paddingTop = 0;
      const paddingBottom = `${
        this.virtualViewport - this.currentRow * this.itemSize
      }px`;
      return {
        paddingTop,
        paddingBottom,
        transform: `translateY(${this.currentRow * this.itemSize}px)`,
      };
    },
    view() {
      const { currentRow, rows } = this;

      return this.items.slice(
        Math.max(currentRow, currentRow - rows),
        currentRow + 20
      );
    },
  },
  watch: {
    view() {
      const { wrapper } = this.$refs;
      requestAnimationFrame(() => {
        wrapper.addEventListener(
          "scroll",
          () => {
            console.log("scrolled");
            requestAnimationFrame(this.handleScroll);
          },
          true
        );
      });
    },
  },
  methods: {
    handleScroll() {
      const {
        wrapper: { scrollTop },
      } = this.$refs;

      const { itemSize, totalRows } = this;

      this.$nextTick(() => {
        const indexOfCurrentElement = Math.floor(scrollTop / itemSize);

        this.currentRow = Math.max(
          0,
          Math.min(totalRows, indexOfCurrentElement)
        );
        console.log(this.currentRow);
      });
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  display: grid;
  height: 100%;
  overflow: auto;
  grid-auto-flow: column;
  grid-auto-columns: 1fr 16px;

  .item-list {
    overflow: hidden;
  }

  li {
    padding: 1rem 0;
  }
}
</style>
