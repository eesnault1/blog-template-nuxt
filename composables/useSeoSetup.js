export function useSeoSetup (storeConfigGlobal, storeConfigPage) {
  const route = useRoute()
  // SCHEMA.ORG
  const generateJSONLD = () => ({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: storeConfigGlobal ? `${storeConfigGlobal.url}` : '',
    logo: storeConfigGlobal ? `${storeConfigGlobal.url}/favicon.jpg` : '',
    name: storeConfigGlobal ? `${storeConfigGlobal.titre}` : '',
    description: storeConfigGlobal ? `${storeConfigGlobal.description}` : '',
    image: storeConfigGlobal ? `${storeConfigGlobal.img}` : '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': storeConfigGlobal ? `${storeConfigGlobal.url}` : ''
    }
  })
  // SEO
  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: storeConfigGlobal ? `${storeConfigGlobal.url}` + route.path : ''
      }
    ]
  }))
  useSeoMeta({
    ogType: 'website',
    title: storeConfigGlobal ? `${storeConfigPage.titre}` : '',
    ogTitle: storeConfigGlobal ? `${storeConfigPage.titre}` : '',
    description: storeConfigGlobal ? `${storeConfigPage.description}` : '',
    ogDescription: storeConfigGlobal ? `${storeConfigPage.description}` : '',
    ogUrl: storeConfigGlobal ? `${storeConfigGlobal.url}${route.path}` : '',
    ogImage: storeConfigGlobal ? `${storeConfigPage.img}` : ''
  })

  return { generateJSONLD }
}
