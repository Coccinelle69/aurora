import { UseDraggableArguments } from "@dnd-kit/core";
import { AvatarProps } from "antd";

export interface IconProps {
  src: string;
  size: number;
  color?: string;
  className?: string;
  alt?: string;
}

export interface KanbanItemProps {
  id: string;
  data?: UseDraggableArguments["data"];
}

export interface CustomAvatarProps extends AvatarProps {
  name: string;
}
