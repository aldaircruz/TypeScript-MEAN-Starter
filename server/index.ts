import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const PORT = process.env.PORT || 4000;
const INDEX = join(process.cwd(), 'dist', 'public');

// Express server
import app from './app';

app.use('/', express.static(INDEX));

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
