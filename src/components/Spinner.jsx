import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ size, color, display }) => {
  const override = {
    zIndex: "9999",
    display: display === "block" ? "block" : "inherit",
    margin: display === "block" ? "10% auto" : "0 auto",
  };
  return <ClipLoader color={color ? color : "white"} cssOverride={override} size={size} />;
};

export default Spinner;
