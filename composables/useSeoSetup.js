export function useSeoSetup (storeConfigGlobal, storeConfigPage) {
  const route = useRoute()
  // SCHEMA.ORG

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
    ogImage: storeConfigGlobal ? `${storeConfigGlobal.url}${storeConfigPage.img}` : ''
  })
}
