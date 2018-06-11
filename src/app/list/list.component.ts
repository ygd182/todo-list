import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ListService } from './list.service';
import { Todo } from './../models/todo';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  destroy: Subject<any> = new Subject<any>();
  toDoList: any[];
  toDoText: string;

  constructor(private listService: ListService) {
  }

  ngOnInit() {
    this.toDoText = '';
    this.listService.getTodosSubscription().takeUntil(this.destroy).subscribe( toDos => this.toDoList = toDos);
  }

  selectAll() {
    this.listService.selectAllToDos();
  }

  unSelectAll() {
   this.listService.unSelectAllToDos();
  }

  deleteSelected() {
    this.listService.deleteSelectedToDos();
  }

  addToDo() {
    let todo = new Todo(this.toDoText);
    this.listService.addToDo(todo);
    this.toDoText = '';
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}


