import React from "react";
import { Base, BigRow, BigButtonCol, FlexCol } from "../components";
import { routerStore } from "../store/RouterStore";
import { teacherStore } from "../store/TeacherStore";
import { Teacher } from "../../server/models/Teacher";
import { Leader } from "../../server/models/Leaders";
import { leaderStore } from "../store/LeaderStore";
import { PageBreadcrumbs } from "../components/PageTitle";

interface StudioMenuProps {
  active?: "leaders" | "teachers" | "history"
}

export const StudioMenu = (props: StudioMenuProps) => {

  const [ teacher, setTeacher ] = React.useState<Teacher | null>(null);
  const [ leader, setLeader ] = React.useState<Leader | null>(null);

  React.useEffect(() => {
    Promise.all([
      teacherStore.getItems({}, { fullName: 1 }, 1),
      leaderStore.getItems({}, {}, 1)
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
    <BigRow className="h-100">
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

  const Breadcrumbs = () => (
    <PageBreadcrumbs 
      items={[
        {
          title: "Студия"
        }
      ]}
    />
  )

  return (
    <Base>

      <div className="d-md-none">
        <Breadcrumbs />
        <StudioMenu />
      </div>
      
      <div className="d-none d-md-block absolute-container">
        <FlexCol column >
          <Breadcrumbs />
          <StudioMenu />
        </FlexCol>
      </div>
    </Base>
  )
}