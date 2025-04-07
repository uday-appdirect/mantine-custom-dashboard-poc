import { useCallback, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Grid } from "@mantine/core";
import SortableItem from "./SortableItem";
import Item from "./Item";
import { RiDraggable } from "@remixicon/react";

const data = [
  { id: 1, title: "Dashboard", span: 3 },
  { id: 2, title: "Sales", span: 3 },
  { id: 3, title: "User", span: 6 },
  { id: 4, title: "Revenue", span: 4 },
  { id: 5, title: "Traffic", span: 4 },
  { id: 6, title: "Customer", span: 4 },
  { id: 7, title: "Performance", span: 4 },
];

const DragAndDropGrid = () => {
  const [widgetData, setWidgetData] = useState(data);

  const [activeWidget, setActiveWidget] = useState<any>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveWidget(
      widgetData.filter((widget) => widget.id.toString() === event.active.id)
    );
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWidgetData((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id.toString() === active.id
        );
        const newIndex = items.findIndex(
          (item) => item.id.toString() === over?.id
        );

        console.log("oldIndex", oldIndex, "newIndex", newIndex);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveWidget(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveWidget(null);
  }, []);

  return (
    <div style={{ margin: "2em" }}>
      <div style={{ margin: "2em" }}>
        Grab {"  "}
        <RiDraggable
          style={{
            width: "25px",
            height: "25px",
            cursor: "grab",
            padding: "5px",
            border: "1px solid gray",
            borderRadius: "2px",
          }}
        />
        {"  "}
        to drag and drop widgets
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={widgetData}>
          <Grid>
            {widgetData.map((widget) => (
              <SortableItem
                key={widget.id}
                id={widget.id.toString()}
                widget={widget}
                widgetData={widgetData}
                setWidgetData={setWidgetData}
              />
            ))}
          </Grid>
          ˝
        </SortableContext>
        <DragOverlay style={{ transformOrigin: "0 0 " }}>
          {activeWidget ? (
            <Item
              widget={activeWidget}
              id={activeWidget?.id}
              isDragging
              widgetData={widgetData}
              setWidgetData={setWidgetData}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DragAndDropGrid;
