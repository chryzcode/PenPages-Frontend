import ClipLoader from "react-spinners/ClipLoader";

const override = {
  margin: "0 auto",
  zIndex: "9999",
};

const Spinner = () => {
  return <ClipLoader color="white" cssOverride={override} size={10} />;
};

export default Spinner;
