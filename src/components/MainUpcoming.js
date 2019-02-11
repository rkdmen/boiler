import React from "react";
import { Col, Row, Grid } from "react-bootstrap";
import UpcomingMovieContainer from "../containers/UpcomingMovieContainer";
import Header from "./Header";

class MainUpcoming extends React.Component {
  render() {
    return (
      <Grid className="main-container">
        <Header />
        <Row>
          <Col xs={12} md={12}>
            <UpcomingMovieContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MainUpcoming;
