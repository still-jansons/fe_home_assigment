<template>
  <div class="list-wrapper">
    <ul class="list-selected">
      <li
        v-for="{label, value} in selectedOptions"
        :key="value"
      >
        <div class="option">
          {{ label }}
          <button class="btn-remove" @click="removeSelected(value)">
            <span class="inner">X</span>
          </button>
        </div>
      </li>
    </ul>

    <ul class="list-options">
      <li
        v-for="{label, value} in options"
        :key="value"
      >
        <label class="option">
          <input
            type="checkbox"
            :value="value"
            v-model="selectedValues"
          />
          {{ label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

type ListItem = {
  label: string
  value: string
}

const props = defineProps<{
  options: ListItem[]
  selected: string[]
}>()

const emit = defineEmits<{
  'update:selected': [value: string[]]
}>()

const selectedValues = computed({
  get: () => props.selected,
  set: (options) => emit('update:selected', options)
})

const selectedOptions = computed(() => {
  return props.options.filter(option => selectedValues.value.includes(option.value))
})

function removeSelected(value: string) {
  selectedValues.value = selectedValues.value.filter(v => v !== value)
}
</script>

<style scoped>
.list-wrapper {
  padding: 16px;
  border: 1px solid var(--c-gray-30);
  border-radius: 4px;
  filter: drop-shadow(2px 2px 2px var(--c-gray-20));
  background: var(--c-white);
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: clamp(300px, 50%, 400px);
}


.list-selected,
.list-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 8px;
  row-gap: 16px;
}

.list-selected {
  column-gap: 16px;
}

.list-selected .option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  background: var(--c-gray-10);
  font-size: 14px;
  cursor: default;
  text-transform: lowercase;

  .btn-remove {
    position: absolute;
    cursor: pointer;
    right: -7px;
    top: -7px;
    background: transparent;
    color: var(--c-white);

    .inner {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--c-black);
      width: 20px;
      height: 20px;
      border: 2px solid var(--c-white);
      border-radius: 50%;
      font-size: 12px;
      font-weight: bold;
    }

    &:hover .inner {
      background: var(--c-white);
      border-color: var(--c-black);
      color: var(--c-black);
    }
  }
}

.list-options .option {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--c-gray-30);
  height: 32px;
  padding: 0 4px;
  background: var(--c-gray-10);
  color: var(--c-blue-10);
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover:not(:has(input:checked)) {
    background: var(--c-gray-20);
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    font: inherit;
    width: 0.8em;
    height: 0.8em;
    border: 1px solid var(--c-gray-30);
    border-radius: 0.2em;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "X";
      font-size: 0.7em;
      color: var(--c-red-10);
      font-weight: bold;
      display: none;
    }
  }

  &:has(input:checked) {
    background: var(--c-white);

    input[type="checkbox"]::before {
      display: block;
    }
  }
}
</style>
