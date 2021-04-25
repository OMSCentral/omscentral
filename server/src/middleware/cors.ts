import cors from 'cors';
import { RequestHandler } from 'express';
import { IncomingHttpHeaders } from 'http';

import { logger } from '../components';
import { corsConfig } from '../config';
import { isGooglebot } from '../utils';

const isTrusted = ({ origin }: IncomingHttpHeaders): boolean => {
  const { allowlist } = corsConfig;
  return !allowlist.length || (!!origin && allowlist.includes(origin));
};

export const middleware = (): RequestHandler =>
  cors(async (req, cb) => {
    const { headers } = req;

    if (
      req.method === 'OPTIONS' ||
      isTrusted(headers) ||
      (await isGooglebot(headers))
    ) {
      return cb(null, { origin: true });
    }

    logger.debug('middleware(cors):', { headers });

    return cb(new Error(`CORS [origin=${headers.origin || ''}]`), {
      origin: false,
    });
  });
