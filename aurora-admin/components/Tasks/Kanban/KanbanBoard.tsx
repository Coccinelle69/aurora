"use client";
import { DndContext } from "@dnd-kit/core";

const KanbanBoard = ({ children }: { children: React.ReactNode }) => {
  return <DndContext>{children}</DndContext>;
};

export default KanbanBoard;
