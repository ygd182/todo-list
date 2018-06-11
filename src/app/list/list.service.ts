import { Injectable } from '@angular/core';
import { Todo } from './../models/todo';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ListService {

  toDoList: Todo[];
  private subject = new Subject<any>();

  constructor() {
    this.toDoList = [];
  }

  addToDo(todo: Todo) {
    this.toDoList.push(todo);
    this.subject.next(this.toDoList);
  }

  deleteSelectedToDos() {
    this.toDoList = this.toDoList.filter(toDo => !toDo.checked);
    this.subject.next(this.toDoList);
  }

  getTodosSubscription() {
    return this.subject.asObservable();
  }

  selectAllToDos() {
    this.changeListStatus(true);
    this.subject.next(this.toDoList);
  }

  unSelectAllToDos() {
    this.changeListStatus(false);
    this.subject.next(this.toDoList);
  }

  private changeListStatus(status: boolean) {
    this.toDoList = this.toDoList.map(toDo => {
      toDo.checked = status;
      return toDo;
    });
  }

}
