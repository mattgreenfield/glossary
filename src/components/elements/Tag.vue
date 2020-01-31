<template>
  <button
    type="button"
    class="tag"
    :class="{ selected: selected }"
    @click="$emit('tagClicked', id)"
  >
    {{ title }}
  </button>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Tag",
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    }
  }
});
</script>

<style>
.tag {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2;
}

.selected {
  background: red;
}
</style>
