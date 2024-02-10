<template>
  <PersonalityTest />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PersonalityTest from "./pages/PersonalityTest.vue";

export default defineComponent({
  name: "App",
  components: {
    PersonalityTest
  }
});
</script>
