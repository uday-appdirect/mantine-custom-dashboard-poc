import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import WidgetContainer from "./WidgetWrapper";

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  widget: any;
  widgetData: any;
  setWidgetData: React.Dispatch<React.SetStateAction<any>>;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      id,
      withOpacity,
      isDragging,
      style,
      widget,
      widgetData,
      setWidgetData,
      ...props
    },
    ref
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      borderRadius: "10px",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      //   <div ref={ref} style={inlineStyles} {...props}>
      //     {id}
      //   </div>
      <WidgetContainer
        dragNDropRef={ref}
        widgetTitle={widget?.title}
        id={widget?.id}
        inlineStyles={inlineStyles}
        setWidgetData={setWidgetData}
        widgetData={widgetData}
        isDragging={isDragging}
        {...props}
      >
        <div
          style={{
            height: 300,
            background: "#E9ECEF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 130,
          }}
        >
          {widget?.id}
        </div>
      </WidgetContainer>
    );
  }
);

export default Item;
