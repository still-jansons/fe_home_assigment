<template>
  <main>
    <MultiOptionsList
      :options="currencies"
      v-model:selected="selectedCurrencies"
    />
  </main>
</template>

<script setup lang="ts">
import MultiOptionsList from '@/components/MultiOptionsList.vue'
import {ref} from 'vue'

const currencies = ref([
  {
    label: 'EUR',
    value: 'eur',
  },
  {
    label: 'PLN',
    value: 'pln',
  },
  {
    label: 'GEL',
    value: 'gel',
  },
  {
    label: 'DKK',
    value: 'dkk',
  },
  {
    label: 'CZK',
    value: 'czk',
  },
  {
    label: 'GBP',
    value: 'gbp',
  },
  {
    label: 'SEK',
    value: 'sek',
  },
  {
    label: 'USD',
    value: 'usd',
  },
  {
    label: 'RUB',
    value: 'rub',
  }
])
const selectedCurrencies = ref([])
</script>
