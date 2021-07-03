import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardController extends Controller {
    @service store;
    @service('todos-list') todosListService; 
    @tracked title;
    @tracked description;
    @tracked isShowingModal = false;
    @tracked isShowingModalShare = false;
    @tracked completed = 0;
    @tracked not_completed = 0;
    @tracked users = [];
    @tracked users_to_share = [];
    @tracked item_to_share = [];

      @action toggleModal() {
        this.toggleProperty('isShowingModal');
      }
      @action async toggleModalShare(item) {
        this.toggleProperty('isShowingModalShare');
        this.item_to_share = item;
        if(this.users.length == 0){
            const data  = await this.store.findAll('share');
            this.users=data.toArray();
        }
      }

    @action async add(e){
        e.preventDefault();
        let { title, description} = this;
        const data  = await this.store.createRecord('list',{ title, description} ).save();
        this.todosListService.addItem(data);
        this.toggleProperty('isShowingModal');
        this.title = '';
        this.description = '';
        this.statistics();
    }
    
    @action
    update(attr,e) {
      this[attr] = e.target.value;
    }
    @action
     deleteItem(item) {
         item.deleteRecord();
         item.save();
         this.todosListService.removeItem(item.id);
         this.statistics();
    }

    @action
     doneItem(item) {
        if(item.is_completed){
            return;
        }
        item.is_completed = 1;
        item.save();
        this.statistics();
    }

    @action statistics(){
        this.completed = this.todosListService.completed();
        this.not_completed = this.todosListService.notCompleted();
    }

    @action addToShare(id){
        id = parseInt(id);
        if(this.users_to_share.includes(id)){
            this.users_to_share = this.users_to_share.filter(function(value, index, arr){ 
                return value != id;
            });
        }else{
            this.users_to_share.push(id);
        }
    }
    @action async share(){
       if (this.users_to_share.length == 0 || this.item_to_share.length == 0) return;

       let res = await this.store.createRecord('share', {
           id:this.item_to_share.id,
           name:'',
           users_to_share: this.users_to_share
      });
      res.save();
      this.todosListService.shared(this.item_to_share.id);
       this.users_to_share = [];
       this.item_to_share = 0;
       this.toggleProperty('isShowingModalShare');
       
       
    }
}
