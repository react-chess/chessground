# Chessground &middot; [![npm (scoped)](https://img.shields.io/npm/v/@react-chess/chessground)](https://www.npmjs.com/package/@react-chess/chessground) [![Build Status](https://travis-ci.com/react-chess/chessground.svg?branch=main)](https://travis-ci.com/react-chess/chessground) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![ts](https://badgen.net/npm/types/tslib)

Chessground is a React Wrapper package for the original [Chessground](https://github.com/ornicar/chessground) UI developed for [lichess.org](https://lichess.org). This project also contains zero chess logic, please visit [chess.js](https://github.com/jhlywa/chess.js) for validation/generation.

This package is in early stages of development, thus usage of this package in TypeScript is highly recommended.

## Installation

Currently the package has `peerDependencies` on `react: ^16.8.0 || ^17.0.0 || ^18.0.0` and `react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0`.

```shell
# If you are using npm:
npm install @react-chess/chessground

# If you are using yarn:
yarn add @react-chess/chessground
```

## Documentation

After installing, the component can be default imported and it has 4 optional props:

- `width: number` defaults to `900`, determines width of the chessboard in pxs

- `height: number` defaults to `900`, determines height of the chessboard in pxs

- `config: Config` defaults to `{}`, determines various [configuration properties](https://github.com/ornicar/chessground/blob/master/src/config.ts#L7-L90) of Chessground

- `contained: boolean` defaults to `false`, when enabled renders the chessboard in a `100%` width & height div.

Renders a simple `900 x 900` board, with pieces in their default position:

```jsx
import Chessground from "@react-chess/chessground";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

ReactDOM.render(<Chessground />, document.getElementById("root"));
```
