const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        outline: "#FFD4A7",
        body: "#F5F5F5",
        font: {
          pink: "#D82C80",
        },
        translucent: "rgba(229, 122, 140, 0.5)",
        gray: {
          "50": "#E1EBEE",
          "100": "#D9D9D9",
          "200": "#B3B3B3",
          "300": "#8C8C8C",
          "400": "#666666",
          "500": "#4D4D4D",
          "600": "#0A0A0A",
          "700": "#00222F",
          "800": "#00131D",
          background: "#F6F6FA",
        },
        pink: {
          "50": "#FFD4A7",
          "100": "#DFB2C8",
          "200": "#E08DB6",
          "300": "#DE65A1",
          "400": "#DB4C92",
          "500": "#D82C80",
          "600": "#D61070",
        },
        primary: {
          "50": "#FFF5FA",
          "100": "#FF809F",
          "200": "#FF3D6B",
          "300": "#FF1A47",
        },
        secondary: {
          "50": "#FFE2C3",
          "100": "#FFE0BF",
          "200": "#FFAF5A",
          "300": "#FF8C3A",
        },
      },
      backgroundImage: {
        "nav-gradient": "linear-gradient(45deg, #DB4C92 0%, #D61070 100%)",
        "home-hero": "url('/assets/beauty-hero.png')",
        "card-gradient": "linear-gradient(180deg, #DB4C92 0%, #D61070 100%)",
      },
      boxShadow: {
        card: "0px 4px 49px 0px rgba(0, 0, 0, 0.10)",
        "card-sm": " 0px 4px 49px 0px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        lateef: ['"Lateef"', "serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },

      fontSize: {
        "header1-lg": ["64px", { fontWeight: "bold" }],
        "header1-sm": ["48px", { fontWeight: "bold" }],
        "header2-lg": ["48px", { fontWeight: "bold" }],
        "header2-sm": ["32px", { fontWeight: "bold" }],
        "header3-lg": "32px",
        "header3-sm": "24px",
        "header4-lg": ["24px", { fontWeight: "bold" }],
        "header4-sm": ["18px", { fontWeight: "bold" }],
        header5: "36px",
        header6: ["24px", { lineHeight: "32px" }],
        header7: "18px",
        "header-2-sm": "30px",
        "paragraph-lg": "16px",
        "paragraph-sm": "12px",
        xxxs: "10px",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
