<template>
  <input
    class="input"
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.input {
  padding: 0.625rem 1rem;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 1rem;
  color: #515151;
  outline: 0;
  width: 36rem;

  transition: all 0.2s;

  &:focus,
  &:active {
    border-color: rgb(102, 51, 153);
    box-shadow: 0 4px 16px rgba(102, 51, 153, 0.15);
  }
}
</style>
