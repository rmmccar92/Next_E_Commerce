import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#203040",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  grow: {
    flexGrow: 1,
  },

  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  form: {
    maxWidth: "45%",
    margin: "0 auto",
  },
});
export default useStyles;
