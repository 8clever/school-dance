import { decorate, observable, action, observe } from "mobx";

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

observe(menuStore, "isCollapsed", () => {
  console.log("CHanged")
  const evt = new Event("resize");
  window.dispatchEvent(evt);
})