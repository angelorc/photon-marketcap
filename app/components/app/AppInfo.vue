<script setup lang="ts">
import { Info } from "lucide-vue-next"
</script>

<template>
  <section>
    <h2 class="mb-6 text-3xl font-bold tracking-tight text-foreground">About Photon</h2>
    <Card class="border-border bg-card">
      <CardHeader>
        <div class="flex items-center gap-2">
          <Info class="h-5 w-5 text-primary" />
          <CardTitle class="text-xl text-foreground">What is Photon?</CardTitle>
        </div>
      </CardHeader>
      <CardContent class="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          The Photon Token (PHOTON) module introduces uphoton as the sole fee token within the AtomOne network, as specified in ADR 002. PHOTONs are created by burning ATONE tokens through the MsgMintPhoton message, following a dynamic conversion formula that ensures the total PHOTON supply never exceeds 1 billion tokens.
        </p>
      </CardContent>
    </Card>
  </section>
</template>