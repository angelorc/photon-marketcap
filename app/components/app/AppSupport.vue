<script setup lang="ts">
import { Heart, Copy, Check } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'

const address = ref('atone1w73r03uyj3y66skgreqfd4x4lk38w7rcln664d');

const { copy, copied, isSupported } = useClipboard();
</script>

<template>
  <section>
    <Card class="border-primary/20 bg-card/50">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-xl text-foreground">
          <Heart class="h-5 w-5 text-primary" />
          Support the Project
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-balance text-sm leading-relaxed text-muted-foreground">
          If you find this dashboard helpful and would like to donate, any contribution is greatly
          appreciated and helps keep this project running.
        </p>
        <div class="space-y-2">
          <p class="text-xs font-medium text-foreground">Donation Address</p>
          <div class="flex items-center gap-2">
            <code class="flex-1 rounded-md bg-background/50 px-3 py-2 text-xs text-foreground font-mono break-all">
              {{ address }}
            </code>
            <Button
              v-if="isSupported"
              variant="outline"
              size="sm"
              @click="copy(address)"
              class="shrink-0 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary cursor-pointer"
            >
              <template v-if="copied">
                <Check class="h-4 w-4 mr-1" />
                Copied
              </template>
              <template v-else>
                <Copy class="h-4 w-4 mr-1" />
                Copy
              </template>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</template>