import { Express } from 'express';
import Services from '@services/Services';
import { join } from 'path';

export default class RoutesServices extends Services {
  static async instanceRoutes(app: Express): Promise<void> {
    try {
      const instanceDirectory = this.instanceDirectory('../../src/routes');
      for (const file of instanceDirectory.files) {
        await import(join(instanceDirectory.directory, file)).then((module) =>
          module.default(app),
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
