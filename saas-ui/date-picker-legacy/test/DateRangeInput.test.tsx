import React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as DateRangeInput } from '../stories/DateRangeInput.stories'
import './utils/jsdom-fixes'

describe('DateRangeInput', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DateRangeInput />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
