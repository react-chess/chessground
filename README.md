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

After installing, the component can be default imported and it has 5 optional props:

- `width: number` defaults to `900`, determines width of the chessboard in pxs

- `height: number` defaults to `900`, determines height of the chessboard in pxs

- `config: Config` defaults to `{}`, determines various [configuration properties](https://github.com/ornicar/chessground/blob/master/src/config.ts#L7-L90) of Chessground

- `contained: boolean` defaults to `false`, when enabled renders the chessboard in a `100%` width & height div.

- `ref: Api` returns an instance of the Chessground API for interacting with the chessboard.

Renders a simple `900 x 900` board, with pieces in their default position:

```jsx
import Chessground from "@react-chess/chessground";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

ReactDOM.render(<Chessground />, document.getElementById("root"));
```

## Example: showing the moves of a game

```tsx
import { useEffect, useRef } from "react";
import Chessground, { Api, Config, Key } from "@react-chess/chessground";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

const CONFIG: Config = {
  movable: { free: false },
};

// Demo game moves in long algebraic form
const MOVES = (
  "e2e4 e7e5 g1f3 d7d6 d2d4 c8g4 d4e5 g4f3 d1f3 d6e5 " +
  "f1c4 g8f6 f3b3 d8e7 b1c3 c7c6 c1g5 b7b5 c3b5 c6b5 " +
  "c4b5 b8d7 e1c1 a8d8 d1d7 d8d7 h1d1 e7e6 b5d7 f6d7 " +
  "b3b8 d7b8 d1d8"
).split(" ");

export const DemoGameMoves = () => {
  const apiRef = useRef<Api | undefined>();

  useEffect(() => {
    // Make a move every 2 seconds
    const interval = setInterval(() => {
      const move = MOVES.shift();
      if (move) {
        apiRef.current!.move(move.substring(0,2) as Key, move.substring(2,4) as Key);
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <Chessground
        width={640} height={640}
        config={CONFIG} ref={apiRef}
    />
  );
}
```