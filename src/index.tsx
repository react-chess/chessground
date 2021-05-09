import React, { useEffect, useRef, useState } from 'react';
import { Chessground as ChessgroundApi } from 'chessground';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

import { Api } from 'chessground/api';
import { Config } from 'chessground/config';

import * as cg from 'chessground/types';

interface Props {
  width?: number
  height?: number
  config?: Partial<Config>
  fen?: cg.FEN
}

function Chessground({
  width = 900, height = 900, config, fen,
}: Props) {
  const [api, setApi] = useState<Api | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current && !api) {
      const chessgroundApi = ChessgroundApi(ref.current, {
        resizable: true,
        animation: { enabled: true, duration: 200 },
        ...(config ?? {}),
      });
      setApi(chessgroundApi);

      return () => api!.destroy();
    }
    return () => {};
  }, [ref, config, api]);

  useEffect(() => {
    api?.set({ fen });
  }, [api, fen]);

  return (
    <div style={{ height, width }}>
      <div ref={ref} style={{ height: '100%', width: '100%', display: 'table' }} />
    </div>
  );
}

export default Chessground;
