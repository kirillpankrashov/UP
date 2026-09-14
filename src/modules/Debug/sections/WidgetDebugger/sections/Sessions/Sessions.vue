<template>
  <div
    data-name="debug-sessions"
  >
    <div class="mb-2">
      <ElButton
        size="small"
        type="primary"
        :loading="pending"
        :disabled="!widget?.enabled"
        @click="refreshSessions"
      >
        <span class="_text-s-bold">Refresh</span>
      </ElButton>
    </div>
    <ElTable
      :data="sessions"
      size="small"
      class="_text-s-regular"
      row-key="uuid"
    >
      <ElTableColumn
        label="UUID"
        prop="uuid"
        min-width="180"
      >
        <template #default="{ row }">
          <span class="font-semibold">
            {{ row.uuid }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        label="Fingerprint"
        prop="fingerprint"
        min-width="180"
      />
      <ElTableColumn
        label="Location"
        prop="location"
        min-width="120"
      />
      <ElTableColumn
        label="Browser"
        prop="browser"
        width="100"
      />
      <ElTableColumn
        label="OBS"
        width="60"
      >
        <template #default="{ row }">
          <span
            :class="{
              'text-success': row.isObs,
              'text-gray': !row.isObs,
            }"
          >
            {{ row.isObs ? 'Yes' : 'No' }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        label="Device"
        prop="device"
        min-width="100"
      />
      <ElTableColumn
        label=""
        width="60"
        align="center"
      >
        <template #default="{ row }">
          <ElButton
            size="small"
            type="danger"
            link
            @click="deleteSession(row.uuid)"
          >
            Delete
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PusherDebuggerEventName } from '@/core/types'
import { Logger, wait } from '@/core/helpers'
import { ElButton, ElTable, ElTableColumn } from '@/components/element-plus'
import type { IDebugWidget, ISession } from '@/modules/Debug/types'

const props = defineProps<{
  sessions: ISession[]
  logger?: { handleEvent: (event: any, payload: any) => void } | null
  privateChannel?: { whisper: (eventName: string, data: any) => unknown } | null
  widget?: IDebugWidget | null
}>()

const emit = defineEmits<{
  (e: 'clear-sessions'): void
  (e: 'delete-session', uuid: string): void
  (e: 'update:sessions', value: ISession[]): void
}>()

const pending = ref(false)

const refreshSessions = async () => {
	if (pending.value || !props.privateChannel) return

	try {
		pending.value = true

		emit('clear-sessions')

		props.privateChannel?.whisper(PusherDebuggerEventName.PING_SESSIONS, {})
		props.logger?.handleEvent(PusherDebuggerEventName.PING_SESSIONS, {})

		await wait(1000)
	}
	catch (error) {
		Logger.error('Error pinging sessions', true, error)
	}
	finally {
		pending.value = false
	}
}

const deleteSession = async (uuid: string) => {
	if (pending.value || !props.privateChannel) return

	try {
		pending.value = true

		emit('clear-sessions')

		props.privateChannel?.whisper(PusherDebuggerEventName.DELETE_SESSION, { uuid })
		props.logger?.handleEvent(PusherDebuggerEventName.DELETE_SESSION, { uuid })

		await wait(1000)
	}
	catch (error) {
		Logger.error('Error pinging sessions', true, error)
	}
	finally {
		pending.value = false
	}
}
</script>
