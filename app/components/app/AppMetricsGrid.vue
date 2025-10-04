<script lang="ts" setup>
import { Activity, BarChart3, Coins, DollarSign, Wallet, Zap } from "lucide-vue-next";

import { useQuery } from '@tanstack/vue-query'

const { $orpc } = useNuxtApp()

const query = useQuery($orpc.getMetrics.queryOptions({
  refetchInterval: 1000 * 60, // 1 minute
  refetchOnWindowFocus: true,
  staleTime: 1000 * 60 * 5, // 5 minutes
}))

await query.suspense()

const data = query.data

const formatNumber = (num: string = "0") => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(Number(num))
}

const formatUSD = (num: string = "0", maximumFractionDigits: number = 2) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(Number(num))
}
</script>

<template>
  <section>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Max Supply</CardTitle>
          <Coins class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatNumber(data?.maxSupply) }}</p>
              <span class="text-xs text-muted-foreground">PHOTON</span>
            </div>
            <CardDescription class="text-xs text-muted-foreground font-mono">{{ formatUSD(data?.fdv, 0) }} (FDV)</CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Circulating Supply</CardTitle>
          <Coins class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatNumber(data?.totalSupply) }}</p>
              <span class="text-xs text-muted-foreground">PHOTON</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Market Cap</CardTitle>
          <BarChart3 class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatUSD(data?.marketCap, 0) }}</p>
              <span class="text-xs text-muted-foreground">USD</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Supply on Osmosis</CardTitle>
          <Activity class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatNumber(data?.photonOnOsmosis) }}</p>
              <span class="text-xs text-muted-foreground">PHOTON</span>
            </div>
            <CardDescription class="text-xs text-muted-foreground font-mono">{{ formatUSD(data?.photonOnOsmosisUsd, 0) }}</CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Price</CardTitle>
          <DollarSign class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ data?.usdPrice }}</p>
              <span class="text-xs text-muted-foreground">USD</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Mint Price</CardTitle>
          <Wallet class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <CardDescription class="text-xs text-muted-foreground">1 ATONE =</CardDescription>
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatNumber(data?.mintPrice) }}</p>
              <span class="text-xs text-muted-foreground">PHOTON</span>
            </div>
            <p v-if="Number(data?.mintPrice ?? 0) > Number(data?.osmosisPrice ?? 0)" class="text-xs text-green-600">
              Best conversion rate!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="border-border bg-card transition-colors hover:bg-card/80">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Osmosis Price</CardTitle>
          <Zap class="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div class="space-y-1">
            <CardDescription class="text-xs text-muted-foreground">1 ATONE =</CardDescription>
            <div class="flex items-baseline gap-2">
              <p class="font-mono text-2xl font-bold text-foreground">{{ formatNumber(data?.osmosisPrice) }}</p>
              <span class="text-xs text-muted-foreground">PHOTON</span>
            </div>
            <p v-if="Number(data?.osmosisPrice ?? 0) > Number(data?.mintPrice ?? 0)" class="text-xs text-green-600 font-semibold">
              Best conversion rate!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>