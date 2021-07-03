import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @tracked errorMessage;
  @tracked email;
  @tracked password;
  @service session;

  @action
  async login(e) {
    e.preventDefault();
    let { password ,email} = this;
    let is_login = true;
    
    try {
      await this.session.authenticate('authenticator:token', {email,is_login}, password);
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