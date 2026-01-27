import { UseDraggableArguments } from "@dnd-kit/core";
import { AvatarProps } from "antd";

export interface IconProps {
  src: string;
  size: number;
  color?: string;
  className?: string;
  alt?: string;
  hover?: boolean;
}

export interface KanbanItemProps {
  id: string;
  data?: UseDraggableArguments["data"];
}

export interface CustomAvatarProps extends AvatarProps {
  name?: string;
}

export interface AccountSettingsProps {
  open: boolean;
  setOpen: (opened: boolean) => void;
  userId: string;
}
