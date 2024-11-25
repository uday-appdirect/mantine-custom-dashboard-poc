import { Button, Container, Grid, Switch } from "@mantine/core";
import WidgetContainer from "./WidgetWrapper";
import { useState } from "react";

const FloatingActionButton = ({ handleAddWidget }) => {
  return (
    <Button
      onClick={handleAddWidget}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "50px",
      }}
    >
      + Add Widget
    </Button>
  );
};

const data = [
  { id: 1, title: "Dashboard", span: 6 },
  { id: 2, title: "Sales", span: 6 },
  { id: 3, title: "User", span: 6 },
  { id: 4, title: "Revenue", span: 6 },
  { id: 5, title: "Traffic", span: 6 },
  { id: 6, title: "Customer", span: 6 },
  { id: 7, title: "Performance", span: 6 },
];

export const GridAsymmetrical = () => {
  const [widgetData, setWidgetData] = useState(data);
  const [checked, setChecked] = useState(false);
  const handleAddWidget = () => {
    const newWidget = {
      id: widgetData.length + 1,
      title: "New Widget",
      span: 6,
    };
    setWidgetData([...widgetData, newWidget]);
  };
  return (
    <Container my="xl" size="xl">
      <Switch
        checked={checked}
        label="Toggle grid grow"
        size="xl"
        onChange={(event) => setChecked(event.currentTarget.checked)}
        style={{ marginBottom: 20 }}
      />
      <Grid grow={checked}>
        {widgetData.map((widget) => (
          <Grid.Col key={widget.id} {...widget}>
            <WidgetContainer
              widgetTitle={widget.title}
              id={widget.id}
              setWidgetData={setWidgetData}
              widgetData={widgetData}
            >
              <div
                style={{
                  height: 300,
                  background: "var(--mantine-color-cyan-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 130,
                }}
              >
                {widget.id}
              </div>
            </WidgetContainer>
          </Grid.Col>
        ))}
      </Grid>
      <FloatingActionButton handleAddWidget={handleAddWidget} />
    </Container>
  );
};
