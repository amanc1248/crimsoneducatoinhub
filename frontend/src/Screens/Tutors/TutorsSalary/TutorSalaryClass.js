class TutorSalaryClass {
  constructor({
    assignedCourseId,
    tutorId,
    salaryId,
    amount,
    salaryDate,
    salaryDetails,
    filename,
  }) {
    this.assignedCourseId = assignedCourseId;
    this.tutorId = tutorId;
    this.salaryId = salaryId;
    this.amount = amount;
    this.salaryDate = salaryDate;
    this.salaryDetails = salaryDetails;
    this.filename = filename;
  }
}
export default TutorSalaryClass;
