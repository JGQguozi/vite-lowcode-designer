<script setup lang="tsx">
import { markRaw, reactive, ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'
import TextAttributeDesign from '../../../components/TextAttributeDesign.vue'
import InputAttributeDesign from '../../../components/InputAttributeDesign.vue'
import ImageAttributeDesign from '../../../components/ImageAttributeDesign.vue'

// 导入draggable组件

enum TYPE_MODEL {
  'TEXT' = 1,
  'INPUT' = 2,
  'BUTTON' = 3,
  'AVATOR' = 4,
  'IMAGE' = 5,
}
interface DrageItem {
  name: string
  type: number
  icon: string
  group: string
  id?: string
  labelName?: string
}
const moddelDatas = ref([
  {
    name: '文本',
    type: TYPE_MODEL.TEXT,
    icon: 'call',
    group: 'A',
    com: markRaw(TextAttributeDesign),
  },
  {
    name: '输入框',
    type: TYPE_MODEL.INPUT,
    icon: 'chat',
    group: 'A',
    com: markRaw(InputAttributeDesign),
  },
  { name: '按钮', type: TYPE_MODEL.BUTTON, icon: 'filter', group: 'A' },
  { name: '头像', type: TYPE_MODEL.AVATOR, icon: 'file-excel', group: 'A' },
  {
    name: '图片',
    type: TYPE_MODEL.IMAGE,
    icon: 'file-excel',
    group: 'A',
    com: markRaw(ImageAttributeDesign),
  },
])
const dragDatas = ref<DrageItem[]>([
  // { name: "头像", type: TYPE_MODEL.AVATOR, icon: "file-excel", group: 'A' },
])
const currentIndex = ref<number>(0)
const currentComponent = reactive({
  com: moddelDatas.value[0].com,
})
const state = reactive({
  message: 'A组只能往B组拖到一个元素',
  groupA: { name: 'itxst', pull: 'clone', put: false },
  groupB: 'itxst',
})

function cloneHandler(e: any) {
  console.warn('cloneHandler', e)
  const id = createId()
  const targetObject = cloneDeep(e)
  const { type } = targetObject
  let componentSetting = {}

  switch (type) {
    case TYPE_MODEL.TEXT:
    case TYPE_MODEL.INPUT:
      componentSetting = {
        ...targetObject,
        id,
        labelName: '',
      }
      break
    case TYPE_MODEL.BUTTON:
      break
    case TYPE_MODEL.AVATOR:
      break
    default:
      break
  }

  return componentSetting
}

// 拖拽开始的事件
function onStart() {
  console.log('开始拖拽')
}

// 拖拽结束的事件
function onEnd(e) {
  console.log('结束拖拽', e)
  const { newDraggableIndex } = e

  // createModelNode(_.cloneDeep(moddelDatas), newDraggableIndex);
}

function onMove(e, originalEvent) {
  // 不允许停靠
  if (e.relatedContext.element.disabledPark == true)
    return false

  return true
}

function dragItem(e) {
  console.log('右边获取start', e)
}

function addItem(e) {
  console.log('右边添加组件', e)
}
const input = ref('有默认值')
function onEnter() {
  console.log('trigger enter')
}
function onChange(val) {
  console.log(val)
}
// 生成唯一id
function createId() {
  const valueFun = () => Math.random().toString(16).slice(2)
  if (typeof valueFun() != 'string')
    return '1122334455'
  return valueFun()
}
// 创建模型
function createModelNode(e: any) {
  const id = createId()
  const targetObject = cloneDeep(e)
  const { type } = targetObject

  switch (type) {
    case TYPE_MODEL.TEXT:
    case TYPE_MODEL.INPUT:
      dragDatas.value.push({
        ...targetObject,
        id,
        labelName: '',
      })
      break
    case TYPE_MODEL.BUTTON:
      break
    case TYPE_MODEL.AVATOR:
      break
    default:
      break
  }
}
</script>

<template>
  <t-layout class="layoutArea">
    <t-aside class="leftAside">
      <t-divider align="left" theme="vertical">
        本地控件区域
      </t-divider>
      <!-- <div class="msg">{{ state.message }}</div> -->
      <div class="itxst">
        <div class="group">
          <draggable
            :list="moddelDatas"
            ghost-class="ghost"
            :force-fallback="true"
            :group="state.groupA"
            :sort="false"
            :clone="cloneHandler"
          >
            <template #item="{ element }">
              <div class="item move">
                <label class="move"><t-icon :name="element.icon" /></label>
                <span v-html="element.name" />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </t-aside>
    <t-layout class="contentArea">
      <t-divider align="left" theme="vertical">
        UI 设计区域
      </t-divider>
      <t-content>
        <div class="dragDatasShowArea">
          <draggable
            :list="dragDatas"
            ghost-class="ghost"
            :group="state.groupB"
            class="showArea"
          >
            <template #item="{ element }">
              <div class="item move">
                <label class="type-name">组件类型：{{ element.name }}</label>
                <t-space direction="vertical" break-line>
                  <div v-if="element.type === TYPE_MODEL.TEXT" class="text">
                    {{ element.labelName }}
                  </div>
                  <t-input
                    v-if="element.type === TYPE_MODEL.INPUT"
                    v-moodel="input"
                    placeholder="请输入内容（有默认值）"
                    @enter="onEnter"
                    @change="onChange"
                  />
                </t-space>
              </div>
            </template>
          </draggable>
        </div>
      </t-content>
    </t-layout>

    <t-aside class="rightAside">
      <t-divider align="left" theme="vertical">
        属性编辑区
      </t-divider>
      <keep-alive>
        <component :is="currentComponent" />
      </keep-alive>
      <!-- <t-form labelAlign="top" requiredMark colon submitWithWarningMessage>
        <t-form-item label="名称" name="name" initial-data="TDesign">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="提示内容" name="tel" initial-data="123456">
          <t-input placeholder="请输入内容" />
        </t-form-item>
        <t-form-item label="默认值与否" name="course" initial-data="['1']">
          <t-checkbox-group>
            <t-checkbox value="1">是</t-checkbox>
            <t-checkbox value="2">否</t-checkbox>
          </t-checkbox-group>
        </t-form-item>
      </t-form> -->
    </t-aside>
  </t-layout>
</template>

<style lang="scss">
.t-layout {
  height: 100%;
}
.layoutArea {
  display: flex;
  height: 100%;
  .leftAside,
  .rightAside {
    width: 300px;
    height: 100%;
    padding: 0 24px 24px 24px;
  }
  .contentArea {
    flex: 1;
    min-width: 0;
    height: 100%;
    margin: 0 20px;
    background-color: #fff;
    padding: 0 24px 24px 24px;
    .group {
      height: 100%;
      .uiDesignView {
        height: 100%;
      }
    }
    .dragDatasShowArea {
      width: 100%;
      height: 100%;
      .showArea {
        text-align: left;
        width: 100%;
        height: 100%;
      }
    }
  }
  .leftAside {
    .msg {
      padding: 10px 20px 0px 20px;
    }
    .itxst {
      background-color: #fff;
      display: flex;
      padding: 0 20px;
    }

    .group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: center;
      width: 100%;
      .item {
        border: solid 1px #ddd;
        padding: 0px;
        text-align: left;
        background-color: #fff;
        margin-bottom: 10px;
        display: flex;
        height: 36px;
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: var(--td-brand-color-7);
          color: #fff !important;
        }
        label {
          padding: 6px 10px;
          color: #333;
        }
        span {
          padding: 6px 10px;
          color: #666;
        }
      }
    }

    .ghost {
      border: solid 1px rgb(19, 41, 239) !important;
    }
    .chosenClass {
      opacity: 1;
      border: solid 1px red;
    }
    .fallbackClass {
      background-color: aquamarine;
    }
  }
  .rightAside {
  }
}
</style>
