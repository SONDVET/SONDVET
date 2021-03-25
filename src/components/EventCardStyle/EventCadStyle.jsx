import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles({
    eventCard: {
        width: 400,
        height: 300,
        maxHeight: '100%',
        overflow: 'auto',
        margin: 10,
        paddingBottom: 10,
        backgroundColor: " rgb(223, 226, 230)",
        textAlign: "center"
    },
    searchBar: {
        width: "65%",
    },

});
export { useStyles }