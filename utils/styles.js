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
    textAlign: "center",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
});
export default useStyles;
