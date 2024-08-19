import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components-parser/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minWidth: {
        '250': '250px',
        '300': '300px',
        '1000': '1000px',
        // ...add other min-width values as needed
      },
      colors: {
        primary: "#292779",
        secondary: "#FFB800",
        green: "#BDFF00",
      },
      backgroundImage: {
        banner: "url(/public/img/banner-bg.png)",
        dp: "url(/public/img/dp.jpg)",
        post: "linear-gradient(#0003, #0009),url(/public/img/cover.jpg)",
      },
      gridTemplateColumns: {
        listItem: "35px 1fr",
        body: "200px 1fr",
        itemsSentences: "399px 1fr",
        blogSideLeft: "48px 1fr 40px",
        blogSideRight: "48px 1fr 120px",
        blogs: "1fr 200px",
        closeBlogs: "1fr 80px",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' for system preference
}
export default config