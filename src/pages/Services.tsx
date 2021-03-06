import React from "react";
import { observer } from "mobx-react-lite";
import { Base, Icon } from "../components";
import { PageBreadcrumbs } from "../components/PageTitle";
import { ServiceStore } from "../store/ServiceStore";
import { Table, Button } from "reactstrap";
import { toJS } from "mobx";
import { ServiceView } from "../components/ServiceView";
import { Service } from "../../server/models/Service";
import { userStore } from "../store/UserStore";
import { routerStore } from "../store/RouterStore";
import { I18nText } from "../components/Localization";

export const Services = observer(() => {
  
  const serviceStore = React.useMemo(() => new ServiceStore(), []);

  const [ visibleServiceView, setVisibleServiceView ] = React.useState(false);

  const [ token, setToken ] = React.useState("");

  const [ selectedServices, setSelectedServices ] = React.useState([] as Service[]);

  const forceRefresh = () => setToken(token === "" ? null : "");
  
  React.useEffect(() => {
    (async () => {
      await userStore.isLoggedin();
      if (!userStore.user) {
        routerStore.push("/auth");
        return;
      }
      await serviceStore.loadItems({}, { id: 1 });
    })()
  }, [ token ]);

  const services = React.useMemo(() => {
    return toJS(serviceStore.itemList, { recurseEverything: true });
  }, [ serviceStore.itemList ]);

  return (
    <Base>
      <PageBreadcrumbs 
        items={[
          {
            title: <I18nText text="Услуги" />
          }
        ]}
      />

      <div style={{ margin: 5 }}>
        <Button 
          onClick={() => {
            setSelectedServices([]);
            setVisibleServiceView(true)
          }}
          color="primary"
          size="sm">
          <Icon type="plus" className="mr-2" />
          <I18nText text="Добавить услугу" />
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <td>
              ID
            </td>
            <td>
              <I18nText text="Наименование" />
            </td>
            <td>
              <I18nText text="Описание" />
            </td>
            <td>
              <I18nText text="Стоимость (руб)" />
            </td>
            <td>
              <I18nText text="Специальное предложение" />
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {services.map(s => {
            return (
              <tr key={s._id as string}>
                <td>{s.id}</td>
                <td>
                  <I18nText text={s.name} />
                </td>
                <td>
                  <I18nText text={s.description} />
                </td>
                <td>{s.amount}</td>
                <td>
                  {
                    s.specialOffer ?
                    <Icon type='check' /> :
                    <Icon type='times' />
                  }
                </td>
                <td className="text-right">
                  <Icon 
                    onClick={() => {
                      setSelectedServices([s]);
                      setVisibleServiceView(true);
                    }}
                    type="edit" 
                    style={{
                      marginRight: 15,
                      cursor: "pointer"
                    }}
                  />
                  <Icon 
                    onClick={async () => {
                      await serviceStore.removeItemByID(s._id as string);
                      forceRefresh();
                    }}
                    type="trash"
                    style={{
                      cursor: "pointer"
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <ServiceView 
        visible={visibleServiceView}
        _id={selectedServices[0] && selectedServices[0]._id as string}
        toggle={() => setVisibleServiceView(false)}
        onSave={forceRefresh}
      />
    </Base>
  )
})