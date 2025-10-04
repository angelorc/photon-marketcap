<script setup lang="ts">
interface Props {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

const props = defineProps<Props>();
const { title, icon: Icon } = props;
</script>

<template>
  <Card class="border-border bg-card transition-colors hover:bg-card/80">
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium text-muted-foreground">{{ title }}</CardTitle>
      <component :is="Icon" v-if="Icon" class="h-4 w-4 text-primary" />
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>