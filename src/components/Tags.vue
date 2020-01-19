<template>
  <ul class="reset-list tag-list">
    <li v-for="tag in tags" :key="tag.title">
      <div>{{ tag.title }}</div>
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
    }
  }
};
</script>

<style>
.tag-list li {
  margin: 0 4px 4px 0;
  display: inline-block;
}
</style>
