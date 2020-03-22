import React from "react";
import { Base } from "../components/Base"
import { BigRow, BigCol } from "../components/Big";

import shirtPNG from "../images/icons/tsh.png";
import pointPNG from "../images/icons/point.png";
import bagPNG from "../images/icons/bag.png";
import { PageBreadcrumbs } from "../components/PageTitle";
import { FlexCol } from "../components";

export const messages = [
  {
    icon: shirtPNG,
    title: "ОДЕЖДА ДЛЯ ЗАНЯТИЯ",
    desc: [
      `
        Если вы решили посетить балетный класс вам понадобятся 
        балетные тапочки (первый урок можно заниматься в носках), 
        леггинсы и футболка.
      `,
      `На детский урок по танцевальному театру необходимы спортивные брюки и футболка, носки`
    ]
  },
  {
    icon: pointPNG,
    title: "КАК НАС НАЙТИ",
    desc: [
      `
        Наша Студия находится на острове Новая Голландия. На 3 этаже в здании "Бутылка".
        Даже если вы впервые в Новой Голландии, то здание "Бутылка" узнаете сразу.
        Круглое по своей форме, оно находится сразу напротив входа на остров.
      `,
      `
        Войдя в здание вам необходимо подняться на 3 этаж на лифте или по одной из
        лестниц и продолжить движение по кругу до вывески Studio Context.
      `
    ]
  },
  {
    icon: bagPNG,
    title: "ЧТО ДОПОЛНИТЕЛЬНО НЕОБХОДИМО ВЗЯТЬ С СОБОЙ",
    desc: [
      `
        Каждому гостю Студии выдается ключ-браслет от индивидуального шкафчика
        и полотенце.
      `,
      `
        При получении ключа нужно будет оставить залог в размере 1000 рублей
        или документ (водительские права, СТС на авто, пенсионное удостоверение).
      `,
      `
        По окончанию занятия вам вернут залог в обмен на ключ и полотенце.
      `
    ]
  }
]

export const FirstVisit = () => {
  return (
    <Base>
      
      <FlexCol column>
        <PageBreadcrumbs
          items={[
            {
              title: "Первое посещение"
            }
          ]}
        />

        <BigRow className="h-100">
          {
            messages.map((m,idx) => {
              return (
                <BigCol 
                  key={idx}
                  className="text-center d-md-h-100">
                  <div style={{ padding: "200px 40px" }}>
                    <img height={60} src={m.icon} />
                    <div className="mt-4"></div>
                    <h4>{m.title}</h4>
                    <div className="mt-4"></div>

                    {m.desc.map((d, idx) => {
                      return (
                        <p key={idx}>{d}</p>
                      )
                    })}                    
                  </div>
                </BigCol>
              )
            })
          }
        </BigRow>
      </FlexCol>
    </Base>
  )
}