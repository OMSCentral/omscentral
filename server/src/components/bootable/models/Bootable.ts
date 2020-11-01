import { Express } from 'express';

import { Phase } from './Phase';
import { Logger, BootFunction, PhaseFunction } from '../interfaces';

export class Bootable {
  /**
   * Phases that are to be executed [in order] prior to bootup.
   */
  private phases: Phase[];

  /**
   * Bootable class provides abstractions for booting up an express server in
   * sequential phases. If any phase fails, the bootup fails.
   *
   * Phases are good places to perform one-time initialization steps such as
   * connecting to external resources, populating caches, etc.
   *
   * @param app Express application that is to become bootable.
   * @param logger Logger for logging what is happening during bootup.
   */
  constructor(private app: Express, private logger: Logger) {
    this.phases = [];
  }

  /**
   * Registers a phase, which may be synchronous or asynchronous. If async, it
   * must invoke its only argument, a callback, when async operation is done.
   *
   * @param func
   * @param name
   */
  phase = (func: PhaseFunction, name: string): void => {
    this.phases.push(new Phase(func, name));
  };

  /**
   * Runs all phases sequentially in the order registered. If any phase throws
   * an error, the callback is invoked with that error, else with nothing.
   *
   * @param callback Callback to invoke when bootup is complete or errored.
   */
  boot = (callback: BootFunction): void => {
    this.logger.info('Bootup starting...');

    const done = (error?: Error): void => {
      if (error) {
        this.logger.info('Bootup errored.');
      } else {
        this.logger.info('Bootup done.');
      }
      callback(error);
    };

    if (!this.phases.length) {
      return done();
    }

    let i = 0;

    const next = (error?: Error): void => {
      // base case: some phase errored
      if (error) {
        return done(error);
      }

      const phase = this.phases[i++];

      // base case: no more phases
      if (!phase) {
        return done();
      }

      this.logger.info(`Phase [${phase.name}] starting...`);

      // recursive case: phase execution
      try {
        phase.func(this.app, (error?: Error) => {
          if (error) {
            this.logger.info(`Phase [${phase.name}] errored.`);
          } else {
            this.logger.info(`Phase [${phase.name}] done.`);
          }
          next(error);
        });
      } catch (error) {
        next(error);
      }
    };

    // start traversal
    next();
  };
}
