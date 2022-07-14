import { default as Vue, VueConstructor } from 'vue'
import { shallowMount } from '@vue/test-utils'
import * as icons from './'

describe('icons', () => {
    Object.values(icons)
        .forEach((icon) => {
            console.log(icon)
            // describe(icon?.name, () => {
            //     it('renders an svg', () => {
            //         expect(shallowMount(icon).find('svg').exists()).toBe(true)
            //     })
            // })
        })
})