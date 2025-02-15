'use client'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

const CustomStyles = createGlobalStyle({
	body: {}
})

const GlobalStyles = () => (
	<>
		<CustomStyles />
	</>
)

export default GlobalStyles