<template>
  <div>
    <div class="main-article">
      <div class="article-container">
        <!--  Front-Matter  -->
        <div class="front-container">
          <h1>{{ data.title }}</h1>
          <div class="front-container__cat">
            <span v-for="cat in data.categories.split(',')" :key="cat">
              {{ cat }}
            </span>
          </div>
          <span class="front-container_date">{{ data.date.split("T")[0] }}</span>
          <nuxt-img
            v-if="storeArticle.isLoaded"
            :src="data.img"
            :alt="data.description"
            class="front-container__img"
            provider="vercel"
            width="100%"
            height="300"
            loading="eager"
            quality="80"
          />
        </div>
        <div class="table-mobile">
          <TableDesMatieres :data="data" :active-toc-id="activeTocId" />
        </div>
        <!--  Article  -->
        <ContentDoc ref="nuxtContent" class="container__content" :path="pathArticle" />
        <!--  Article associé  -->
        <div v-if="listArticleAssocie.length > 0" class="article-associe-mobile">
          <h2> Articles associés : </h2>
          <CardArticleList :data="listArticleAssocie.slice(0, 4)" />
          <TheButton class="article-associe-button" @action="redirectArticle()">
            Voir tous les articles
          </TheButton>
        </div>
        <div v-if="storeConfig.config" class="container-partage">
          <h2> Partagez cet article sur les réseaux : </h2>
          <PartageReseaux :data="data" />
        </div>
        <div class="fleche" @click="scrollToTop">
          <Icon
            name="material-symbols:arrow-upward"
            class="fleche__icon"
          />
        </div>
      </div>
      <!--  Pour les articles associées et le menu de navigation sur PC  -->
      <div class="table-matiere-pc">
        <div class="table-sticky">
          <TableDesMatieres :data="data" :active-toc-id="activeTocId" />
        </div>
      </div>
    </div>
    <div v-if="listArticleAssocie.length > 0" class="article-associe-desktop">
      <h2> Articles associés : </h2>
      <CardArticleList :data="listArticleAssocie.slice(0, 4)" />
      <TheButton class="article-associe-button" @action="redirectArticle()">
        Voir tous les articles
      </TheButton>
    </div>
  </div>
</template>

<script setup>
import { useGetArticle } from '~/stores/getArticles'
import { useConfigGlobal } from '~/stores/getConfigGlobal'
const storeConfig = useConfigGlobal()
const storeArticle = useGetArticle()

const listArticleAssocie = ref([])
const { path } = useRoute()
const slug12 = path.replace('/articles/', '')

// Récupère l'article à afficher
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ slug: slug12 }).findOne()
})

const pathArticle = data._rawValue._path

if (!data._rawValue) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Marche pas'
  })
}

const redirectArticle = async () => {
  await navigateTo('/allArticle')
}

// Pour la Table des matières, permet de suivre où en est l'utilisateur dans la fenetre
const activeTocId = ref()
const nuxtContent = ref(null)

const observer = ref(null)
const observerOptions = reactive({
  root: nuxtContent.value,
  threshold: 0.5
})

// Observe le nuxt content pour que quand l'article charge, la table des matières se mettent
watch(nuxtContent, (newVal) => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')
      if (entry.isIntersecting && id != null) {
        activeTocId.value = id
      }
    })
  }, observerOptions)

  // Récupère les h2 et h3 et les passes à l'obervateur
  const contentElement = newVal.$el.parentElement
  const h2Elements = Array.from(contentElement.querySelectorAll('h2, H2'))
  const h3Elements = Array.from(contentElement.querySelectorAll('h3, H3'))
  const combinedElements = h2Elements.concat(h3Elements)

  combinedElements.forEach((section) => {
    observer.value?.observe(section)
  })
})

// Pour les catégories associées
const categorie = data._rawValue.categories
const displayArticleByCat = async (categorie) => {
  await storeArticle.articleByCategorie(categorie)
  const filteredArticles = storeArticle.searchByCat.filter(article => article.id !== data._rawValue.id)
  listArticleAssocie.value = filteredArticles
}
displayArticleByCat(categorie)

function scrollToTop () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// SEO
const loadSEO = () => {
  const generateJSONLD = () => ({
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    headline: data ? data._rawValue.title : '',
    description: data ? data._rawValue.description : '',
    author: {
      '@type': 'Person',
      name: data ? data._rawValue.auteur : ''
    },
    datePublished: data ? data._rawValue.date : '',
    dateModified: data ? data._rawValue.lastModif : '',
    image: {
      '@type': 'ImageObject',
      url: data ? `${storeConfig.config.global.url}/${data._rawValue.img.substring(1)}` : ''
    },
    url: data ? `${storeConfig.config.global.url}/articles/${data._rawValue.slug}` : '',
    publisher: {
      '@type': 'Organization',
      name: data ? `${storeConfig.config.global.titre}` : '',
      logo: {
        '@type': 'ImageObject',
        url: data ? `${storeConfig.config.global.url}/favicon.png` : ''
      }
    }
  })
  useJsonld(generateJSONLD)

  const route = useRoute()
  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: data ? `${storeConfig.config.global.url}` + route.path : ''
      }
    ]
  }))

  useSeoMeta({
    title: data ? data._rawValue.title : '',
    ogTitle: data ? data._rawValue.title : '',
    description: data ? data._rawValue.description : '',
    ogDescription: data ? data._rawValue.description : '',
    ogImage: data ? `${storeConfig.config.global.url}/${data._rawValue.img.substring(1)}` : '',
    ogType: 'article',
    ogUrl: data ? `${storeConfig.config.global.url}/articles/${data._rawValue.slug}` : '',
    ogPublishDate: data ? `${data._rawValue.date}` : ''
  })
}

