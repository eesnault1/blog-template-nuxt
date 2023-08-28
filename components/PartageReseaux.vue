<template>
  <div class="partage-rs">
    <ClientOnly>
      <ShareNetwork
        v-for="network in networks"
        :key="network.network"
        class="share-network"
        :network="network.network"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
      >
        <Icon :name="network.icon" />
        <span>{{ network.network }}</span>
      </ShareNetwork>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useConfigGlobal } from '~/stores/getConfigGlobal'
const storeConfig = useConfigGlobal()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const networks = [
  { network: 'facebook', icon: 'logos:facebook' },
  { network: 'twitter', icon: 'logos:twitter' },
  { network: 'pinterest', icon: 'logos:pinterest' },
  { network: 'telegram', icon: 'logos:telegram' },
  { network: 'whatsapp', icon: 'logos:whatsapp-icon' },
  { network: 'email', icon: 'mdi:email-outline' }
]

const sharing = ref({})
sharing.value = {
  url: `${storeConfig.config.global.url}/articles/${props.data.slug}`,
  title: props.data.title,
  description: props.data.description
}

watch(props.data, (newVal) => {
  if (newVal) {
    sharing.value = {
      url: `https://www.potager-bio.fr/articles/${newVal._rawValue.slug}`,
      title: newVal._rawValue.title,
      description: newVal._rawValue.description
    }
  }
})
</script>

<style scoped>
/* Partage réseaux sociaux */

.partage-rs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap : 15px;
  margin: 10px 0;
  flex-wrap: wrap;
}

.partage-rs > * {
font-size: 1.2rem;
}

.share-network {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap : 3px;
}

.share-network > span{
  text-decoration: none;
  color : black;
}

</style>
