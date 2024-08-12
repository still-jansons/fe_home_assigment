import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MultiOptionsList from '@/components/MultiOptionsList.vue'

describe('MultiOptionList', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ]

  it('renders the component', () => {
    const wrapper = mount(MultiOptionsList, {
      props: {
        options,
        selected: []
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders all options', () => {
    const wrapper = mount(MultiOptionsList, {
      props: {
        options,
        selected: []
      }
    })
    const listOptions = wrapper.findAll('.list-options .option')
    expect(listOptions).toHaveLength(options.length)
  })

  it('displays selected options', () => {
    const selected = ['opt1', 'opt3']
    const wrapper = mount(MultiOptionsList, {
      props: {
        options,
        selected
      }
    })
    const selectedOptions = wrapper.findAll('.list-selected .option')
    expect(selectedOptions).toHaveLength(selected.length)
    expect(selectedOptions[0].text()).toContain('Option 1')
    expect(selectedOptions[1].text()).toContain('Option 3')
  })

  it('emits update:selected event when checkbox is checked', async () => {
    const wrapper = mount(MultiOptionsList, {
      props: {
        options,
        selected: []
      }
    })
    await wrapper.findAll('input[type="checkbox"]')[0].setValue(true)
    expect(wrapper.emitted('update:selected')).toBeTruthy()
    expect(wrapper.emitted('update:selected')![0]).toEqual([['opt1']])
  })

  it('updates when props change', async () => {
    const wrapper = mount(MultiOptionsList, {
      props: {
        options,
        selected: [],
      },
    })
    await wrapper.setProps({ selected: ['opt1', 'opt3'] })
    expect(wrapper.findAll('.list-selected .option').length).toBe(2)
  })

  it('removes selected option when remove button is clicked', async () => {
    const selected = ['opt1', 'opt3']
    const wrapper = mount(MultiOptionsList, {
      props: { options, selected }
    })
    await wrapper.findAll('.btn-remove')[0].trigger('click')
    expect(wrapper.emitted('update:selected')).toBeTruthy()
    expect(wrapper.emitted('update:selected')![0]).toEqual([['opt3']])
  })
})
