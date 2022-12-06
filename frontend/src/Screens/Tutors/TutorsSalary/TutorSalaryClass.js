class TutorSalaryClass {
  constructor({
    assignedCourseId,
    tutorId,
    salaryId,
    amount,
    salaryDate,
    salaryDetails,
  }) {
    this.assignedCourseId = assignedCourseId;
    this.tutorId = tutorId;
    this.salaryId = salaryId;
    this.amount = amount;
    this.salaryDate = salaryDate;
    this.salaryDetails = salaryDetails;
    // this.chequePhoto = chequePhoto
  }
}
export default TutorSalaryClass;
