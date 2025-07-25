# Recipe App

Store and share recipes.

* Light and Dark Theme with Material Colors
* Context API
* Styled Components
* Typescript
* node / express backend (separate repository)

## Run locally
* add .env file

```
#development
REACT_APP_BASEURL
REACT_APP_RECIPE_ENDPOINT
...
```

## GH Pages Helpful Resources
* https://create-react-app.dev/docs/deployment/#building-for-relative-paths


## Publish workflow
- Master branch is used for gh pages deploy (do not use it)
- Main branch is default branch
- From default branch pull latest changes you want to deploy
- .env switch localhost:5000 to production API
- The publish workflow below is separate from branch management

```
# npm run deploy
```
>
> "deploy": "gh-pages -b master -d build"
>

## Node
- currently running on 16.13.0
