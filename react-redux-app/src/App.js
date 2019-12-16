import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Card,
  CardMedia,
  Button,
  Divider,
  Grid
} from "@material-ui/core";
import "./App.css";

import { connect } from "react-redux";
import {
  fetchAndSaveData,
  removeDataFromMyListAndAddToRecomm,
  addDataFromRecommToMyList,
  toggleAddRemoveButton
} from "./actions";

const styles = muiBaseTheme => ({
  card: {
    marginTop: "10px",
    maxWidth: 250,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  addRemoveButton: {
    display: "block",
    top: "-140px",
    bottom: 0,
    margin: "auto",
    left: "8px",
    zIndex: 99999
  },
  mb20: {
    marginBottm: "20px"
  },
  media: {
    paddingTop: "56.25%"
    // "&:hover $addRemoveButton": {
    //   display: "block",
    //   top: "-140px",
    //   bottom: 0,
    //   margin: "auto",
    //   left: "8px",
    //   zIndex: 99999
    // }
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing(3)
  },
  divider: {
    margin: `${muiBaseTheme.spacing(3)}px 0`
  },
  heading: {
    fontWeight: "bold"
  }
});

class App extends Component {
  componentDidMount() {
    this.getAllData();
  }

  getAllData() {
    try {
      fetch("http://localhost:8081/GetData")
        .then(data => data.json())
        .then(data => {
          this.props.fetchAndSaveData(data);
        });
    } catch (e) {
      console.log(e);
    }
  }
  renderMyListAndRecommendation(listToRender, typeOfList) {
    const {
      classes,
      removeDataFromMyListAndAddToRecomm,
      addDataFromRecommToMyList,
      toggleAddRemoveButton
    } = this.props;
    if (listToRender && listToRender.length > 0) {
      return listToRender.map((item, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Card
              className={classes.card}
              raised
              onMouseLeave={() => {
                toggleAddRemoveButton(
                  index,
                  false,
                  typeOfList === "myList" ? "Remove" : "Add"
                );
              }}
            >
              <CardMedia
                className={classes.media}
                image={item.img}
                onMouseEnter={() => {
                  toggleAddRemoveButton(
                    index,
                    true,
                    typeOfList === "myList" ? "Remove" : "Add"
                  );
                }}
              />
              <CardContent className={classes.content}>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {item.title}
                </Typography>

                {item.toggleButtonOnHover && (
                  <Button
                    className={classes.addRemoveButton}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      if (typeOfList === "myList") {
                        removeDataFromMyListAndAddToRecomm(index);
                      } else {
                        addDataFromRecommToMyList(index);
                      }
                    }}
                    color={typeOfList === "myList" ? "secondary" : "primary"}
                  >
                    {typeOfList === "myList" ? "Remove" : "Add"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      });
    }
    return (
      <Typography
        className={"MuiTypography--heading"}
        variant={"h6"}
        gutterBottom
      >
        {typeOfList === "myList"
          ? "My List is empty."
          : "Recommendations is empty."}
      </Typography>
    );
  }
  renderMyListTitles() {
    const { classes, myList } = this.props;
    if (myList && myList.length > 0) {
      return myList.map((item, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Card className={classes.card} raised>
              <CardContent className={classes.content}>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      });
    }
    return (
      <Typography
        className={"MuiTypography--heading"}
        variant={"h6"}
        gutterBottom
      >
        No Titles Found
      </Typography>
    );
  }

  render() {
    const { classes, myList, recommendations } = this.props;
    return (
      <div className="App">
        <Grid container>
          <img
            alt="Netflix logo"
            height="70"
            src="https://cdn.vox-cdn.com/thumbor/Yq1Vd39jCBGpTUKHUhEx5FfxvmM=/39x0:3111x2048/1200x800/filters:focal(39x0:3111x2048)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png"
            title="Netflix logo"
          />
        </Grid>
        <Divider className={classes.divider} light />
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          My List
        </Typography>
        <Divider className={classes.divider} light />
        <Grid container>
          {this.renderMyListAndRecommendation(myList, "myList")}
        </Grid>
        <Divider className={classes.divider} light />
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          Recommendations
        </Typography>
        <Divider className={classes.divider} light />
        <Grid container className={classes.mb20}>
          {this.renderMyListAndRecommendation(
            recommendations,
            "recommendations"
          )}
        </Grid>
        <Divider className={classes.divider} light />
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          My List Titles
        </Typography>
        <Divider className={classes.divider} light />
        <Grid container>{this.renderMyListTitles()}</Grid>
        <Divider className={classes.divider} light />
      </div>
    );
  }
}

// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    myList: state.default.myList,
    recommendations: state.default.recommendations,
    toggleRemoveButton: state.default.toggleRemoveButton,
    toggleAddButton: state.default.toggleAddButton
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchAndSaveData: data => {
      dispatch(fetchAndSaveData(data));
    },
    removeDataFromMyListAndAddToRecomm: data => {
      dispatch(removeDataFromMyListAndAddToRecomm(data));
    },
    addDataFromRecommToMyList: data => {
      dispatch(addDataFromRecommToMyList(data));
    },
    toggleAddRemoveButton: (index, value, typeOfButton) => {
      dispatch(toggleAddRemoveButton(index, value, typeOfButton));
    }
  };
}

let app = connect(mapStateToProps, mapDispatchToProps)(App);
export default withStyles(styles)(app);
