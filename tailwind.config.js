/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	theme: {
		extend: {
			colors: {
				cyan: {
					100: '#e6feff',
					200: '#c2fefe',
					300: '#9dfdfe',
					400: '#53fbfd',
					500: '#09f9fc',
					600: '#08e0e3',
					700: '#059597',
					800: '#047071',
					900: '#034b4c',
				},
				disco: {
					100: '#f2e8f2',
					200: '#dec6de',
					300: '#cba4ca',
					400: '#a35fa2',
					500: '#7c1b7a',
					600: '#70186e',
					700: '#4a1049',
					800: '#380c37',
					900: '#250825',
				},
				flamenco: {
					100: '#fff3e6',
					200: '#ffe0c2',
					300: '#ffcd9d',
					400: '#ffa853',
					500: '#ff8209',
					600: '#e67508',
					700: '#994e05',
					800: '#733b04',
					900: '#4d2703',
				},
				martinique: {
					100: '#eaeaed',
					200: '#cacad3',
					300: '#aaaab8',
					400: '#6a6b82',
					500: '#2a2b4d',
					600: '#262745',
					700: '#191a2e',
					800: '#131323',
					900: '#0d0d17',
				},
				melrose: {
					100: '#f5f5ff',
					200: '#e5e6ff',
					300: '#d6d6ff',
					400: '#b7b8ff',
					500: '#9899ff',
					600: '#898ae6',
					700: '#5b5c99',
					800: '#444573',
					900: '#2e2e4d',
				},
				lemon: {
					100: '#fefbe8',
					200: '#fdf5c6',
					300: '#fcefa3',
					400: '#f9e25e',
					500: '#f7d619',
					600: '#dec117',
					700: '#94800f',
					800: '#6f600b',
					900: '#4a4008',
				},
				rose: {
					100: '#ffe7ef',
					200: '#fec2d8',
					300: '#fe9dc1',
					400: '#fd5492',
					500: '#fc0a63',
					600: '#e30959',
					700: '#97063b',
					800: '#71052d',
					900: '#4c031e',
				},
				spring: {
					100: '#ebfef1',
					200: '#cdfddc',
					300: '#aefcc6',
					400: '#72fa9c',
					500: '#35f871',
					600: '#30df66',
					700: '#209544',
					800: '#187033',
					900: '#104a22',
				},
			},
			fontFamily: {
			  sans: [
			  '"Open Sans"', ...defaultTheme.fontFamily.sans
			  ]
			}
		}
	},
	variants: {},
	plugins: []
}
