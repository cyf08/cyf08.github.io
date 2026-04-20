# Hexo Blog

This project is set up for deployment to GitHub Pages with GitHub Actions.

## Files you need to edit

This project is already configured for the GitHub Pages user site:

- GitHub username: `cyf08`
- Repository name: `cyf08.github.io`

The effective settings in `_config.yml` are:

```yml
url: https://cyf08.github.io
root: /
```

## Local commands

```bash
npm install
npm run server
npm run build
```

## Hexo Pro

`hexo-pro` is installed for local admin usage with `npx hexo server`.

- Local admin URL: `http://localhost:4000/pro/`
- It does not run on GitHub Pages because GitHub Pages only serves static files.
- Runtime data is stored under `data/` and is git-ignored.

## GitHub setup

1. Create the GitHub repository `cyf08.github.io`.
2. Push this project to the `main` branch.
3. In the repository, open `Settings -> Pages`.
4. Set `Source` to `GitHub Actions`.
5. Wait for the workflow in `Actions` to finish.
