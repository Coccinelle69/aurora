"use client";
import { useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";

const KanbanColumn = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: "",
    // data: "",
  });
  const count = 2;
  const addClickHandler = () => {};
  return (
    <div ref={setNodeRef} className="flex flex-col py-0 px-4">
      <div>
        <Space>
          {/* <Text></Text> */}
          {!!count && <Badge count={count} color="cyan" />}
        </Space>
        <Button shape="circle" />
      </div>
      <div
        className={`flex-1 border-2 border-dashed border-transparent ${active ? "overflow-visible" : "overflow-y-auto"}`}
      >
        <div className="mt-3 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export default KanbanColumn;
