import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
const Invoice = () => {
  return (
    <Container>
      <Row className="">
        <Col className="">
          <div>
            <img style={{ height: "200px" }} src="./logo.png" />
          </div>
          <div>Invoice #001</div>
          <div>Date: 1212</div>
        </Col>
        <Col className="d-flex align-items-center">
          <div>
            <div>Billed To: Gaurab SHrestha</div>
            <div>Phone Number:9866513513</div>
            <div>Email: asasadsasd</div>
            <div>Address: asasds</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <div>Crimson Education Hub</div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Invoice;
