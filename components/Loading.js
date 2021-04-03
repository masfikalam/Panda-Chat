import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ width: "70px", height: "70px" }} />
    </section>
  );
};

export default Loading;
