import DS from 'ember-data';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import config from 'todo/config/environment';

export default DS.RESTAdapter.extend({
  session: inject('session'),
  host: config.apiBaseUrl ,
  headers: computed('session.isAuthenticated', 'session.data.authenticated.token', function() {
    if (this.session.isAuthenticated) {
      return {
        Authorization: `Bearer ${this.session.data.authenticated.token}`,
      };
    } else {
      return {};
    }
  }),

  handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      this.session.invalidate();
    }
    return this._super(...arguments);
  },
});