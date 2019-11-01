import { decorate, observable, action } from "mobx";

export class MenuStore {
  isCollapsed: boolean = true

  toggle = () => {
    this.isCollapsed = !this.isCollapsed;
  }
}

decorate(MenuStore, {
  isCollapsed: observable,
  toggle: action
});

export const menuStore = new MenuStore();