import React from "react";
import Styled from "styled-components";
import { useFullscreen } from "@mantine/hooks";
import WidgetHeader from "./WidgetHeader";

export const StyledWidgetContainer = Styled.div`
  border: 1px solid #DEE2E6;
  opacity: 0px;
  background-color: white;
`;

interface WidgetContainerProps {
  children: React.ReactNode;
  widgetTitle: string;
  id: number;
  setWidgetData: React.Dispatch<React.SetStateAction<any>>;
  widgetData: any;
  dragNDropRef?: any;
  inlineStyles: object;
  isDragging?: boolean;
}

const WidgetContainer: React.FC<WidgetContainerProps> = (props) => {
  const {
    children,
    widgetTitle,
    id,
    setWidgetData,
    widgetData,
    dragNDropRef,
    inlineStyles,
  } = props;
  const { ref, toggle, fullscreen } = useFullscreen();
  return (
    <div ref={dragNDropRef}>
      <StyledWidgetContainer ref={ref} style={inlineStyles}>
        <WidgetHeader
          {...props}
          widgetTitle={widgetTitle || "Widget title"}
          toggle={toggle}
          fullscreen={fullscreen}
          id={id}
          widgetData={widgetData}
          setWidgetData={setWidgetData}
        />
        {children}
      </StyledWidgetContainer>
    </div>
  );
};

export default WidgetContainer;
