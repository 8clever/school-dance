import { Api } from "./Api";
import { Service } from "../../server/models/Service";
import { toJS, decorate, observable } from "mobx";

export class ServiceStore extends Api<Service> {

  endpoint = "/api/v1/service/"

  item: Service = {
    amount: "0",
    description: "",
    name: "",
    id: ""
  }

  save = async () => {
    const service = toJS(this.item);
    return this.editItem(service);;
  }
}

decorate(ServiceStore, {
  item: observable
});