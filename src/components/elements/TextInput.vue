<template>
  <label class="block">
    <span>{{ label }}</span>
    <input class="text-input" v-model="localValue" :required="required" />
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: { type: String },
    label: { type: String },
    required: { type: Boolean }
  },
  computed: {
    localValue: {
      get(): string {
        return this.value;
      },
      set(val: string): void {
        this.$emit("input", val);
      }
    }
  }
});
</script>

<style lang="css">
.text-input {
  @apply bg-white border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal;
}
</style>
