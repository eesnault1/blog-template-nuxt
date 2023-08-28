<template>
  <nav class="navbar">
    <NuxtLink to="/" class="navbar__logo">
      <img
        src="/favicon.jpg"
        alt="Logo"
        class="navbar__logo"
      >
    </NuxtLink>

    <div class="navbar__searchbar">
      <Icon
        class="navbar__search-icon"
        name="material-symbols:search"
      />
      <input
        v-model="searchInput"
        type="search"
        class="navbar__search-input"
        placeholder="RECHERCHER..."
        @keyup.enter="searchEnter()"
      >
    </div>
    <ul
      class="navbar__list"
      :class="{ 'close': close }"
    >
      <li
        v-for="link in links"
        :key="link.link"
        class="navbar__list-item"
      >
        <NuxtLink :to="link.link" class="navbar__link" @click="toggleHamburger()">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>

    <span class="navbar__hamburger" @click="toggleHamburger()">
      <Icon
        name="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"
        class="navbar__hamburger-openbtn"
        :style="{ display: close ? 'none' : 'block' }"
      />
      <Icon
        name="material-symbols:close-rounded"
        class="navbar__hamburger-closebtn"
        :style="{ display: !close ? 'none' : 'block' }"
      />
    </span>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGetArticle } from '../stores/getArticles'

const storeArticle = useGetArticle()

const close = ref(false)
const links = ref([])
const searchInput = ref('')

links.value = [
  { name: 'Accueil', link: '/' },
  { name: 'Articles', link: '/AllArticle' },
  { name: 'Rechercher', link: '/RechercherParCategorie' }
]

const toggleHamburger = () => {
  close.value = !close.value
}
const router = useRouter()

const searchEnter = () => {
  storeArticle.searchArticleInput(searchInput.value)
  router.push('/RechercherInput')
  searchInput.value = ''
}

</script>

<style scoped>

.close {
    left:100% !important;
}

/* NAVBAR */

.navbar {
  position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    background-color: white;
    z-index: 10;
    padding: 10px 20px;
}

.navbar__logo {
  width: 30px;
  height: 30px;
}

.navbar__searchbar {
    width: 70%;
    display: flex;
    justify-content: start;
    padding: 10px;
    gap: 10px;
    border : 1px solid var(--main-color);
    border-radius : 50px;
}

.navbar__search-icon {
    margin : 0px 6px;
    font-size: 25px;
    color : var(--main-color);
}

.navbar__search-input {
    outline: none;
    width: 100%;
}

.navbar__search-input::placeholder {
    opacity: 0.9;
    color: var(--main-color)
}

.navbar__hamburger {
  border: 1px solid rgba(87, 87, 87, 0.194);
  border-radius : 5px;
padding: 7px;
}

.navbar__hamburger:hover {
  border: 1px solid rgb(87, 87, 87);
}
.navbar__hamburger > * {
    width: 25px;
    height: 25px;
    cursor: pointer;
    color : rgba(56, 56, 56, 0.776);
}

/* NAVBAR DISPLAY  */

.navbar__list {
    background-color: var(--main-color);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: 30px;
    padding: 30px 0px;
    position: absolute;
    top: 100%;
    left : 0px;
    transform: translateX(-100%);
    transition: 0.4s ease-in-out;
}

.navbar__link{
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    text-transform: uppercase;
}

@media screen and (min-width: 992px) {

.navbar {
  width: 80%;
  margin: auto;
  padding: 10px 0px;

}

.navbar__logo {
  width: 50px;
  height: 50px;
}

.navbar__list {
  left: -70%;
  width: 150%;
  margin: auto;
  transform: translateX(-80%);
  overflow: hidden;

}

.close {
    left:100% !important;
}

}

@media screen and (min-width: 1200px) {
.navbar {
      width: 95%;
      margin: auto;
        display: flex;
        min-height: 80px;
        justify-content: space-between;
        padding: 20px 0;
}
.navbar__logo {
  width: 60px;
  height: 60px;
}
    .navbar__hamburger {
        display: none;
}

    .navbar__list {
        order : 1;
        flex-direction: row;
        justify-content: space-around;

        padding: 0px;
        position: static;
        transform: none;
        transition: none;
        background-color: white;
}

.navbar__list-item{
  max-width: 150px;
  padding: 2px;
    }

    .navbar__link {
        text-transform: none;
        color: var(--text-color);
        font-weight: 400;
    line-height: 1.15rem;
    }

    .navbar__link:hover {
      color : var(--main-color);

    }

    .navbar__search-input {
        width: 100%;
}

    .navbar__searchbar {
        order : 2;
        width: 50%;
}

}

</style>
