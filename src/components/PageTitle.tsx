import React from "react";
import { BigRow, BigCol } from "./Big";
import { FlexCol } from "./Flex";
import { routerStore } from "../store/RouterStore";
import iconRightPNG from '../images/icons/arrow-right.png';
import _ from "lodash";


interface PageBreadcrumbsProps {
  items: {
    title: string;
    onClick?: () => void;
    url?: string;
  }[]
}

export const PageBreadcrumbs = (props: PageBreadcrumbsProps) => {

  const items = React.useMemo(() => {
    const items = _.compact(props.items.concat());
    items.unshift({
      title: "Главная",
      url: "/"
    });
    return items;
  }, [ props.items ]);

  return (
    <PageTitle>
      {items.map((i, idx) => {

        const disabled = !(
          i.url ||
          i.onClick
        )

        return (
          <React.Fragment key={i.url || idx}>
            <span className={disabled ? "" : "big-col"}>
              <a
                style={{
                  textDecoration: disabled ? "none" : null
                }}
                onClick={e => {
                  e.preventDefault();
                  if (i.onClick) i.onClick();
                  if (i.url) routerStore.push(i.url);
                }}
                href={i.url}>
                {i.title}
              </a>
            </span>


            {
              items[idx + 1] ?
              <img 
                style={{
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: 1
                }}
                width={15} 
                src={iconRightPNG} /> : 
              null
            }
          </React.Fragment>
        )
      })}
    </PageTitle>
  )
}

interface PageTitleProps {
  children: React.ReactNode;
  marquee?: boolean;
}

export const PageTitle = (props: PageTitleProps) => {
  
  const [ play, setPlay ] = React.useState(true);
  
  return (
    <>
      <BigRow>
        <BigCol 
          md={12}
          onClick={() => {
            setPlay(!play)
          }}>
          <FlexCol justify="between" align="center">
            <div 
              className={props.marquee ? "marquee" : ""}
              style={{ 
                padding: 5 
              }}>
                <span className={play ? "" : "stop"}>
                  {props.children}
                </span>
            </div>
            <div style={{ padding: 5 }}></div>
          </FlexCol>
        </BigCol>
      </BigRow>
    </>
  )
}