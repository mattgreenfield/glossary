<template>
  <div class="wrapper">
    <header>
      <h1 class="text-3xl font-bold">Company Glossary</h1>
      <Search v-model="search.text" :selected-tags.sync="search.tags" />
      <AddNew />
    </header>
    <main class="mb-16">
      <Terms :search="search" />
    </main>
    <footer class="text-right mb-4">
      <a href="">View the source</a>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Search from "./components/Search.vue";
import AddNew from "./components/AddNew.vue";
import Terms from "./components/Terms.vue";

export default Vue.extend({
  name: "app",
  components: {
    Search,
    Terms,
    AddNew
  },
  data(): any {
    return {
      search: {
        text: "",
        tags: []
      }
    };
  }
});
</script>

<style>
.wrapper {
  max-width: 600px;
  margin: 0 auto;
}
</style>
