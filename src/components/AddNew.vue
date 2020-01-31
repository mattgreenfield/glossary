<template>
  <fieldset class="mb-4">
    <Button @click="open = !open" class="mb-4">Add New Term</Button>
    <form v-if="open" @submit.prevent="addTerm">
      <TextInput label="Term" v-model="term.term" required class="mb-2" />
      <TextInput
        label="Abbreviation"
        v-model="term.abbreviation"
        class="mb-2"
      />
      <TextInput
        label="Description"
        v-model="term.description"
        required
        class="mb-2"
      />
      <TagSelector label="Tags" v-model="newTags" :allTags="allTags.data" />
      <Button type="submit">Add</Button>
      <span v-if="loading">Loading</span>
    </form>
  </fieldset>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import TERMS_ALL from "../graphql/TermsAll.gql";
import TAGS_ALL from "@/graphql/TagsAll.gql";
import TextInput from "@/components/elements/TextInput.vue";
import Button from "@/components/elements/Button.vue";
import TagSelector from "@/components/elements/TagSelector.vue";

import {
  ApolloClient,
  ObservableQuery,
  ApolloQueryResult,
  QueryOptions,
  WatchQueryOptions,
  MutationOptions,
  SubscriptionOptions,
  OperationVariables
} from "apollo-client";

interface Term {
  term: string;
  description: string;
  abbreviation: string;
  tags: string[];
}

interface Tag {
  title: string;
  _id: string;
}

const blankTerm = {
  term: "",
  description: "",
  abbreviation: "",
  tags: []
} as Term;

export default Vue.extend({
  data() {
    return {
      open: false,
      term: { ...blankTerm },
      loading: false
    };
  },
  components: {
    Button,
    TextInput,
    TagSelector
  },
  computed: {
    newTags: {
      get(): Tag[] {
        const allTags = (this as any).allTags.data as Tag[];
        if (!allTags) return [];
        return allTags.filter(({ _id }) => this.term.tags.includes(_id));
      },
      set(val: Tag[]): void {
        this.term.tags = val.map(tag => tag._id);
      }
    }
  },
  methods: {
    addTerm(): void {
      this.loading = true;
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $term: String!
              $description: String!
              $abbreviation: String
              $tags: [ID]
            ) {
              createTerm(
                data: {
                  term: $term
                  description: $description
                  abbreviation: $abbreviation
                  tags: { connect: $tags }
                }
              ) {
                _id
                term
                description
                abbreviation
                tags {
                  data {
                    title
                  }
                }
              }
            }
          `,
          // Parameters
          variables: {
            abbreviation: this.term.abbreviation || null,
            term: this.term.term,
            description: this.term.description,
            tags: this.term.tags
          },

          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (store, { data }) => {
            const createTerm = data!.createTerm;
            // Read the data from our cache for this query.
            const cache = store.readQuery({ query: TERMS_ALL }) as any;

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
              abbreviation: this.term.abbreviation,
              term: this.term.term,
              description: this.term.description,
              tags: this.term.tags
            }
          }
        })
        .then(data => {
          // Result
          // eslint-disable-next-line
          console.log(data);
          this.term = { ...blankTerm };
        })
        .catch(error => {
          // Error
          // eslint-disable-next-line
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  apollo: {
    allTags: {
      query: TAGS_ALL
    }
  }
});
</script>
