<template>
  <div>
    <head>
      <meta charset="UTF-8">
      <title>Politique de Confidentialité</title>
      <meta name="robots" content="noindex">
    </head>
    <div>
      <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>

      <h2>1. Préambule</h2>
      <p>Cette politique de confidentialité s'applique à toutes les informations recueillies par notre site. Nous respectons votre vie privée et nous engageons à protéger vos informations personnelles.</p>

      <p>Nous avons créé cette politique de confidentialité pour démontrer notre engagement ferme à protéger vos informations personnelles et à informer vos droits et nos obligations en vertu du Règlement général sur la protection des données (RGPD).</p>

      <h2>2. Qui sommes-nous ?</h2>
      <p>
        {{ storeConfig.config.global.url }}
        ADRESSE
        Coordonnées
        Nom du responsable de traitement des données
      </p>
      <h2>3. Les données que nous collectons et pourquoi</h2>
      <p>Lors de votre visite sur notre site, nous pouvons être amenés à collecter et à traiter certaines informations vous concernant, notamment :</p>

      <p>Cookies : Si vous acceptez notre politique de cookies, nous utilisons des cookies Google Analytics pour collecter des données anonymes sur l'utilisation de notre site afin d'améliorer nos services. Ces cookies recueillent des informations sur la manière dont les visiteurs utilisent notre site, y compris le nombre de visiteurs, les sites qui les ont renvoyés et les pages qu'ils ont visitées. Cela nous aide à comprendre quelles sont les parties de notre site qui sont les plus intéressantes pour nos utilisateurs et comment nous pouvons améliorer nos services.</p>

      <h2>4. Comment nous utilisons vos données</h2>
      <p>Nous utilisons les informations collectées pour les raisons suivantes :</p>

      <p>Analyse du site web : Nous utilisons les informations collectées par les cookies Google Analytics pour comprendre comment les visiteurs interagissent avec notre site web, afin de l'améliorer et de le rendre plus utile pour nos visiteurs.</p>

      <h2>5. Partage de vos données</h2>
      <p>Nous utilisons Google Analytics pour analyser l'utilisation de notre site web. Google Analytics recueille des informations sur l'utilisation du site web de manière anonyme. Google utilise ces informations pour évaluer l'utilisation de notre site web, pour compiler des rapports sur l'activité du site web et pour fournir d'autres services liés à l'activité du site web. Google peut également transférer ces informations à des tiers lorsque la loi l'exige ou lorsque ces tiers traitent ces informations pour le compte de Google.</p>

      <h2>6. Conservation de vos données</h2>
      <p>Nous conserverons vos données aussi longtemps que nécessaire pour les fins pour lesquelles nous les avons recueillies, comme décrit dans cette politique de confidentialité, ou tel que requis par la loi.</p>

      <h2>7. Vos droits</h2>
      <p>En vertu du RGPD, vous avez le droit d'accéder à vos données personnelles, de les corriger, de les supprimer, de limiter leur traitement, de vous opposer à leur traitement et de demander leur portabilité. Vous pouvez exercer ces droits en nous contactant à l'adresse mentionnée dans la section "Qui sommes-nous ?".</p>

      <p>Si vous avez des questions sur cette politique de confidentialité ou si vous voulez exercer l'un de vos droits, veuillez nous contacter.</p>

      <h2>8. Google AdSense</h2>

      <p>Nous utilisons Google AdSense, un service de publicité fourni par Google Inc. ("Google"), sur notre site web. Google AdSense utilise des "cookies", qui sont des fichiers texte placés sur votre ordinateur, pour permettre une analyse de l'utilisation du site. Google AdSense utilise également des balises Web (graphiques invisibles). Ces balises Web permettent l'évaluation d'informations telles que le trafic des visiteurs sur ces pages.</p>

      <p>Les informations générées par les cookies et les balises Web concernant votre utilisation de ce site web (y compris votre adresse IP) et la diffusion de formats publicitaires sont transmises à un serveur de Google aux États-Unis, où elles sont stockées. Ces informations peuvent être transmises par Google à ses partenaires contractuels. Cependant, Google ne fusionnera pas votre adresse IP avec d'autres données que vous avez stockées.</p>

      <p>Google utilise ces informations pour évaluer votre utilisation du site web, pour compiler des rapports sur l'activité du site web et pour fournir d'autres services liés à l'activité du site web et à l'utilisation d'Internet.</p>

      <p>Vous pouvez refuser l'utilisation de cookies en sélectionnant les paramètres appropriés sur votre navigateur, mais veuillez noter que si vous faites cela, vous ne pourrez peut-être pas utiliser toutes les fonctionnalités de ce site web. En utilisant ce site web, vous consentez au traitement des données vous concernant par Google de la manière et aux fins décrites ci-dessus.</p>
    </div>
  </div>
</template>

<script setup>
import { useConfigGlobal } from '~/stores/getConfigGlobal'
const storeConfig = useConfigGlobal()
</script>

<style scoped>
div {
    width: 80%;
    margin:auto;
}

h2 {
    margin : 10px 0
}

p {
    margin: 10px 0 ;
}
</style>
