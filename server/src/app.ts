import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import lusca from 'lusca';
import rateLimit from 'express-rate-limit';

import { appConfig } from './config';
import { bootable } from './components';
import { logger } from './components';
import * as phases from './phases';
import * as middleware from './middleware';

export const app = bootable(express(), logger);

app.phase(phases.processEvents, 'process-events');
app.phase(phases.createServer, 'create-server');
app.phase(phases.knex, 'knex');
app.phase(phases.postgres, 'postgres');
app.phase(phases.upsertSemesters, 'upsert-semesters');
app.phase(phases.upsertCourses, 'upsert-courses');
app.phase(phases.upsertCourseMetrics, 'upsert-course-metrics');
app.phase(phases.upsertSpecializations, 'upsert-specializations');
app.phase(phases.indexReviews, 'index-reviews');

app.use(compression());

app.options('*', cors());

app.use(bodyParser.raw());
app.use(bodyParser.text({ type: ['*/xml'], limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(middleware.cors());
appConfig.rateLimit && app.use(rateLimit({ windowMs: 500, max: 10 }));
app.use(middleware.morgan());
app.use(middleware.user());
app.use(middleware.error());
