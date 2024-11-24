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
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  widgetTitle,
  id,
  setWidgetData,
  widgetData,
}) => {
  const { ref, toggle, fullscreen } = useFullscreen();
  return (
    <StyledWidgetContainer ref={ref}>
      <WidgetHeader
        widgetTitle={widgetTitle}
        toggle={toggle}
        fullscreen={fullscreen}
        id={id}
        widgetData={widgetData}
        setWidgetData={setWidgetData}
      />
      {children}
    </StyledWidgetContainer>
  );
};

export default WidgetContainer;
