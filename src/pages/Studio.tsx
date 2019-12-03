import React from "react";
import { Base, BigRow, BigButtonCol, BigCol } from "../components";
import { routerStore } from "../store/RouterStore";
import { Carousel } from "../components/Carousel";

import studio1PNG from "../images/studio/studio.png"
import { teacherStore } from "../store/TeacherStore";
import { Teacher } from "../../server/models/Teacher";
import { Leader } from "../../server/models/Leaders";
import { leaderStore } from "../store/LeaderStore";

interface StudioMenuProps {
  active?: "leaders" | "teachers" | "history"
}

export const StudioMenu = (props: StudioMenuProps) => {

  const [ teacher, setTeacher ] = React.useState<Teacher | null>(null);
  const [ leader, setLeader ] = React.useState<Leader | null>(null);

  React.useEffect(() => {
    Promise.all([
      teacherStore.getItems({}, {}, 1),
      leaderStore.getItems({}, { fullName: 1}, 1)
    ]).then(([ teacher, leader ]) => {
      if (teacher.count) {
        setTeacher(teacher.list[0]);
      }

      if (leader.count) {
        setLeader(leader.list[0]);
      }
    })
  }, []);

  return (
    <BigRow style={{ fontFamily: "Styled Font" }}>
      <BigButtonCol 
        selected={props.active === "leaders"}
        onClick={() => {
          if (leader) {
            routerStore.push(`/leader/${leader._id}`);
            return;
          }
          
          routerStore.push("/leaders")
        }}>
        РУКОВОДСТВО
      </BigButtonCol>
      <BigButtonCol
        selected={props.active === "teachers"}
        onClick={() => {
          if (teacher) {
            routerStore.push(`/teacher/${teacher._id}`);
            return;
          }

          routerStore.push("/teachers")
        }}>
        ПЕДАГОГИ
      </BigButtonCol>
      <BigButtonCol>
        ИСТОРИЯ
      </BigButtonCol>
    </BigRow>
  )
}

export const Studio = () => {
  return (
    <Base>
      <BigRow>
        <BigCol md={12}>
          <Carousel 
            items={[
              {
                src: studio1PNG
              }
            ]}
          />
        </BigCol>
      </BigRow>
      <StudioMenu />
    </Base>
  )
}