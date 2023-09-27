import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Chessground as ChessgroundApi } from 'chessground';
import { Config } from 'chessground/config';
import { Api } from 'chessground/api';
import { Key } from 'chessground/types';

export type LongAlgebraicMove = `${Key}${Key}`

interface Props {
  width?: number;
  height?: number;
  contained?: boolean;
  config?: Config;
}

export interface ApiRef {
  move: (moveStr: LongAlgebraicMove) => void;
}

const Chessground = forwardRef<ApiRef | undefined, Props>(
  (
    { width = 900, height = 900, config = {}, contained = false }: Props,
    apiRef,
  ) => {
    const [api, setApi] = useState<Api | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const publicApi: ApiRef = {
      move(moveStr: LongAlgebraicMove) {
        console.log("[MOVE]", moveStr)
        api!.move(moveStr.substring(0, 2) as Key, moveStr.substring(2,4) as Key)
      }
    }

    useImperativeHandle(apiRef, () => {
      return publicApi;
    }, [publicApi]);

    useEffect(() => {
      if (divRef.current && !api) {
        const chessgroundApi = ChessgroundApi(divRef.current, {
          animation: { enabled: true, duration: 200 },
          ...config,
        });
        setApi(chessgroundApi);
      } else if (divRef.current && api) {
        api.set(config);
      }
    }, [divRef.current, api]);

    useEffect(() => {
      if (api) {
        api.set(config);
      }
    }, [config]);

    return (
      <div style={{ height: contained ? '100%' : height, width: contained ? '100%' : width }}>
        <div ref={divRef} style={{ height: '100%', width: '100%', display: 'table' }} />
      </div>
    );
  }
);

export default Chessground;