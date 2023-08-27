import { defineStore } from 'pinia'
import cat from '@/assets/data/categories.json'
import { useConfigGlobal } from '~/stores/getConfigGlobal'

export const useGetArticle = defineStore({
  id: 'getArticle',
  state: () => ({
    article: [],
    sousCategorieSelection: [],
    categorie: [],
    searchByCat: [],
    lastArticle: [],
    randomArticle: [],
    articleSearch: [],
    searchValue: '',
    isLoaded: false,
    firstLoaded: false,
    accueil: {
      cat2: [],
      cat1: []
    }
  }),
  actions: {
    // Rècupère les 5 deriers articles
    grabLastArticle () {
      this.lastArticle = this.article.sort((articleA, articleB) => {
        const dateA = new Date(articleA.date)
        const dateB = new Date(articleB.date)
        return dateB - dateA // Trie les dates dans l'ordre décroissant
      }).slice(0, 8)
    },
    grabJSONFile () {
      this.categorie = cat.mainCategories
    },
    // Les catégories selectionnées par l'utilisateur
    categorieSelect (value, checked, color) {
      if (checked) {
        this.sousCategorieSelection.push({ value, color })
      } else {
        this.sousCategorieSelection = this.sousCategorieSelection.filter(items => items.value !== value)
      }
    },
    // Display  les articles en fonction des catégories selectionnées // Recherche par catégories
    async articleByCategorie  (categorie) {
      let valueSelectSousCat = []
      if (typeof categorie === 'object') {
        valueSelectSousCat = categorie.map(el => el.value)
      } else if (typeof categorie === 'string') {
        valueSelectSousCat = categorie.split(', ')
      } else {
        valueSelectSousCat.push(categorie)
      }
      const allPosts = await queryContent('/').find()
      this.searchByCat = allPosts.filter((post) => {
        return valueSelectSousCat.some(cat => post.categories.includes(cat))
      }).sort((a, b) => {
        const aMatchCount = valueSelectSousCat.filter(cat => a.categories.includes(cat)).length
        const bMatchCount = valueSelectSousCat.filter(cat => b.categories.includes(cat)).length
        return bMatchCount - aMatchCount
      })
    },
    async searchArticleInput (searchQuery) {
      this.searchValue = searchQuery
      this.articleSearch = await queryContent('/')
        .where({ title: { $contains: this.searchValue } })
        .find()
    },
    async pageAccueil () {
      this.article = await queryContent('/')
        .find()
      // Selection des articles pour la catégorie
      const storeConfig = useConfigGlobal()
      this.accueil.cat1 = this.article.filter((post) => {
        return post.categories.split(',')[0].includes(storeConfig.config.pages.choix_categorie_accueil.categorie_1)
      })
      // Selection des articles pour la catégorie
      this.accueil.cat2 = this.article.filter((post) => {
        return post.categories.split(',')[0].includes(storeConfig.config.pages.choix_categorie_accueil.categorie_2)
      })
      // Selection des articles display au hasard en ommetant des articles déjà sur la page principale pour le SEO
      if (this.randomArticle.length === 0) {
        const excludedIds = [...this.accueil.cat2, ...this.accueil.cat1, ...this.lastArticle].map(article => article.id)
        const availableArticles = this.article.filter(article => !excludedIds.includes(article.id))
        const randomArticleTemp = availableArticles.sort(() => 0.5 - Math.random())
        this.randomArticle = randomArticleTemp
      }
    }
  },
  getters: {
  }
})
