<script lang="ts">
export default {
  name: 'ImageUIDesign',
}
</script>

<script lang="ts" setup>
const props = defineProps(['independent'])

console.log('props', props)
</script>

<template>
  <div class="imageAreaDesign">
    <t-row :gutter="16">
      <t-col :span="16">
        <t-image
          :src="props.independent.url"
          :fit="props.independent.fit"
          :style="{
            width: props.independent.width,
            height: props.independent.height,
          }"
        />
      </t-col>
    </t-row>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
