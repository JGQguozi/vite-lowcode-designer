<script lang="ts">
export default {
  name: "ImageAttributeDesign",
};
</script>

<script lang="ts" setup>
const props = defineProps(["independent"]);

console.log("props", props);
</script>

<template>
  <t-form
    class="imageSettingFrom"
    label-align="top"
    required-mark
    colon
    :data="props.independent"
    submit-with-warning-message
  >
    <t-form-item label="长" name="width">
      <t-input v-model="props.independent.width" placeholder="请输入内容" />
    </t-form-item>
    <t-form-item label="宽" name="height">
      <t-input v-model="props.independent.height" placeholder="请输入内容" />
    </t-form-item>
  </t-form>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
