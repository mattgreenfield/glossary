<template>
  <ol class="reset-list" type="A">
    <li v-for="(letter, key) in sortedList" :key="key" class="letter-group">
      <div class="letter">{{ key }}</div>
      <ol class="reset-list">
        <li v-for="term in sortedList[key]" :key="term.term">
          <Term
            :term="term.term"
            :abbreviation="term.abbreviation"
            :description="term.description"
            :tags="term.tags"
          />
        </li>
      </ol>
    </li>
  </ol>
</template>

<script>
import Term from "./Term";
import TERMS_ALL from "../graphql/TermsAll.gql";

export default {
  name: "Terms",
  components: {
    Term
  },
  props: {
    search: {
      type: Object
    }
  },
  computed: {
    sortedList() {
      if (!this.getTerms) return;
      const az = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];

      return az.reduce((acc, letter) => {
        const terms = this.getTerms.data.filter(
          ({ term }) => term.charAt(0).toLowerCase() === letter
        );

        if (terms.length) {
          acc[letter] = terms;
        }

        return acc;
      }, {});
    }
  },
  apollo: {
    getTerms: {
      query: TERMS_ALL,
      variables() {
        return {
          search: this.search.text,
          tags: this.search.tags
        };
      }
    }
  }
};
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
