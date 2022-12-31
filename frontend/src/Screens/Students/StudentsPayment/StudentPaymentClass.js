class StudentPaymentClass {
  constructor({
    enrolledCourseId,
    studentId,
    paymentId,
    amount,
    year,
    month,
    date,
    paymentDetails,
  }) {
    this.enrolledCourseId = enrolledCourseId;
    this.studentId = studentId;
    this.paymentId = paymentId;
    this.amount = amount;
    this.year = year;
    this.month = month;
    this.date = date;
    this.paymentDetails = paymentDetails;
  }
}
export default StudentPaymentClass;
