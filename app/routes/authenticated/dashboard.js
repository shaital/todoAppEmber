import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedDashboardRoute extends Route {
    @service store;
    @service('todos-list') todosListService; 

    async model() {
      const data  = await this.store.findAll('list');
      this.todosListService.todos=data.toArray();
      return data.toArray();
    }
    setupController(controller, model) {
        super.setupController(controller, model);
      }
}
