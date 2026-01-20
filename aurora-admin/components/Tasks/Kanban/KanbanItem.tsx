"use client";

import { KanbanItemProps } from "@/utils/interfaces";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

const KanbanItem = ({
  id,
  data,
  children,
}: PropsWithChildren<KanbanItemProps>) => {
  const { attributes, setNodeRef, active, listeners } = useDraggable({
    id: "",
    // data: "data",
  });
  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${active ? (active.id === id ? "opacity-100" : "opacity-50") : "opacity-100"} relative cursor-grab rounded-lg`}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div className="cursor-grabbing rounded-lg shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"></div>
          </DragOverlay>
        )}
      </div>
    </div>
  );
};

export default KanbanItem;
