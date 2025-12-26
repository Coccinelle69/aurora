import AnimatedCursor from "react-animated-cursor";

const AnimCursor = () => {
  return (
    <AnimatedCursor
      innerStyle={{ zIndex: 11000 }}
      innerSize={10}
      outerSize={8}
      color="138,184,192"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
      ]}
    ></AnimatedCursor>
  );
};

export default AnimCursor;
//
