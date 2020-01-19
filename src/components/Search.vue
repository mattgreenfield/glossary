<template>
  <div>
    <label>
      Search
      <input v-model="localValue" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    value: {
      type: String
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped></style>
