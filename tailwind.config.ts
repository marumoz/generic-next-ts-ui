import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
    	extend: {
    		colors: {
    			primary: {
    				'100': '#662984',
    				'200': '#531173',
    				'300': '#E2CDF3'
    			},
    			secondary: {
    				'100': '#F7941D',
    				'200': '#f68223'
    			},
    			info: '#005299',
    			success: '#16AB21',
    			warning: '#FF0000',
    			bordercolor: '#979797',
    			bgcolor: {
    				'100': '#F5F5F5',
    				'200': '#E6E7E8'
    			}
    		},
            width: {
              'sm': '47%',
              'md': '45%',
              'xl': '95%',
              '97': '651px',
              '98': '940px',
              '520': '520px',
              '480': '480px',
              '600': '651px'
            },
            minWidth: {
              '36': "9 rem",
              '24': '100px',
              '28': '150px',
              '97': '454px',
              '500': '500px'
            },
            maxWidth: {
              '90': '90%',
              '25': '250px',
              '1/4': '25%'
            },
            minHeight: {
              '12': '40px',
              '28': '100px',
              '14': '50px',
              '96': '301px'
            },
            maxHeight: {
              '52': '200px',
              '80': '80%',
              '85': '85%',
              '90': '90%',
              '95': '95%'
            },
            inset: {
              '0.6': '3px'
            },
            margin: {
              'sm': '6%',
              'md': '10%'
            },
            borderWidth: {
              '3': '3px',
              '5': '5px',
              '6': '6px',
              '7': '7px'
            }
    	}
    },
    variants:{
        extend: {
            fontSize: ['focus', 'disabled'],
            padding: ['focus', 'disabled'],
            inset: ['focus', 'disabled'],
            backgroundColor: ['disabled'],
            display: ['first']
        }
    },
    plugins: []
} satisfies Config;
