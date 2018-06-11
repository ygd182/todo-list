export class Todo {
  text: string
  checked: boolean;

  constructor(  
    text: string,
    checked: boolean = false) {
      this.text = text;
      this.checked = checked;
    }
}
