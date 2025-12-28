/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import React from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return React.createElement('img', props)
  },
}))


jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => {
    return React.createElement('a', { href }, children)
  },
}))

global.fetch = jest.fn() as jest.Mock
