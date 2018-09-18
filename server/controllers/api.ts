'use strict';

import { graph } from 'fbgraph';

import { Response, Request, NextFunction } from 'express';


/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((tokenResult: any) => tokenResult.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  // tslint:disable-next-line:max-line-length
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile: results
    });
  });
};
