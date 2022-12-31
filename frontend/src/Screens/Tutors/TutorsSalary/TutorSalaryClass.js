class TutorSalaryClass {
  constructor({
    assignedCourseId,
    tutorId,
    salaryId,
    amount,
    year,
    month,
    date,
    salaryDetails,
    filename,
  }) {
    this.assignedCourseId = assignedCourseId;
    this.tutorId = tutorId;
    this.salaryId = salaryId;
    this.amount = amount;
    this.year = year;
    this.month = month;
    this.date = date;
    this.salaryDetails = salaryDetails;
    this.filename = filename;
  }
}
export default TutorSalaryClass;
