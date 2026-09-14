<template>
  <div v-if="model.quiz">
    <div class="grid w-full grid-cols-2">
      <div classs="h-full overflow-auto">
        <Codemirror
          v-model="model.quiz.styles"
          :extensions="[css()]"
        />
      </div>
      <div class="flex justify-center bg-primary-50 p-8">
        <div class="h-full w-[360px]">
          <div class="sticky top-4 rounded-lg bg-white p-6 text-black shadow-lg">
            <QuizInstance :quiz="model.quiz" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '@codemirror/lang-css'

import { Codemirror } from 'vue-codemirror'

import type { IQuiz } from '@/core/types'
import { QuizInstance } from '@/components'

const model = defineModel<{
	quiz: IQuiz | undefined
}>({ required: true })
</script>
