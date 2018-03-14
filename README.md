# Guardian API

Simple [Guardian API](http://open-platform.theguardian.com/) application using [React](http://facebook.github.io/react/).

* a project with React and TypeScript
* linting with [TSLint](https://github.com/palantir/tslint)
* state management with [Redux](https://github.com/reactjs/react-redux)

# Install dependencies

```shell
yarn install
```

or

```shell
npm install
```

# Attention!

In order to use this project, after installing dependencies deleting a specific dependency is a must.

Delete this folder: `node_modules/@types/react-dom/node_modules`

This is typescript related bug - dependencies of typings doesn't match. This should be fixed shortly. As soon as this behaviour will be fixed this note will be removed.

# Startup development

```shell
yarn start
```

or

```shell
npm run start
```

This runs the `start` script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files.
Typically the server runs at `http://localhost:3000`, but should be automatically opened for you.

This tightens the iteration loop by allowing us to quickly preview changes.


# Project note:


* `tsconfig.json` contains TypeScript-specific options for our project.
* `tslint.json` stores the settings that our linter, [TSLint](https://github.com/palantir/tslint), will use.
* `package.json` contains our dependencies, as well as some shortcuts for commands we'd like to run for testing, previewing, and deploying our app.
* `public` contains static assets like the HTML page we're planning to deploy to, or images. You can delete any file in this folder apart from `index.html`.
* `src` contains our TypeScript and CSS code. `index.tsx` is the entry-point for our file, and is mandatory.

# Creating a production build

When running the project with `npm run start`, we didn't end up with an optimized build.
Typically, we want the code we ship to users to be as fast and small as possible.
Certain optimizations like minification can accomplish this, but often take more time.
We call builds like this "production" builds (as opposed to development builds).

To run a production build, just run

```sh
npm run build
```

```sh
yarn build
```

This will create an optimized JS and CSS build in `./build/static/js` and `./build/static/css` respectively.

You won't need to run a production build most of the time,
but it is useful if you need to measure things like the final size of your app.

# Serve already built project

Ready project is already built and ready to preview in `"/build"` folder.

To Serve this folder:

```sh
serve -s build
```

The console should show that a local server is up and ready to use.

# Next steps

* Writing tests
* Support & improvements for other browser