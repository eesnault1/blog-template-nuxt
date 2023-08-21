import { defineStore } from 'pinia'

export const useGoogleAddsense = defineStore({
  id: 'GoogleAddsense',
  state: () => ({
    displayPub: false
  }),
  actions: {
    displayPubFonction () {
      if (localStorage.getItem('adsenseConsent') === 'Oui') {
        this.displayPub = true
      } else {
        this.displayPub = false
      }
    }
  },
  getters: {
  }
})
