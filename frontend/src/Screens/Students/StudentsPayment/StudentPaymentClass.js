class StudentPaymentClass{
    constructor({enrolledCourseId, studentId, paymentId, amount,paymentDate, paymentDetails}) {
        this.enrolledCourseId = enrolledCourseId;
        this.studentId = studentId;
        this.paymentId = paymentId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentDetails = paymentDetails;
    }
}
export default StudentPaymentClass;