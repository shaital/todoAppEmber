import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class RegisterController extends Controller {
  @tracked errorMessage;
  @tracked identification;
  @tracked email;
  @tracked password;
  @service session;

  @action
  async authenticate(e) {
    e.preventDefault();
    let { identification, password ,email} = this;
    let is_login = false;
    let data = {email,'name':identification,is_login};
    try {
      await this.session.authenticate('authenticator:token', data, password);
    } catch(error) {
      this.errorMessage = Object.values(error.json.error);
    }

    if (this.session.isAuthenticated) {

    }
  }

  @action
  update(attr,e) {
    this[attr] = e.target.value;
  }
}