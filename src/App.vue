<template>
  <div class="wrapper">
    <header>
      <h1 class="title">Company Glossary</h1>
      <AddNew />
      <Search v-model="search.text" />
      <Tags v-if="getTags" :tags="getTags.data" />
    </header>
    <main>
      <Terms :search="search" />
    </main>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Search from "./components/Search.vue";
import AddNew from "./components/AddNew.vue";
import Tags from "./components/Tags.vue";
import Terms from "./components/Terms.vue";

export default {
  name: "app",
  components: {
    Search,
    Tags,
    Terms,
    AddNew
  },
  data() {
    return {
      search: {
        text: "",
        tags: []
      }
    };
  },
  apollo: {
    getTags: gql`
      query {
        getTags {
          data {
            title
          }
        }
      }
    `
  }
};
</script>

<style>
.wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.reset-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
