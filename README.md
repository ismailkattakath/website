# website

[![Next.js version from package.json](https://img.shields.io/github/package-json/dependency-version/ismailkattakath/website/next)](package.json)

A portfolio site built from one JSON Resume: homepage, résumé and cover letter builder, and a /resume.json endpoint.

## Background

One file, `src/data/resume.json` in the [JSON Resume](https://jsonresume.org) format, feeds every
page. The site is a Next.js static export, deployed to GitHub Pages.

| Route             | What it is                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `/`               | the portfolio homepage: hero, about, skills, experience and contact                          |
| `/resume/builder` | an editor for the résumé and a cover letter, with live preview, JSON import/export and print |
| `/resume`         | the résumé as a printable page                                                               |
| `/resume.json`    | the résumé as a public JSON Resume document                                                  |
| `/book`           | a redirect to the calendar link in `basics.calendar`                                         |

## Install

```bash
git clone https://github.com/ismailkattakath/website.git
cd website
npm install
```

## Usage

```bash
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

Edit `src/data/resume.json`; every page follows it. Next steps:

|             |                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Tutorial    | [Quick start](QUICKSTART.md)                                                                                                                |
| How-to      | [Deploy to GitHub Pages](docs/how-to/deploy.md) · [Configuration](docs/CONFIGURATION.md)                                                    |
| Reference   | [Commands](docs/reference/commands.md) · [Features](docs/FEATURES.md)                                                                       |
| Explanation | [Architecture](ARCHITECTURE.md) · [Password protection](docs/explanation/password-protection.md) · [Development notes](docs/DEVELOPMENT.md) |

## Contributing

Issues and pull requests are welcome; see [CONTRIBUTING.md](CONTRIBUTING.md). Run `npm test` and
`npm run lint` before opening one.

## Acknowledgements

The résumé builder was inspired by [sauravhathi/atsresume](https://github.com/sauravhathi/atsresume).

## License

`package.json` declares MIT; the repository has no `LICENSE` file yet.
