import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import StreamsTable from './components/StreamsTable';
import StreamsTableOld from './components/StreamsTableOld';

const Dashboard = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Dashboard</h3>
      </Col>
    </Row>
    <Row>
      <StreamsTable />
    </Row>
  </Container>
);

const mapStateToProps = state => ({
  streams: state.streams
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
