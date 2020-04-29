<div align="center">
    <img alt="Covid-19 logo" src="https://raw.githubusercontent.com/readablereport/covid/master/static/covid19-rr-lg.jpg" />
</div>

<div align="center">
    <p><strong>Local Covid-19 Stats &amp; News</strong></p>
</div>

<div align="center">
    <p>
        <a href="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000">
            <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" alt="Version" style="max-width: 100%;" />
        </a>
        <a href="https://github.com/readablereport/covid/blob/master/LICENSE">
            <img src="https://img.shields.io/github/license/readablereport/covid" alt="MIT License" style="max-width: 100%;" />
        </a>
        <a href="https://github.com/readablereport/covid/issues">
            <img src="https://img.shields.io/github/issues/readablereport/covid" alt="Issues" style="max-width: 100%;" />
        </a>
    </p>
</div>

<div align="center">
    <p>The overall goal of this project is to make a data hub for a community (city, town, village).</p>
</div>

### [Live Site](https://covid19.readable.report)

## Install

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Setup

If you want to run the full site locally, you'll need to setup Environment Variables by creating a `.env` file at the root of the project with the contents:

```
NODE_ENV=dev
PLACES_APP_ID=XXXXXXXXXXXX
PLACES_API_KEY=XXXXXXXXXXXX
API_URL=https://api.covid.readable.report
```

We use [Nuxt dotenv module](https://github.com/nuxt-community/dotenv-module) to pull in Environment Variables.

You can signup for a free [Algolia](https://www.algolia.com/users/sign_up/places) Places account to get API keys.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/readablereport/covid/issues). You can also use the labels to sort by [feature](https://github.com/readablereport/covid/labels/enhancement) or [bug](https://github.com/readablereport/covid/labels/bug). We also have a [contributing guide](https://github.com/readablereport/covid/blob/master/CONTRIBUTING.md) you can look at.

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/readablereport/covid/LICENSE) licensed.

## Author

👤 **Readable Report**

-   Website: https://readable.report/
