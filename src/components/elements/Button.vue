<template>
  <button class="button" :type="type" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: "button"
    }
  }
});
</script>

<style>
.button {
  @apply bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded;
}

.button:hover {
  @apply bg-blue-400 border-blue-500;
}
</style>
