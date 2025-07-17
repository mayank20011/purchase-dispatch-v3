const Spinner = ({ color, padding }) => {
  return (
    <p
      className={`mx-auto rounded-full w-fit animate-spin`}
      style={{
        padding: `${padding}px`,
        border: `3px solid ${color}`,
        borderTop: "0px",
        borderLeft: "0px",
      }}
    ></p>
  );
};

export default Spinner;
