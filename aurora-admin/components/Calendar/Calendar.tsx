"use client";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import { useEffect } from "react";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY!);

const Calendar = () => {
  useEffect(() => {
    const response = fetch("/api/");
  }, []);
  return (
    <div>
      <ScheduleComponent height={650} selectedDate={new Date(2026, 0, 15)}>
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
