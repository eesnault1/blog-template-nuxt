// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
      ],
      script: [
        {
          hid: 'sitemap',
          type: 'application/xml',
          src: `${process.env.SITE_URL}/sitemap.xml`
        }
      ]
    },

    pageTransition: { name: 'page', mode: 'out-in' }

  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    'nuxt-security',
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    'nuxt-jsonld',
    'nuxt-gtag'
    /*     ['@nuxtjs/google-adsense', {
      id: process.env.ADSENSE_ID,
      onPageLoad: false,
      pauseOnLoad: true
    }] */
  ],
  plugins: [
    '~/plugins/vue-social-sharing.client.js'
  ],

  gtag: {
    id: process.env.GA_ID,
    initialConsent: false
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL
    }
  },
  eslint: {
    fix: true
  },
  components: true,
  site: {
    url: process.env.SITE_URL
  },
  sitemap: {
    discoverImages: true,
    debug: true,
    // provide dynamic URLs to be included
    urls: () => {
      const articlesDirectory = path.resolve(__dirname, 'content/articles')
      const articleFiles = fs.readdirSync(articlesDirectory)
      return articleFiles.map((file) => {
        const content = fs.readFileSync(path.join(articlesDirectory, file), 'utf8')
        const parsed = fm(content)

        // Extraire image pour le sitemap

        const imgMatches = []
        // Extraction des images du front matter

        if (parsed.attributes.img) {
          let imageUrl = parsed.attributes.img
          if (imageUrl.startsWith('../')) {
            imageUrl = imageUrl.replace('../', '/')
          }
          imgMatches.push({ loc: process.env.SITE_URL + imageUrl })
        }

        // Extraction des images du corps du contenu
        const imgRegex = /<img[^>]*src="([^"]*)"/g
        let match
        while (match = imgRegex.exec(parsed.body)) {
          let imageUrl = match[1]
          if (imageUrl.startsWith('../')) {
            imageUrl = imageUrl.replace('../', '/')
          }
          imgMatches.push({ loc: process.env.SITE_URL + imageUrl })
        }

        return {
          loc: `/articles/${parsed.attributes.slug}`,
          lastmod: parsed.attributes.lastModif || '07/12/2023',
          changefreq: 'daily',
          image: imgMatches
        }
      })
    }
  },
  css: ['@/styles/reset.css', '@/styles/main.css'],
  image: {
    screens: {
      xs: 140,
      sm: 370,
      md: 600,
      lg: 900,
      xl: 1200,
      xxl: 1800
    },
    provider: 'vercel'
  }

})
