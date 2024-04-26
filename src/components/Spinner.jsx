import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  zIndex: "9999",
};

const Spinner = ({ loading }) => {
  return <ClipLoader color="white" loading={loading} cssOverride={override} size={20} />;
};

export default Spinner;
