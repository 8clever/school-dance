import React from "react";
import { Base } from "../components/Base"
import { BigRow, BigCol, BigButtonColMin } from "../components/Big";
import { Icon } from "../components/Icon";
import { routerStore } from "../store/RouterStore";

export const messages = [
  {
    icon: "tshirt",
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
    icon: "map-marker-alt",
    title: "КАК НАС НАЙТИ",
    desc: [
      `
        Наша Студия находится на острове Новая Голландия. На 3 этаже в здании "Бутылка".
        Даже если вы впервые в Новой Голландии, то здание "Бутылка" узнаете сразу.
        Круглое по своей форме, оно находится сразу напротив входа на остров.
      `,
      `
        Войдя в здание вам необходимо подняться на 3 этаж на лифте или по одной из
        лестниц и продолжить движение по кругу до вывески Context Pro.
      `
    ]
  },
  {
    icon: "shopping-bag",
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

const links = [
  {
    title: "НАПРАВЛЕНИЯ",
    link: "/"
  },
  {
    title: "ПОСМОТРЕТЬ НА КАРТЕ",
    link: "/contacts"
  },
  {
    title: "АБОНЕМЕНТЫ",
    link: "/subscribe"
  }
]

export const FirstVisit = () => {
  return (
    <Base>
      <BigRow>
        {
          messages.map((m,idx) => {
            return (
              <BigCol 
                key={idx}
                className="text-center">
                <div style={{ padding: "200px 40px" }}>
                  <Icon type={m.icon} size="3x" />
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
        {
          links.map((l, idx) => {
            return (
              <BigButtonColMin
                md={4}
                onClick={() => {
                  routerStore.push(l.link)
                }}
                key={idx}>
                {l.title}
              </BigButtonColMin>
            )
          })
        }
      </BigRow>
    </Base>
  )
}