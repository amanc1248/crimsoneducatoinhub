import Table from "react-bootstrap/esm/Table"
import "../../../styles/components/invoice.css"
export const StudentInvoiceC = ({allPayments, student, course})=>{
    console.log("Student: ", student);
    console.log("All payments:  ", allPayments);
    console.log("Course: ", course);
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;
    return <div className="page-content container">
    <div className="page-header text-blue-d2">
        <h1 className="page-title text-secondary-d1">
            Invoice
            <small className="page-info">
                <i className="fa fa-angle-double-right text-80"></i>
                ID: #111-222
            </small>
        </h1>

    </div>

    <div className="container px-0">
        <div className="row mt-4">
            <div className="col-12 col-lg-12">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center text-150">
                            <i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
                            <span className="text-default-d3">Crimson Education Hub</span>
                        </div>
                    </div>
                </div>
                {/* <!-- .row --> */}

                <hr className="row brc-default-l1 mx-n1 mb-4" />

                <div className="row">
                    <div className="col-sm-6">
                        <div>
                            <span className="text-sm text-grey-m2 align-middle">To:</span>
                            <span className="text-600 text-110 text-blue align-middle">Alex Doe</span>
                        </div>
                        <div className="text-grey-m2">
                            <div className="my-1">
                                {student.name}
                            </div>
                            <div className="my-1">
                                {student.address}
                            </div>
                            <div className="my-1"><i className="fa fa-phone fa-flip-horizontal text-secondary"></i> <b className="text-600">{student.phoneNumber}</b></div>
                        </div>
                    </div>
                    {/* <!-- /.col --> */}

                    <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                        <hr className="d-sm-none" />
                        <div className="text-grey-m2">
                            <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                Invoice
                            </div>

                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">ID:</span> #111-222</div>

                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Issue Date:</span> {currentDate}</div>

                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Status:</span> <span className="badge badge-warning badge-pill px-25">Unpaid</span></div>
                        </div>
                    </div>
                    {/* <!-- /.col --> */}
                </div>
                <Table striped bordered hover>
          <thead>
            <tr>
                <th>Fee Installment</th>
              <th>Payment Date</th>
              <th>Payment Details</th>
              <th>Payment Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
            </div>
        </div>
    </div>
</div>
}