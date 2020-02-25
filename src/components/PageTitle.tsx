import React from "react";
import { BigRow, BigCol } from "./Big";
import { FlexCol } from "./Flex";
import { routerStore } from "../store/RouterStore";



interface PageBreadcrumbsProps {
  items: {
    title: string;
    url?: string;
  }[]
}

export const PageBreadcrumbs = (props: PageBreadcrumbsProps) => {

  const items = props.items.concat();

  items.unshift({
    title: "Главная",
    url: "/"
  });

  return (
    <PageTitle>
      {items.map((i, idx) => {
        if (!i) return null;

        return (
          <React.Fragment key={i.title}>
            <a
              style={{
                textDecoration: i.url ? null : "none"
              }}
              onClick={e => {
                e.preventDefault();
                if (!i.url) return;
                routerStore.push(i.url);
              }}
              href={i.url}>
              {i.title}
            </a>

            {
              items[idx + 1] ?
              " > " : null
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
        <BigCol md={12} onClick={() => {
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