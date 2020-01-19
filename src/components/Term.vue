<template>
  <section class="term">
    <h3 class="term__heading">
      <span v-if="abbreviation">({{ abbreviation }})</span>
      {{ term }}
    </h3>
    <p>{{ description }}</p>
    <Tags :tags="tags" />
  </section>
</template>

<script>
import Tags from "./Tags.vue";

export default {
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
};
</script>

<style>
.term {
  border-bottom: 1px solid;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.term__heading {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
