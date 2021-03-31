import { makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    eventCard: {
        minWidth: '25%',
        maxWidth: '30%',
        minHeight: 375,
        maxHeight: '100%',
        overflow: 'auto',
        margin: 10, 
        paddingBottom: 10,
        backgroundColor: " rgb(223, 226, 230)",
        textAlign: "center"
    },
    searchBar: {
        width: "65%",
        paddingBottom:30,
    },
    mobileCard: {
        width:"95%",
        minHeight: 375,
        maxHeight: '100%',
        overflow: 'auto',
        margin: 10, 
        paddingBottom: 10,
        backgroundColor: " rgb(223, 226, 230)",
        textAlign: "center"
    },
    cardButton: {
      marginBottom: "15px"  
    },
    cardHead: {
        backgroundColor: "#636359",
        color: "white",
        padding: "20px",
        borderBottom: "solid red 3px",
    }

});
export { useStyles }