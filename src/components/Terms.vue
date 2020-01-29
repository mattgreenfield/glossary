<template>
  <ol type="A">
    {{
      search
    }}
    <li v-for="(letter, key) in sortedList" :key="key" class="letter-group">
      <div class="letter">{{ key }}</div>
      <ol>
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

      return data.reduce((acc: SortedList, term: Term) => {
        const firstLetter = term.term.charAt(0).toLowerCase();
        if (acc[firstLetter]) {
          acc[firstLetter].push(term);
        } else {
          acc[firstLetter] = [term];
        }
        return acc;
      }, {});
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

<style>
.terms-list {
}

.letter-group {
  display: flex;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 16px;
}

.letter {
  font-size: 2em;
  line-height: 1;
  text-transform: capitalize;
  font-weight: bold;
}
</style>
