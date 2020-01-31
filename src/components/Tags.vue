<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag.title">
      <button
        type="button"
        class="tag"
        @click="$emit('tagClicked', tag._id)"
        :class="{ selected: selectedTags.includes(tag._id) }"
      >
        {{ tag.title }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: {
      type: Array,
      required: true
    },
    selectedTags: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style>
.tag-list li {
  margin: 0 4px 4px 0;
  display: inline-block;
}

.tag {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2;
}

.selected {
  background: red;
}
</style>
