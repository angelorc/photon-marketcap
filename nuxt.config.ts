export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Photon Marketcap',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A marketcap dashboard for the Photon token' },
        { property: 'og:title', content: 'Photon Marketcap' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://photonmarketcap.org' },
        { property: 'og:image', content: 'https://photonmarketcap.org/og.png' },
        { property: 'og:image:alt', content: 'Photon Marketcap' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:domain', content: 'photonmarketcap.org' },
        { property: 'twitter:url', content: 'https://photonmarketcap.org' },
        { name: 'twitter:title', content: 'Photon Marketcap' },
        { name: 'twitter:description', content: 'A marketcap dashboard for the Photon token' },
        { name: 'twitter:image', content: 'https://photonmarketcap.org/og.png' },
        { name: 'twitter:image:alt', content: 'Photon Marketcap' },
      ],
    }
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
})