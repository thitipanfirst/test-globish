<template>
  <div>
    <div
      v-if="selected < data.length"
      class="flex flex-col w-[316px] h-[478px] bg-white border border-black rounded-[20px]"
    >
      <div
        class="text-gray font-normal text-[32px] leading-[63.44px] ml-6 mt-5 mr-10 text-start"
        style="font-family: 'Gloria Hallelujah'"
      >
        {{ data[selected].id }}
      </div>
      <div
        class="font-bold leading-[26.4px] text-black ml-6 mr-10 text-start h-[52px]"
      >
        {{ data[selected].title }}
      </div>
      <div class="flex flex-col gap-4 mt-[22px]">
        <div
          v-for="(choice, index) in data[selected].choice"
          :key="index"
          :class="`${
            choice.active
              ? 'bg-orange border-black'
              : 'border-[#D9D9D9] bg-white'
          } w-[270px] h-[72.13px] border rounded-[20px] flex mx-auto cursor-pointer`"
          @click="active(index)"
        >
          <p
            class="ml-[26px] my-auto text-start leading-[26.4px] text-[16px] font-medium text-dark"
          >
            {{ choice.title }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col w-[316px] h-[536px] bg-white border border-black rounded-[20px]"
    >
      <div
        class="text-gray font-normal text-[32px] leading-[63.44px] ml-6 mt-5 mr-10 text-start"
        style="font-family: 'Gloria Hallelujah'"
      >
        {{ "Q" + (data.length + 1) }}
      </div>
      <div
        class="font-bold leading-[26.4px] text-black ml-6 mr-10 text-start h-[52px]"
      >
        คุณรู้จัก Globish ผ่านช่องทางใด(เลือกได้มากกว่า 1 ข้อ)
      </div>
      <div class="flex flex-col gap-4 mt-[22px]">
        <div
          v-for="(choice, index) in feedback"
          :key="index"
          :class="`${
            choice.active
              ? 'bg-orange border-black'
              : 'border-[#D9D9D9] bg-white'
          } w-[270px] h-[72.13px] border rounded-[20px] flex mx-auto  cursor-pointer`"
          @click="activeCheckBox(index)"
        >
          <p
            class="ml-[26px] my-auto text-start leading-[26.4px] text-[16px] font-medium text-dark"
          >
            {{ choice.title }}
          </p>
        </div>
      </div>
      <div v-if="feedback[2].active" class="">
        <input
          class="focus:outline-none border-b border-black w-[259px] mx-auto mt-6 text-gray leading-[26.4px] text-[16px] font-medium"
          type="text"
          :value="textFeedback"
          @change="updateInput"
          placeholder=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Choice {
  title: string;
  active: boolean;
  point: number;
}

interface ChoiceFeedBack {
  title: string;
  active: boolean;
}

interface Question {
  id: string;
  title: string;
  choice: Choice[];
}

interface CardQuestion {
  textInput: string;
}

export default defineComponent({
  name: "CardQuestion",
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
    },
    feedback: {
      type: Array as () => ChoiceFeedBack[],
      required: true,
      default: () => []
    },
    textFeedback: {
      type: String,
      required: true,
      default: ""
    }
  },
  data(): CardQuestion {
    return {
      textInput: ""
    };
  },
  methods: {
    active(index: number) {
      this.$emit("choice-selected", index);
    },
    activeCheckBox(index: number) {
      this.$emit("feedback-selected", index);
    },
    updateInput(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.$emit("text-feedback", value);
    }
  }
});
</script>
