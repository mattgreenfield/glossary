<template>
  <ol type="A">
    <li v-for="(letter, key) in sortedList" :key="key" class="relative">
      <div class="text-5xl font-black sticky top-0 -ml-12">
        {{ key.toUpperCase() }}
      </div>
      <ol type="A">
        <li v-for="term in sortedList[key]" :key="term.term">
          <Term
            :key="term._id"
            :term="term.term"
            :abbreviation="term.abbreviation"
            :description="term.description"
            :tags="term.tags.data"
          />
        </li>
      </ol>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Term from "./Term.vue";
import TERMS_ALL from "@/graphql/TermsAll.gql";
import gql from "graphql-tag";

interface Term {
  term: string;
  abbreviation: string;
  _id: string;
  tags: Object;
}

interface SortedList {
  [key: string]: Term[];
}

interface Search {
  tags: string[];
  text: string;
}

export default Vue.extend({
  name: "Terms",
  components: {
    Term
  },
  props: {
    search: {
      type: Object
    } as PropOptions<Search>
  },
  computed: {
    sortedList(): SortedList {
      // eslint-disable-next-line
      // console.log(this.findTagByID.terms.data);

      const { findTagByID, allTerms } = this as any;
      let data = [];

      if (this.search.tags.length) {
        data = findTagByID.terms.data;
      } else {
        if (allTerms) {
          data = allTerms.data;
        }
      }

      const groupedByLetter = data.reduce((acc: SortedList, term: Term) => {
        const firstLetter = term.term.charAt(0).toLowerCase();
        if (acc[firstLetter]) {
          acc[firstLetter].push(term);
        } else {
          acc[firstLetter] = [term];
        }
        return acc;
      }, {}) as SortedList;

      const ordered = {} as SortedList;
      Object.keys(groupedByLetter)
        .sort()
        .forEach(key => {
          ordered[key] = groupedByLetter[key];
        });

      return ordered;
    }
  },
  apollo: {
    allTerms: {
      query: TERMS_ALL,
      skip() {
        return !!this.search.tags.length;
      }
    },
    findTagByID: {
      query: gql`
        query($tagId: ID!) {
          findTagByID(id: $tagId) {
            terms {
              data {
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
          }
        }
      `,
      variables() {
        return {
          tagId: this.search.tags[0]
        };
      },
      skip() {
        return !this.search.tags.length;
      }
    }
  }
});
</script>
