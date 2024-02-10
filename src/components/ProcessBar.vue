<template>
  <div class="flex flex-row gap-[2px]">
    <div
      v-for="(question, index) in data"
      :key="index"
      :class="`${
        selected >= index ? 'bg-dark-gray' : 'bg-white'
      } w-[45.15px] h-[9px] rounded`"
    ></div>
    <div
      :class="`${
        selected >= data.length ? 'bg-dark-gray' : 'bg-white'
      } w-[45.15px] h-[9px] rounded`"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Choice {
  title: string;
  active: boolean;
  point: number;
}

interface Question {
  id: string;
  title: string;
  choice: Choice[];
}

export default defineComponent({
  name: "ProcessBar",
  props: {
    data: {
      type: Array as () => Question[],
      required: true,
      default: () => []
    },
    selected: {
      type: Number,
      required: true,
      default: 0
    }
  }
});
</script>
