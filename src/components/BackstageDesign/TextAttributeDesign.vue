<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextAttributeDesign',
  props: {
    msg: String,
  },
})
</script>

<template>
  <div class="textAreaDesign">
    文本属性设计器
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
