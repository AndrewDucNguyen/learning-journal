# Webpack
- ES6 and NPM can reduce performance especially as more third party files are imported
- bundlers provide us wit hthe power to process and optimize our code
    - The cost is that we need to confire a bundler

## Bundling
- Bundler deals with entry point and dependecy graph
    - You provide the bundler an entry point
    - It'll build a dependency graph from that file and combine all relevant files together then output a single file with all the necessary code included
- While it does that, we can have it do other things such as:
    - minifying our code
        - process of removing all unnecessary characters from the source cod without changing its functinoality
        - general data compression
    - Image optimization
    - Treeshaking
        - Removal of dead code
        - Relies on import and export

## Webpack
- Most popular JS bundler
- Install
```bash
npm install --save-dev webpack webpack-cli
```
- `--save-dev` or `-D` for short, tells npm to record the two packages as development dependencies
- After installing, it'll create:
    - `node_modules`: where Webpack's actual code lives
    - `package-lock.json`: another file npm uses to track more specific package information


## Src and dist
- Two very important directories when dealing with Webpack. Theres are called directories:
    - `src`: Short for 'source'
        - Keep all of our websites source code
        - All work will be done other than configuration
    - `dist`: Short for distribution
        - When we run Webpack to bundle, it'll output the bundled files into `dist` directory
        - If someone were to fork or clone the project, they would not need the `dist` directory becuase they;d just be able to run Webpack to build from `src` into their own `dist`
        - To deploy our website, we would only need the `dist` code and nothing else

## Bundling JavaScript
- With ESM (ES6) we need to specify file extensions when importing from other files
    - With Webpack and many other bundlers, some file extensions (like `.js`) are optional. Webpack automatically check extensionless file paths for `.js` files by default
- `src`/
    - `index.js` -> js code
    - `greeting.js` -> js code
- `webpack.config.js` -> create this inside root
    ```js
    // webpack.config.js
    import path from "node:path";

    export default {
        mode: "development",
        entry: "./src/index.js",
        output: {
            filename: "main.js",
            path: path.resolve(import.meta.dirname, "dist"),
            clean: true,
        },
    };
    ```
    - `mode`: Either development or production
    - `entry`: File path from config file to whichever file is our entry point
    - `output`: An object containing information about the output bundle
        - `filename`: Name of the output bundle - can be anything you want
        - `path`: Path to output directory, it is the `dist` in this case. If directory doesn't exist whe nwe run Webpack, it'll automatically create it
        - `clean`: If `true`, each time we run Webpack to bundle, it will empty the output directory first before bundling the files into it. Helps us keep `dist` clean to only contain files produced by the most recent bundling
- Run webpack via npx
```bash
npx webpack
```
## Handling HTML
- Since HTML isn't JS, Webpack can't just bundle it straight away
    - Have to install `HtmlWebpackPlugin`
```bash
npm install --save-dev html-webpack-plugin
```
- Following the same folder structure as above:
- `webpack.config.js`
```js
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
};
```
- All we're doing is making sure Webpack configuration has access to HtmlWebpackPlugin then adding it as pugin to configuration object.
    - We will utilizing `template` for the html file
- We provide path to html as in template
- When we run `npx webpack`, `dist` will contain `main.js` and `index.html`
    - Will automatically add a deffered script tag to our `index.html` file

## Loading CSS
- Again, we will need to install a package to handle CSS
```bash
npm install --save-dev style-loader css-loader
```
- `css-loader` will read any CSS file we import in a JS file and store the result in a string
- `style-loader` takes that string and acutally adds the JS code that will apply those styles to the pages
- Need to configure `webpack.config.js`
```js
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```
- All this does is tell WEbpack that if it encounters an imported file ending with `.css` it should use hte listed loaders to process that CSS file
- Loader order matters for CSS
    - `css-loader` has to be at end
    - Webpack run loaders starting at the end
- When you run `npx webpack`, you'll see the styled html when you open it
- We don't link our CSS file in the HTML template 

