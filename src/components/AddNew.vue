<template>
  <div>
    <button type="button" @click="open = !open">Add Term</button>
    <form v-if="open" @submit.prevent="addTerm">
      <label>
        Term
        <input type="text" v-model="newTerm" required />
      </label>
      <label>
        abbreviation
        <input type="text" v-model="newAbbreviation" required />
      </label>
      <label>
        Description
        <input type="text" v-model="newDescription" required />
      </label>
      <button type="submit">Add Term</button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import TERMS_ALL from "../graphql/TermsAll.gql";

export default {
  data() {
    return {
      open: false,
      newTerm: "",
      newDescription: "",
      newAbbreviation: ""
    };
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
            cache.getTerms.data.push(createTerm);
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
};
</script>

<style lang="scss" scoped></style>
