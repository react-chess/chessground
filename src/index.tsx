import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Chessground as ChessgroundApi } from 'chessground';
import { Config } from 'chessground/config';
import { Api } from 'chessground/api';
import { Key } from 'chessground/types';


interface Props {
  width?: number;
  height?: number;
  contained?: boolean;
  config?: Config;
};

const Chessground = forwardRef<Api | undefined, Props>(
  (
    { width = 900, height = 900, config = {}, contained = false }: Props,
    apiRef,
  ) => {
    const [api, setApi] = useState<Api | undefined>();
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(apiRef, () => {
      return api;
    }, [api]);

    useEffect(() => {
      if (divRef.current && !api) {
        const chessgroundApi = ChessgroundApi(divRef.current, config);
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

export type { Api, Config, Key };
export default Chessground;