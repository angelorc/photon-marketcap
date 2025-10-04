<script lang="ts" setup>
import { Activity, BarChart3, Coins, DollarSign, Wallet, Zap, ExternalLink } from 'lucide-vue-next'

import { useQuery } from '@tanstack/vue-query'

const { $orpc } = useNuxtApp()

const query = useQuery($orpc.getMetrics.queryOptions({
  refetchInterval: 1000 * 60, // 1 minute
  refetchOnWindowFocus: true,
  staleTime: 1000 * 60 * 5, // 5 minutes
}))

onServerPrefetch(async () => await query.suspense())

const data = query.data
</script>

<template>
  <section>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AppMetricsCard
        title="Price"
        :icon="DollarSign"
      >
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ data?.usdPrice }}
            </p>
            <span class="text-xs text-muted-foreground">USD</span>
          </div>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Market Cap"
        :icon="BarChart3"
      >
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatUSD(data?.marketCap, 0) }}
            </p>
            <span class="text-xs text-muted-foreground">USD</span>
          </div>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Circulating Supply"
        :icon="Coins"
      >
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatNumber(data?.totalSupply) }}
            </p>
            <span class="text-xs text-muted-foreground">PHOTON</span>
          </div>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Supply on Osmosis"
        :icon="Activity"
      >
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatNumber(data?.photonOnOsmosis) }}
            </p>
            <span class="text-xs text-muted-foreground">PHOTON</span>
          </div>
          <CardDescription class="text-xs text-muted-foreground font-mono">
            {{ formatUSD(data?.photonOnOsmosisUsd, 0) }}
          </CardDescription>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Max Supply"
        :icon="Coins"
      >
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatNumber(data?.maxSupply) }}
            </p>
            <span class="text-xs text-muted-foreground">PHOTON</span>
          </div>
          <CardDescription class="text-xs text-muted-foreground font-mono">
            {{ formatUSD(data?.fdv, 0) }} (FDV)
          </CardDescription>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Mint Price"
        :icon="Wallet"
      >
        <div class="space-y-1">
          <CardDescription class="text-xs text-muted-foreground">
            1 ATONE =
          </CardDescription>
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatNumber(data?.mintPrice) }}
            </p>
            <span class="text-xs text-muted-foreground">PHOTON</span>
          </div>
          <p
            v-if="Number(data?.mintPrice ?? 0) > Number(data?.osmosisPrice ?? 0)"
            class="text-xs text-green-600"
          >
            Best conversion rate!
          </p>
        </div>
      </AppMetricsCard>

      <AppMetricsCard
        title="Osmosis Price"
        :icon="Zap"
      >
        <div class="space-y-1">
          <CardDescription class="text-xs text-muted-foreground">
            1 ATONE =
          </CardDescription>
          <div class="flex items-baseline gap-2">
            <p class="font-mono text-2xl font-bold text-foreground">
              {{ formatNumber(data?.osmosisPrice) }}
            </p>
            <span class="text-xs text-muted-foreground">PHOTON</span>
          </div>
          <p
            v-if="Number(data?.osmosisPrice ?? 0) > Number(data?.mintPrice ?? 0)"
            class="text-xs text-green-600 font-semibold"
          >
            Best conversion rate!
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          class="mt-4 w-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
          as-child
        >
          <a
            href="https://app.osmosis.zone/?from=ibc/BC26A7A805ECD6822719472BCB7842A48EF09DF206182F8F259B2593EB5D23FB&sellOpen=false&buyOpen=false&to=ibc/D6E02C5AE8A37FC2E3AB1FC8AC168878ADB870549383DFFEA9FD020C234520A7"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2"
          >
            Buy on Osmosis
            <ExternalLink class="h-3 w-3" />
          </a>
        </Button>
      </AppMetricsCard>
    </div>
  </section>
</template>
