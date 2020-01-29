<template>
  <fieldset class="mb-4">
    <Button @click="open = !open" class="mb-4">Add New Term</Button>
    <form v-if="open" @submit.prevent="addTerm">
      <TextInput label="Term" v-model="newTerm" required class="mb-2" />
      <TextInput label="Abbreviation" v-model="newAbbreviation" class="mb-2" />
      <TextInput
        label="Description"
        v-model="newDescription"
        required
        class="mb-2"
      />
      <Button type="submit">Add</Button>
    </form>
  </fieldset>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import TERMS_ALL from "../graphql/TermsAll.gql";
import TextInput from "@/components/elements/TextInput.vue";
import Button from "@/components/elements/Button.vue";

export default Vue.extend({
  data() {
    return {
      open: false,
      newTerm: "",
      newDescription: "",
      newAbbreviation: ""
    };
  },
  components: {
    Button,
    TextInput
  },
  methods: {
    addTerm() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $term: String!
              $description: String!
              $abbreviation: String
            ) {
              createTerm(
                data: {
                  term: $term
                  description: $description
                  abbreviation: $abbreviation
                }
              ) {
                _id
                term
                description
                abbreviation
                tags {
                  title
                }
              }
            }
          `,
          // Parameters
          variables: {
            abbreviation: this.newAbbreviation,
            term: this.newTerm,
            description: this.newDescription
          },

          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data: { createTerm } }) => {
            // Read the data from our cache for this query.
            const cache = store.readQuery({ query: TERMS_ALL });

            // Add our tag from the mutation to the end
            cache.allTerms.data.push(createTerm);
            // Write our data back to the cache.
            store.writeQuery({ query: TERMS_ALL, data: cache });
            // return null;
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          optimisticResponse: {
            __typename: "Mutation",
            createTerm: {
              __typename: "Term",
              _id: -1,
              abbreviation: this.newAbbreviation,
              term: this.newTerm,
              description: this.newDescription,
              tags: []
            }
          }
        })
        .then(data => {
          // Result
          // eslint-disable-next-line
          console.log(data);
        })
        .catch(error => {
          // Error
          // eslint-disable-next-line
          console.error(error);
        });
    }
  }
});
</script>

<style lang="scss" scoped></style>
