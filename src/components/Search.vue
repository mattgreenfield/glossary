<template>
  <section class="mb-4">
    <TextInput v-model="localValue" label="Search" class="mb-2" />
    <Tags
      v-if="allTags"
      :tags="allTags.data"
      @tagClicked="handleTagClick($event)"
      :selectedTags="localSelectedTags"
    />
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import gql from "graphql-tag";
import Tags from "@/components/Tags.vue";
import TextInput from "@/components/elements/TextInput.vue";

type tagId = string;

export default Vue.extend({
  name: "Search",
  components: {
    Tags,
    TextInput
  },
  props: {
    /**
     * The search input value
     */
    value: {
      type: String
    },
    /**
     * The tags the user wants to filter by
     */
    selectedTags: {
      type: Array
    } as PropOptions<tagId[]>
  },
  methods: {
    handleTagClick(tagId: string) {
      const existingIndex = this.localSelectedTags.findIndex(
        id => id === tagId
      );

      if (existingIndex >= 0) {
        this.localSelectedTags = [];
      } else {
        this.localSelectedTags = [tagId];
      }
    }
  },
  computed: {
    localValue: {
      get(): string {
        return this.value;
      },
      set(val: string): void {
        this.$emit("input", val);
      }
    },
    localSelectedTags: {
      get(): tagId[] {
        return this.selectedTags;
      },
      set(val: tagId[]): void {
        this.$emit("update:selectedTags", val);
      }
    }
  },
  apollo: {
    allTags: gql`
      query {
        allTags {
          data {
            title
            _id
          }
        }
      }
    `
  }
});
</script>

<style scoped></style>
