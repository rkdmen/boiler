import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import Movie from './Movie';
import Header from './Header';

class Main extends React.Component {
  render(){
    return (
          <Grid className="main-container">
            <Header />
            <Row>
              <Col xs={12} md={12}>
                  <Movie />
              </Col>
            </Row>
          </Grid>
      )
  }
}


export default Main;
