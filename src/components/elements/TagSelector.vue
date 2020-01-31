<template>
  <label>
    {{ label }}
    <v-select v-model="localValue" :options="options" multiple taggable>
      <template
        v-slot:selected-option-container="{ option: { label, id }, deselect }"
      >
        <div>
          <Tag :id="id" :title="label" />
          <button type="button" @click="deselect(label)">X</button>
        </div>
      </template>
    </v-select>
  </label>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Tag from "@/components/elements/Tag.vue";
import vSelect from "vue-select";

interface Tag {
  title: string;
  _id: string;
}

interface TagSelectorOption {
  id: string;
  label: string;
}

export default Vue.extend({
  components: {
    vSelect,
    Tag
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Array
    } as PropOptions<Tag[]>,
    allTags: {
      type: Array,
      required: true
    } as PropOptions<Tag[]>
  },
  computed: {
    options(): TagSelectorOption[] {
      return this.allTags.map(({ title, _id }) => ({
        label: title,
        id: _id
      }));
    },
    localValue: {
      get(): TagSelectorOption[] {
        return this.value.map(({ _id, title }) => ({
          id: _id,
          label: title
        }));
      },
      set(val: TagSelectorOption[]) {
        const tags = val.map(({ id, label }) => ({
          _id: id,
          title: label
        })) as Tag[];
        this.$emit("input", tags);
      }
    }
  }
});
</script>

<style lang="scss">
$vs-selected-bg: red;
// $vs-selected-border-color: grey;
// $vs-selected-border-style: solid;
$vs-selected-border-width: 0;
@import "vue-select/src/scss/vue-select.scss";

.vs__dropdown-toggle {
  /* TODO: Same as .text-input , hmmmm..... */
  @apply bg-white border border-gray-300 rounded-lg py-2 px-4 flex w-full appearance-none leading-normal;
}
</style>
