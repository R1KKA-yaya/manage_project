<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { ref, shallowRef, onBeforeUnmount, defineEmits, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const emits = defineEmits(['content-change'])

// 编辑器实例（必须 shallowRef）
const editorRef = shallowRef(null)

// 编辑器内容
const valueHtml = ref('')

// 编辑器配置
const mode = ref('default')
const toolbarConfig = ref({})
const editorConfig = ref({
  placeholder: '请输入内容...',
  MENU_CONF: {}  // 可添加更多配置
})

// 销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  editor?.destroy()
})

// 创建回调
const handleCreated = editor => {
  editorRef.value = editor
}

// 然后在 watch 或 editor.on 中触发事件
watch(valueHtml, (newVal) => {
  emits('content-change', newVal)
})
</script>

<template>
  <div class="editor-container">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style scoped>
.editor-container {
  border: 1px solid #ccc;
}
.editor-container :deep(.w-e-bar) {
  border-bottom: 1px solid #ccc;
}
.editor-container :deep(.w-e-text-container) {
  height: 500px;
}
</style>