import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TodosListService extends Service {

       @tracked todos = [];


     addItem(item){
        this.todos.pushObject(item);
    }

    removeItem(id){
        this.todos = this.todos.filter(item => item.id !== id);
    }
    completed(){
        return this.todos.filter(item => item.is_completed == 1).length;
    }  
    notCompleted(){
        return this.todos.filter(item => item.is_completed == null).length;
    } 
    shared(id){
        this.todos = this.todos.map(function(item){
            if(item.id == id){
                item.shared = true;    
            }
            return item;
        });
    }  
}