## Loading images
- Images will require a little extra configuration since they're not JS files
- There are three different ways to deal with loca image files:
    1. Image files used in our CSS inside `url()`
        - `css-loader` already handles this for us, so nothing extra to do
    2. Image files we reference in our HTML template, e.g. as teh `src` of an `<img>`
        - Need to install `html-loader` which will detect image file paths in HTML template and load the right image files
        - `npm install --save-dev html-loader`
        - Add `module.rules` array within `webpack.config.js`
        ```js
        // webpack.config.js
        {
        test: /\.html$/i,
        use: ["html-loader"],
        }
        ```
    3. Images we use in our JavaScript, where we will need to import the files
        - Need to import the images into our JS module
        - Need to tell Webpack that these files will be assets by adding an `asset/resource` rule. No need to install anything
        - Just need to add the object to `module.rules` inside `webpack.config.js`
        ```js
        // webpack.config.js
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        }
        ```
        - Just need to import image into the JS file to use or else if we just wrote `image.src = "./odin.png";` the file path would just be a plain string and won't be bundled into dist
- End file should look like this
```js
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```
- Image will have different name. By default, Webpack gives your bundled image files a new name by hashing their contents
- This is to prevent issues with the browser cache and matching file names
- Only configure what you need in Webpack

## Webpack dev server
- If we got annoyed with having to run `npx webpack` to rebundle every change, there are solutions for this
    - `webpack-dev-server`
```bash
npm install --save-dev webpack-dev-server
```
- You don't have to keep running `npx webpack` after every change. Bundles our code behind the scene like running `npx webpack` but without saving the files to `dist`
- Its every time you save a file
- Only need to add a couple more properties in the configuration object (order does not matter)
```js
// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```
- Source map is important because if any error messages occur, we won't necessarily match up to the correct files and line numbers from development code
- We also won't be able to find original untouched code, making the Chrome debugger harder to user. Source map solves that
- Only auto-restarts when it detects any changes to files we import intout the JavaScript bundle, so the HTML template will be ignored..
    - Thats why we add it to the dev server's array of watched files
- Just run this command after
```bash
npx webpack serve
```
- Webpack-dev-server only reads your webpack configuratio nwhen it starts. If the webpack config is changed while the dev server is running, it will not reflect. You will have to restart the server

## Core concepts
- Entry
    - Indicates which module webpack should use to begin building out its internal dependency graph
    - Webpack will figure out which other modules and libraries the entry point depends on
    - Default is `./src/index.js`
- Output
    - Tells webpack where to emit the bundles it creates and how to name these files
    - Defaults to `./dist/main.js` for main output file and to the `./dist` folder for any other generated file
- Loaders
    - Out of the box, webpack only understands JavaScript and JSON files. Loader allows webpack to process other types of files and convert them into valid modules that can be consumed by application and added to dependency graph
    - High level, loaders have two properties
        1. `test`: identifies which file/files should be transformed
        2. `use`: indidcates which loader should be used to do the transforming
- Plugins
    - Can be leveraged to perform a wider range of tasks like bundle optimization, assest management, and injection of environment variables
    - Need to import a plugin and add it to the `plugins` array to use
- Mode
    - Can enable webpacks built-in optimization that correspond to each environment.
    - Default is `production`
    - Has three modes
        1. `development`
        2. `production`
        3. `none`

## npm
- `prepublish`: This script runs before the package is packed and published, and is used to prepare the package for distribution.

- `prepare`: This script runs both during local development and when the package is installed as a dependency of another package. It is used to prepare the package for use, such as by building or compiling the code.

- `preinstall`: This script runs before the package is installed and is used to perform any necessary setup tasks before dependencies are installed.

- `postinstall`: This script runs after the package is installed and is used to perform any necessary setup tasks after dependencies are installed.

- `preuninstall`: This script runs before the package is uninstalled and is used to perform any necessary cleanup tasks before dependencies are removed.

- `postuninstall`: This script runs after the package is uninstalled and is used to perform any necessary cleanup tasks after dependencies are removed.

- `preversion`: This script runs before the version of the package is updated and is used to perform any necessary tasks before the version is changed.

- `postversion`: This script runs after the version of the package is updated and is used to perform any necessary tasks after the version is changed.
