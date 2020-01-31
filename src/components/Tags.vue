<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag.title" class="inline-block mx-1">
      <Tag
        :id="tag._id"
        :title="tag.title"
        :selected="selectedTags.includes(tag._id)"
        @click="$emit('tagClicked', tag._id)"
      />
    </li>
  </ul>
</template>

<script>
import Vue from "vue";
import Tag from "@/components/elements/Tag.vue";

export default Vue.extend({
  name: "TagsList",
  components: {
    Tag
  },
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
