if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const API_URL = process.env.API_URL;
const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export default {
    env: {
        PLACES_APP_ID: process.env.PLACES_APP_ID,
        PLACES_API_KEY: process.env.PLACES_API_KEY,
        API_URL: API_URL
    },
    mode: "spa",
    /*
     ** Headers of the page
     */
    head: {
        title: "Local Covid-19 Reports",
        // titleTemplate: "%s",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: "COVID-19 stats and news specific to your state, county, and city"
            },
            {
                hid: "X-UA-Compatible",
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge"
            },
            // // Fb
            { hid: "og:title", name: "og:title", content: "Readable Report" },
            {
                hid: "og:description",
                name: "og:description",
                content: "COVID-19 stats and news specific to your state, county, and city"
            },
            { hid: "og:type", name: "og:type", content: "website" },
            { hid: "og:url", name: "og:url", content: "https://covid19.readable.report/" },
            {
                hid: "og:image",
                name: "og:image",
                content: `https://readable.report/img/social/facebook.png`
            },
            { hid: "og:locale", name: "og:locale", content: "en_US" },
            // // Twitter
            {
                hid: "twitter:card",
                name: "twitter:card",
                content: "summary_large_image"
            },
            {
                hid: "twitter:site",
                name: "twitter:site",
                content: "@readablereport"
            },
            {
                hid: "twitter:creator",
                name: "twitter:creator",
                content: "@readablereport"
            },
            {
                hid: "twitter:title",
                name: "twitter:title",
                content: "Readable Report"
            },
            {
                hid: "twitter:description",
                name: "twitter:description",
                content: "COVID-19 stats and news specific to your state, county, and city"
            },
            {
                hid: "twitter:image",
                name: "twitter:image",
                content: `https://readable.report/img/social/twitter.png`
            }
        ],
        link: [
            // Favicons
            {
                rel: "icon",
                type: "shortcut icon",
                href: "/favicon.ico"
            },
            {
                rel: "icon",
                type: "image/png",
                href: "/favicon-32x32.png",
                sizes: "32x32"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "57x57",
                href: "/apple-touch-icon-57x57.png"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "114x114",
                href: "/apple-touch-icon-114x114.png"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "72x72",
                href: "/apple-touch-icon-72x72.png"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "144x144",
                href: "/apple-touch-icon-144x144.png"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "120x120",
                href: "/apple-touch-icon-120x120.png"
            },
            {
                rel: "apple-touch-icon-precomposed",
                sizes: "152x152",
                href: "/apple-touch-icon-152x152.png"
            },
            {
                rel: "icon",
                type: "image/png",
                href: "/favicon-32x32.png",
                sizes: "32x32"
            },
            {
                rel: "icon",
                type: "image/png",
                href: "/favicon-16x16.png",
                sizes: "16x16"
            }
        ],
        script: [
            {
                src: "//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js",
                "data-dojo-config": "usePlainJson: true, isDebug: false"
            }
        ]
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
        { src: "~plugins/leaflet.js", mode: "client" }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        "@nuxtjs/tailwindcss"
    ],
    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/axios", "@nuxtjs/google-analytics", "@nuxtjs/dotenv"],

    axios: {
        browserBaseURL: API_URL
    },

    googleAnalytics: {
        id: GOOGLE_ANALYTICS_ID
    },

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
};
