import Model, { attr } from '@ember-data/model';

export default class ShareModel extends Model {

  @attr name;
  @attr users_to_share;

}