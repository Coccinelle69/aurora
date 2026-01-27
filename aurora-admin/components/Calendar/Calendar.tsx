"use client";
import {
  ScheduleComponent,
  Inject,
  DragAndDrop,
  Resize,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";

import { registerLicense } from "@syncfusion/ej2-base";
import { useCreate, useDelete, useList, useUpdate } from "@refinedev/core";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY!);

const Calendar = () => {
  // const { data, isLoading } = useList({
  //   resource: "events",
  // });
  const { mutate: createMutate } = useCreate();
  const { mutate: updateMutate } = useUpdate();
  const { mutate: deleteMutate } = useDelete();
  return (
    <div>
      <ScheduleComponent
        // actionComplete={onActionComplete}
        // eventSettings={{ dataSource: localData }}
        height={650}
        selectedDate={new Date()}
      >
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
