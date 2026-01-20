"use client";
import {
  KanbanBoard,
  KanbanBoardColumn,
  KanbanBoardContainer,
  KanbanItem,
} from "@/components";
import { useList } from "@refinedev/core";
const TasksList = () => {
  //   const { data: tasks, isLoading: isLoadingTasks } = useList({
  //     resource: "tasks",
  //     sorters: [
  //       {
  //         field: "dueDate",
  //         order: "asc",
  //       },
  //     ],
  //     pagination: {
  //       mode: "off",
  //     },
  //     meta: {
  //       gqlQuery: TASKS_QUERY,
  //     },
  //   });
  return (
    <></>
    // <div>
    //   <KanbanBoardContainer>
    //     <KanbanBoard>
    //       <KanbanBoardColumn>
    //         {/* <KanbanItem></KanbanItem> */}
    //       </KanbanBoardColumn>
    //     </KanbanBoard>
    //   </KanbanBoardContainer>
    // </div>
  );
};

export default TasksList;
