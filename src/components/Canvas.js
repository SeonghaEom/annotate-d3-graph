import React from "react";
// import PropTypes from "prop-types";



const Canvas = ({ height, width }) => {
  const canvas = React.useRef();

  React.useEffect(() => {
    const context = canvas.current.getContext("2d");
    

    
  });

  return <canvas ref={canvas} height={height} width={width} />;
};

// Canvas.propTypes = {
//   draw: PropTypes.func.isRequired,
//   height: PropTypes.number.isRequired,
//   width: PropTypes.number.isRequired
// };

export default Canvas;