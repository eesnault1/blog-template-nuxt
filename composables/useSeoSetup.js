export function useSeoSetup (storeConfigGlobal, storeConfigPage) {
  const route = useRoute()

  const generateJSONLD = () => ({
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: storeConfigGlobal ? `${storeConfigGlobal.url}` : '',
    name: storeConfigGlobal ? `${storeConfigGlobal.titre}` : '',
    description: storeConfigGlobal ? `${storeConfigGlobal.description}` : '',
    image: storeConfigGlobal ? `${storeConfigGlobal.img}` : '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': storeConfigGlobal ? `${storeConfigGlobal.url}` : ''
    }
  })

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
