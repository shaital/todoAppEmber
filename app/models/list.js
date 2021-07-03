import Model, { attr } from '@ember-data/model';

export default class ListModel extends Model {
  //@attr id;
  @attr title;
  @attr description;
  @attr user_id;
  @attr is_completed;
  @attr shared;
  @attr shared_by_user_id;
}