onMounted(async () => {
  if (!storeConfig.config) {
    await storeConfig.grabJSONFile()
    console.log(storeConfig.config)
    loadSEO()
  } else {
    loadSEO()
  }
})

</script>

<style>

/* Table des matières */

.table-sticky {
  position: sticky;
  top: 0;
}

.table-mobile {
  margin: 30px 0;
}

/* Bouton de retour en haut de page */

.fleche {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    background-color: #1f583a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

}

.fleche__icon{
    color: white;
}

.article-associe__button {
  margin: 20px;
}

/* Conteneur des articles */

.article-container {
    width: 90%;
    margin : 0 auto 50px auto;
    position: relative;
}

/* Section Titre de l'article */

.front-container {
    width: 100%;
}

.front-container > h1 {
  margin: 20px 0;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
    color: var(--text-color);
}

.front-container__cat {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.front-container__cat > span {
  color: var(--main-color);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.8rem;
  margin: 10px 0;
}

.front-container__img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 10px;
    opacity: 0.9;
}

.front-container_date {
  color: rgb(74, 74, 74);
  font-size: 0.7rem;

}

.table-matiere-pc {
  display: none;
}

.article-associe-mobile {
  display: block;
}

.article-associe-desktop {
  display: none;
}

.article-associe-button {
  margin: 20px;
}

/* Partage réseaux sociaux */

.container-partage {
  margin: 10px 0;
}

/* Liste a puce avec chiffre */

.container__content > * {
  color: var(--text-color);
}

.container__content > ol {
    list-style-type: decimal;
    margin-left: 2rem;
}

.container__content > ol >li {
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 400;
}

.container__content > ol > li > a {
    text-decoration: none;
    color :#363636;
}

.container__content > ol > li > a:hover {
    color : #8B5A2B;
}

/* Table des matières / Sous menu */

.container__content > ol > li > ol {
    list-style-type: none;
    margin: 1rem 0 0 1rem;
    font-size: 1.1rem;
}

.container__content > ol >li > ol > li{
    margin: 0.5rem 0 0 0;
}

.container__content > ol >li > ol > li > a{
    text-decoration: none;
}

/* Liste à puces 1er niveau */

.container__content > ul {
    list-style-type: square;
    margin : 20px 0px 20px 20px;
}

.container__content > ul > li {
    margin: 1rem auto;
    text-align: justify;
    line-height: 1.4rem;
    font-weight: 400;
}

/* Liste à puces 2ème niveau */

.container__content > ul > li > ul  {
  margin : 20px 0px 10px 20px;
}

/* Liste à puces 3ème niveau */

.container__content > ul > li > ul > li > ul {
  list-style-type: square;
    margin : 20px 0px 20px 20px;
}

.container__content > ul > li > ul > li > ul > li {
    margin: 0.2rem auto;
    text-align: justify;
    line-height: 1.4rem;
    font-weight: 400;
}

/* Titres */

.container__content > h2 {
  margin: 30px 0 20px 0;

}

.container__content > h3 {
  margin: 20px 0px 20px 20px;

}

.container__content > h4 {
  margin: 20px 0;

}
.container__content > h2 > a {
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  color : #417244 ;

}

.container__content > h3 > a {
    font-size: 1.2rem;
    font-weight: 400;
    color: #5B936B ;

}

.container__content > h4 > a {
    font-weight: 400;
    text-decoration: none;

}

/* Content */

strong {
  font-weight: 700;
}

.container__content .lien-interne {
  color: #1f583a;
  font-weight: 600;
}

.container__content br {
    margin-bottom: 30px;
}

.container__content > p {
    text-align: justify;
    line-height: 1.4rem;
    font-weight: 400;
}

.container__content > img {
    width: 300px;
    height: 100%;
    margin: 20px auto;
    object-fit: cover;
    display : block;

}

.container__content > img:hover {
    opacity: 0.8;
}

.container__content > :last-child {
    margin-bottom: 50px ;
}

/* Tableau */

table {
    margin : 20px 0;
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-x : auto;
}

th, td {
    border: 1px solid #c4c4c4;
    padding: 8px;
    text-align: left;
    font-weight: 300;
}

table > tbody > tr> td:first-child{
    font-weight: 400;
}

td > img {
  width: 150px;
  height: 100px;
  margin: auto;
  object-fit: contain;
}

/* Article relié */

@media screen and (min-width: 900px) {

.front-container > h1 {
    font-size: 2.1rem;
}

.front-container__cat > span {
    font-size: 1.1rem;
}

.front-container > img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin-bottom: 30px;
}

.fleche {
    position: fixed;
    width: 50px;
    height: 50px;
}

th, td {
    font-size: 1rem;
}

}

@media screen and (min-width: 1200px) {

  .main-article {
    width: 90%;
    margin: 20px auto;
    display: flex;
    gap: 40px;
  }

  .article-container {
    flex-basis : 75%;
  }

  .table-matiere-pc {
    display: block;
    flex-basis: 25%;
  }
.article-associe-mobile {
  display: none;
}

.article-associe-desktop {
  width: 90%;
  margin:0 auto;
  display: block;
}
.table-mobile {
  display: none;
}

.table-matiere-pc .container-card {
   grid-template-columns: repeat(1, 1fr);

}}

</style>
