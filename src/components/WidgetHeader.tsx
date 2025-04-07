import React from "react";
import styled from "styled-components";
import {
  RiFullscreenFill,
  RiMore2Fill,
  RiFullscreenExitLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiDraggable,
} from "@remixicon/react";
import { Menu, ActionIcon, Group } from "@mantine/core";

export const StyledWidgetHeader = styled.div`
  padding: 10px 20px;
  display: block;
`;

export const StyledWidgetTitle = styled.span`
  font-family: Inter;
  font-size: 18px;
  font-weight: 600;
  line-height: 20.88px;
  text-align: left;
`;

export const StyledActionLayout = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  float: right;
  align-items: center;
  display: flex;
  margin-left: 5px;
  cursor: pointer; /* Ensure cursor indicates clickable area */
`;

const ActionIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ActionIconText = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  padding-left: 10px;
`;

// Define a Widget interface to replace 'any'
interface Widget {
  id: number;
  span: number;
  // Add other widget properties as needed
}

interface WidgetHeaderProps {
  widgetTitle?: string;
  toggle: () => void;
  fullscreen: boolean;
  id: number;
  widgetData: Widget[];
  setWidgetData: React.Dispatch<React.SetStateAction<Widget[]>>;
  // Add drag-and-drop props
  onMouseDown?: React.MouseEventHandler;
  onTouchStart?: React.TouchEventHandler;
  "aria-describedby"?: string;
  "aria-roledescription"?: string;
  "aria-pressed"?: boolean;
  "aria-disabled"?: boolean;
  role?: string;
  tabIndex?: number;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = (props) => {
  const {
    widgetTitle = "Widget Title",
    toggle,
    fullscreen,
    id,
    widgetData,
    setWidgetData,
  } = props;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      toggle();
    }
  };

  const handleSizeChange = (size: number) => {
    const updatedData = widgetData.map((widget: Widget) => {
      if (widget.id === id) {
        return { ...widget, span: size };
      }
      return widget;
    });
    setWidgetData(updatedData);
  };

  const moveWidgetDown = () => {
    const widgetIndex = widgetData.findIndex((widget: Widget) => widget.id === id);
    if (widgetIndex === widgetData.length - 1) return;
    const updatedData = [...widgetData];
    const temp = updatedData[widgetIndex];
    updatedData[widgetIndex] = updatedData[widgetIndex + 1];
    updatedData[widgetIndex + 1] = temp;
    setWidgetData(updatedData);
  };

  const moveWidgetUp = () => {
    const widgetIndex = widgetData.findIndex((widget: Widget) => widget.id === id);
    if (widgetIndex === 0) return;
    const updatedData = [...widgetData];
    const temp = updatedData[widgetIndex];
    updatedData[widgetIndex] = updatedData[widgetIndex - 1];
    updatedData[widgetIndex - 1] = temp;
    setWidgetData(updatedData);
  };

  return (
    <>
      <StyledWidgetHeader>
        <StyledWidgetTitle>{widgetTitle}</StyledWidgetTitle>
        <StyledActionLayout>
          <Menu>
            <Menu.Target>
              <Group justify="flex-start">
                <ActionIcon variant="transparent">
                  <RiMore2Fill
                    style={{
                      zIndex: "10",
                      width: "14px",
                      height: "14px",
                      margin: "0 auto",
                      color: "black",
                    }}
                  />
                </ActionIcon>
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => handleSizeChange(3)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - Extra Small (25%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
              <Menu.Item onClick={() => handleSizeChange(4)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - Small (33%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
              <Menu.Item onClick={() => handleSizeChange(6)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - Half Width (50%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
              <Menu.Item onClick={() => handleSizeChange(8)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - large (66%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
              <Menu.Item onClick={() => handleSizeChange(9)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - Extra large (75%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
              <Menu.Item onClick={() => handleSizeChange(12)}>
                <ActionIconWrapper>
                  <ActionIconText>Set Size - Full Width (100%)</ActionIconText>
                </ActionIconWrapper>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </StyledActionLayout>

        <StyledActionLayout onClick={toggle}>
          {fullscreen ? (
            <RiFullscreenExitLine
              data-testid="fullscreen-exit-icon"
              style={{
                width: "26px",
                height: "14px",
                cursor: "pointer",
              }}
            />
          ) : (
            <RiFullscreenFill
              data-testid="fullscreen-icon"
              style={{
                width: "26px",
                height: "14px",
                cursor: "pointer",
              }}
            />
          )}
        </StyledActionLayout>
        <StyledActionLayout>
          <RiArrowDownLine
            onClick={moveWidgetDown}
            style={{
              width: "14px",
              height: "14px",
              cursor: "pointer",
              margin: "0 auto",
            }}
          />
        </StyledActionLayout>
        <StyledActionLayout>
          <RiArrowUpLine
            onClick={moveWidgetUp}
            style={{
              width: "14px",
              height: "14px",
              cursor: "pointer",
              margin: "0 auto",
            }}
          />
        </StyledActionLayout>
        <StyledActionLayout>
          <RiDraggable
            // main props 
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            // accessibility props
            aria-describedby={props["aria-describedby"]}
            aria-roledescription={props["aria-roledescription"]}
            aria-pressed={props["aria-pressed"]}
            aria-disabled={props["aria-disabled"]}
            role={props.role}
            tabIndex={props.tabIndex}
            style={{
              width: "14px",
              height: "14px",
              cursor: "grab",
              margin: "0 auto",
            }}
          />
        </StyledActionLayout>
      </StyledWidgetHeader>

      {fullscreen && (
        <div
          onClick={toggle}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Exit full screen"
        />
      )}
    </>
  );
};

export default WidgetHeader;
