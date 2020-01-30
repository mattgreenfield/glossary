<template>
  <div class="wrapper">
    <header>
      <h1 class="text-3xl font-bold">Company Glossary</h1>
      <Search v-model="search.text" :selected-tags.sync="search.tags" />
      <AddNew />
    </header>
    <main>
      <Terms :search="search" />
    </main>
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
