export default {
    env: {
        PLACES_APP_ID: "plQP5A45PM0V",
        PLACES_API_KEY: "cd3cf9fdf488492b1127761c90b683f1",
        // API_URL: process.env.API_URL,
    },
    mode: "spa",
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || "",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#fff" },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~plugins/charts.js", mode: "client" },
        { src: "~plugins/leaflet.js", mode: "client" },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        "@nuxtjs/tailwindcss",
        "@nuxtjs/dotenv",
    ],
    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],

    axios: {
        proxy: true,
    },
    proxy: {
        "/api/": {
            target:
                "https://dm8eqjt1q0.execute-api.us-east-2.amazonaws.com/dev",
            pathRewrite: { "^/api/": "" },
        },
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
};
