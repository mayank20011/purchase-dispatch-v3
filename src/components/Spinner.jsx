const Spinner = ({ color, padding }) => {
  return (
    <p
      className={`mx-auto rounded-full w-fit animate-spin`}
      style={{
        padding: `${padding}px`,
        border: `2px solid ${color}`,
        borderTop: "none",
        borderLeft: "none",
      }}
    ></p>
  );
};

export default Spinner;
