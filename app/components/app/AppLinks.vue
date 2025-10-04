<script setup lang="ts">
import { ExternalLink, FileText, Github, Globe, MessageCircle } from "lucide-vue-next"

const links = [
  {
    title: "Website",
    url: "https://atom.one",
    icon: Globe,
    description: "Official Atom One website",
  },
  {
    title: "Documentation",
    url: "https://docs.atom.one/",
    icon: FileText,
    description: "Technical documentation and guides",
  },
  {
    title: "Telegram",
    url: "https://t.me/+I7RYy1vR_5FkMTQx",
    icon: MessageCircle,
    description: "Follow us for updates",
  },
  {
    title: "GitHub",
    url: "https://github.com/atomone-hub/atomone/tree/main/x/photon",
    icon: Github,
    description: "View source code",
  },
  {
    title: "Photon on Osmosis",
    url: "https://app.osmosis.zone/assets/ibc/D6E02C5AE8A37FC2E3AB1FC8AC168878ADB870549383DFFEA9FD020C234520A7",
    icon: ExternalLink,
    description: "Trade PHOTON on Osmosis",
  },
]
</script>

<template>
  <section>
    <h2 class="mb-6 text-3xl font-bold tracking-tight text-foreground">Links</h2>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="link in links" :key="link.title" class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader>
          <CardTitle class="flex items-center gap-2 text-lg text-foreground">
            <component :is="link.icon" class="h-5 w-5 text-primary" />
            {{ link.title }}
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-sm text-muted-foreground">{{ link.description }}</p>
          <Button
            variant="outline"
            size="sm"
            class="w-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
            asChild
          >
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2"
            >
              Visit
              <ExternalLink class="h-3 w-3" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  </section>
</template>