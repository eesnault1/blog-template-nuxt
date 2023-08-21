import { defineStore } from 'pinia'

export const useConfigGlobal = defineStore({
  id: 'getconfig',
  state: () => ({
    config: null
  }),
  actions: {
    async grabJSONFile () {
      const response = await fetch('/globalTemplateConfig.JSON')
      this.config = await response.json()
    }
  },
  getters: {
  }
})
