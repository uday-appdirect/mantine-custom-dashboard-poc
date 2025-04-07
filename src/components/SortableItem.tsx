import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item, { ItemProps } from "./Item";
import { Grid } from "@mantine/core";

const SortableItem: FC<ItemProps> = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <Grid.Col {...props.widget}>
      <Item
        ref={setNodeRef}
        style={style}
        withOpacity={isDragging}
        {...props}
        {...attributes}
        {...listeners}
      />
    </Grid.Col>
  );
};

export default SortableItem;
