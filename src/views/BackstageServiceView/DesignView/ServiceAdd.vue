<script setup lang="tsx">
import { reactive, ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'

import ImageUIDesign from '../../../components/UIPageDesign/ImageUI.vue'
import ImageAttributeDesign from '../../../components/BackstageDesign/ImageAttributeDesign.vue'

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
  props?: object
  children?: object
}
const moddelDatas = ref([
  {
    name: '图片',
    type: TYPE_MODEL.IMAGE,
    icon: 'file-excel',
    group: 'A',
    // com: markRaw(ImageAttributeDesign),
  },
  {
    name: '文本',
    type: TYPE_MODEL.TEXT,
    icon: 'call',
    group: 'A',
    // com: markRaw(TextAttributeDesign),
  },
  {
    name: '输入框',
    type: TYPE_MODEL.INPUT,
    icon: 'chat',
    group: 'A',
    // com: markRaw(InputAttributeDesign),
  },
  { name: '按钮', type: TYPE_MODEL.BUTTON, icon: 'filter', group: 'A' },
  { name: '头像', type: TYPE_MODEL.AVATOR, icon: 'file-excel', group: 'A' },
])
const dragDatas = ref<DrageItem[]>([
  // { name: "头像", type: TYPE_MODEL.AVATOR, icon: "file-excel", group: 'A' },
])

const currentIndex = ref<number>(-1)

const currCompontent = ref<any>('')

const state = reactive({
  message: 'A组只能往B组拖到一个元素',
  groupA: { name: 'itxst', pull: 'clone', put: false },
  groupB: 'itxst',
})
// 设置属性区域
function chooseSetAttribute(event: object, element: object, index: number) {
  console.log('设置属性区域', event, index, element, dragDatas.value)
  const dragDatasTarget = dragDatas.value[index]
  // 防止数据更新缓慢，加一重验证
  if (dragDatasTarget.id !== element.id)
    return
  currentIndex.value = index
  currCompontent.value = ImageAttributeDesign
}
// 映射组件
function pairUiDesignCom(type: number) {
  let com: any
  switch (type) {
    case TYPE_MODEL.IMAGE:
      com = ImageUIDesign
      break

    default:
      com = 'None'
      break
  }
  return com
}
// 创建模型
function cloneHandler(e: any) {
  const id = createId()
  const targetObject = cloneDeep(e)
  const { type } = targetObject
  let componentSetting = {}
  console.warn('cloneHandler', e, targetObject, type)
  const uiDesignCom = pairUiDesignCom(type) !== 'None' ? pairUiDesignCom(type) : ''
  let independentAttribute = {}
  let labelName = ''
  switch (type) {
    case TYPE_MODEL.TEXT:
      break
    case TYPE_MODEL.INPUT:
      break
    case TYPE_MODEL.IMAGE:
      labelName = '图片'
      independentAttribute = {
        width: '120px',
        height: '120px',
        url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
        fit: 'cover',
      }
      break
    case TYPE_MODEL.BUTTON:
      break
    case TYPE_MODEL.AVATOR:
      break
    default:
      break
  }
  componentSetting = {
    ...targetObject,
    props: { ...independentAttribute, labelName },
    id,
    name: '',
    uiDesignCom,
    children: [],
  }
  // 首次预先进入属性编辑区域
  if (currentIndex.value === -1) {
    currentIndex.value = 0
    currCompontent.value = ImageAttributeDesign
  }
  console.log('componentSetting', componentSetting)
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
        <t-list class="dragDatasShowArea">
          <draggable
            :list="dragDatas"
            ghost-class="ghost"
            :group="state.groupB"
            class="showArea"
            :sort="true"
          >
            <template #item="{ element, index }">
              <div
                v-if="element.uiDesignCom && element.uiDesignCom !== ''"
                :class="index === currentIndex ? 'item actived' : 'item'"
                @click="chooseSetAttribute($event, element, index)"
              >
                <div class="component-top-tools">
                  <label class="type-name">{{ element.props.labelName }}</label>
                  <t-button size="small" variant="text">删除</t-button>
                </div>
                
                <div class="component-nodes">
                  <Transition name="fade" mode="out-in" appear>
                    <component
                      :is="element.uiDesignCom"
                      :independent="element.props"
                    />
                  </Transition>
                </div>
              </div>
            </template>
          </draggable>
        </t-list>
        <t-back-top
          container=".dragDatasShowArea"
          :visible-height="0"
          class="back-top"
        />
      </t-content>
    </t-layout>

    <t-aside class="rightAside">
      <t-divider align="left" theme="vertical">
        属性编辑区
      </t-divider>
      <keep-alive>
        <div v-if="currentIndex > -1">
          <component
            :is="currCompontent"
            :independent="dragDatas[currentIndex].props"
          />
        </div>
      </keep-alive>
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
  .leftAside{
    width: 200px;
    height: 100%;
    padding: 0 24px 24px 24px;
  }
  .rightAside {
    width: 300px;
    height: 100%;
    padding: 0 24px 24px 24px;
  }
  .contentArea {
    flex: 1;
    min-width: 0;
    height: 100vh;
    margin: 0 20px;
    background-color: #fff;
    padding: 0;
    position: relative;
    .group {
      height: 100%;
      .uiDesignView {
        height: 100%;
      }
    }
    .dragDatasShowArea {
      width: 100%;
      height: calc(100% - 126px);
      overflow-y: scroll;
      overflow-x: hidden;
      .t-list__inner {
        height: 100%;
        .showArea {
          text-align: left;
          width: 100%;
          height: 100%;
          .item {
            cursor: pointer;
            padding: 12px 12px 2px;
            &.actived {
              background-color: #f5f5f5;
            }
            .component-top-tools {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .type-name {
                margin-bottom: 12px;
                display: inline-block;
              }
            }
            .component-nodes {
              padding-bottom: 12px;
              margin-bottom: 6px;
              border-bottom: 1px solid #f5f5f5;
            }
          }
        }
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
        border-radius: 4px;
        &:hover {
          background-color: var(--td-brand-color-7);
          span, label {
            color: #fff !important;
          }
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
    .t-form__label--top {
      text-align: left;
    }
  }
}
</style>
