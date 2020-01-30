<template>
  <section class="border-solid border-gray-400 border p-4 mb-4 rounded-lg">
    <h3 class="text-xl font-bold">
      <span v-if="abbreviation">({{ abbreviation }})</span>
      {{ term }}
    </h3>
    <p class="mb-2">{{ description }}</p>
    <Tags class="-m-1" v-if="tags && tags.length" :tags="tags" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "./Tags.vue";

export default Vue.extend({
  components: {
    Tags
  },
  props: {
    term: {
      type: String
    },
    description: {
      type: String
    },
    tags: {
      type: Array
    },
    abbreviation: {
      type: String,
      required: false
    }
  }
});
</script>
