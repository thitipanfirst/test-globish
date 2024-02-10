<template>
  <div class="flex h-screen">
    <div
      v-if="!setStartQuiz"
      class="flex max-w-[720px] text-center mx-auto w-[393px] h-4/5 my-auto"
    >
      <div
        class="flex bg-cover bg-no-repeat w-full h-full"
        :style="{ backgroundImage: `url(${imageFirstPage})` }"
      >
        <div
          class="mx-auto mt-auto mb-[84px] leading-[33px] text-[20px] font-[500] bg-secondary-yellow border border-black rounded-[20px] w-[316px] text-center py-1 cursor-pointer"
          @click="setStartQuiz = true"
        >
          เริ่มเลย
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col max-w-[720px] text-center mx-auto w-[393px] h-[852px] my-auto"
    >
      <div v-if="!showResult" class="mt-[114px] mx-auto">
        <ProcessBar :data="data" :selected="selected" />
      </div>

      <div class="mt-[37px] mx-auto">
        <CardQuestion
          v-if="!showResult"
          :data="data"
          :selected="selected"
          :feedback="feedback"
          :textFeedback="textInput"
          @choice-selected="handleChoiceSelection"
          @feedback-selected="handleFeedbackSelection"
          @text-feedback="handleTextFeedbackSelection"
        />
        <CardResult v-else :feedback="textFeedBack" :point="totalPoint" />
      </div>

      <div
        v-if="!showResult"
        :class="`${
          selected < data.length ? 'mt-[82px]' : 'mt-[40px]'
        } flex flex-row gap-5 mx-auto`"
      >
        <div
          class="w-[96px] h-[40px] p-1 text-center bg-light border border-black text-[20px] font-medium leading-[33px] rounded-[20px] cursor-pointer"
          @click="back()"
          @mousedown="disableDoubleClick"
          @copy="preventCopy"
        >
          กลับ
        </div>
        <div
          v-if="selected < data.length"
          class="w-[199px] h-[40px] p-1 text-center bg-secondary-yellow border border-black text-[20px] font-medium leading-[33px] rounded-[20px] cursor-pointer"
          @click="next()"
          @mousedown="disableDoubleClick"
          @copy="preventCopy"
        >
          ต่อไป
        </div>
        <div
          v-else
          class="w-[199px] h-[40px] p-1 text-center bg-secondary-yellow border border-black text-[20px] font-medium leading-[33px] rounded-[20px] cursor-pointer"
          @click="getResult()"
          @mousedown="disableDoubleClick"
          @copy="preventCopy"
        >
          ดูผลลัพธ์
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProcessBar from "@/components/ProcessBar.vue";
import store from "../store/index";
import QuestionData from "../data/Question.json";
import CardQuestion from "@/components/CardQuestion.vue";
import CardResult from "@/components/CardResult.vue";

interface PersonalityTestData {
  imageFirstPage: string;
  pageTitle: string;
  selected: number;
  data: Question[];
  feedback: ChoiceFeedBack[];
  textInput: string;
  textFeedBack: string;
  totalPoint: number;
  showResult: boolean;
}

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

interface ChoiceFeedBack {
  title: string;
  active: boolean;
}

export default defineComponent({
  name: "PersonalityTest",
  components: {
    ProcessBar,
    CardQuestion,
    CardResult
  },
  data(): PersonalityTestData {
    return {
      imageFirstPage: require("@/assets/first-page.png"),
      pageTitle: "Welcome to my page",
      data: [],
      selected: 0,
      feedback: [
        {
          title: "Instagram",
          active: false
        },
        {
          title: "Facebook",
          active: false
        },
        {
          title: "อื่นๆ (โปรดระบุ)",
          active: false
        }
      ],
      textInput: "",
      textFeedBack: "",
      totalPoint: 0,
      showResult: false
    };
  },
  computed: {
    setStartQuiz: {
      get() {
        return store.state.startQuiz;
      },
      set(val: boolean) {
        store.dispatch("setStartQuiz", val);
      }
    },
    activeFeedbacks(): string {
      return this.feedback
        .filter((item, index) => item.active && index < 2)
        .map((item) => item.title)
        .join(", ");
    }
  },
  mounted() {
    this.data = [...QuestionData];
  },
  watch: {},
  methods: {
    next() {
      if (this.selected < this.data.length) {
        this.selected = this.selected + 1;
      }
    },
    back() {
      if (this.selected > 0) {
        this.selected = this.selected - 1;
      } else if (this.selected === 0) {
        this.setStartQuiz = false;
      }
    },
    getResult() {
      const hasActiveChoice = this.data.every((question) => {
        return question.choice.some((choice) => choice.active);
      });

      if (hasActiveChoice) {
        let point = 0;
        this.data.forEach((question) => {
          question.choice.forEach((choice) => {
            if (choice.active) {
              point += choice.point;
            }
          });
        });

        this.totalPoint = point;
        this.showResult = true;
      }

      this.textFeedBack =
        this.textInput !== ""
          ? this.activeFeedbacks + ", " + this.textInput
          : this.activeFeedbacks;
    },
    disableDoubleClick(event: { detail: number; preventDefault: () => void }) {
      if (event.detail > 1) {
        event.preventDefault();
      }
    },
    preventCopy(event: { preventDefault: () => void }) {
      event.preventDefault();
    },
    handleChoiceSelection(index: number) {
      this.data[this.selected].choice.forEach((choice) => {
        choice.active = false;
      });
      this.data[this.selected].choice[index].active = true;
    },
    handleFeedbackSelection(index: number) {
      this.feedback[index].active = !this.feedback[index].active;
    },
    handleTextFeedbackSelection(value: string) {
      this.textInput = value;
    }
  }
});
</script>
