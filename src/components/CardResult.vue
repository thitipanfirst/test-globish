<template>
  <div
    class="flex flex-col w-[375px] h-[644px] bg-white border border-black rounded-[20px]"
  >
    <p
      class="text-dark-gray font-bold leading-[59.4px] text-[36px] mt-[40px] mx-auto"
    >
      ผลลัพธ์ของคุณคือ
    </p>
    <div
      v-if="point >= 131 && point <= 180"
      class="mt-5 w-full h-[350px] bg-cover"
      :style="{ backgroundImage: `url(${imageGradualLearner})` }"
    ></div>
    <div
      v-if="point >= 91 && point <= 130"
      class="mt-5 w-full h-[350px] bg-cover"
      :style="{ backgroundImage: `url(${imageEnthusiastic})` }"
    ></div>
    <div
      v-if="point >= 60 && point <= 90"
      class="mt-5 w-full h-[350px] bg-cover"
      :style="{ backgroundImage: `url(${imageHobbyist})` }"
    ></div>
    <p class="mt-[53px] font-bold text-[20px] leading-[33px]">
      คุณรู้จัก Globish ผ่าน
    </p>
    <p class="font-bold text-[20px] leading-[33px]">
      {{ feedback }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface CardResult {
  imageEnthusiastic: string;
  imageGradualLearner: string;
  imageHobbyist: string;
}

export default defineComponent({
  name: "CardResult",
  props: {
    point: {
      type: Number,
      required: true,
      default: 0
    },
    feedback: {
      type: String,
      required: true,
      default: ""
    }
  },
  data(): CardResult {
    return {
      imageEnthusiastic: require("@/assets/result/enthusiastic.png"),
      imageGradualLearner: require("@/assets/result/graduallearner.png"),
      imageHobbyist: require("@/assets/result/hobbyist.png")
    };
  }
});
</script>
