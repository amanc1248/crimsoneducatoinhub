class AssignedCourse {
  constructor({
    assignedCourseId,
    courseId,
    courseName,
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate,
    shifts,
    paymentStatus,
    salaryPercentage,
    salaryAmount,
    tutorId,
    padeAmount,
    remainingAmount,
    courseFee
  }) {
    this.assignedCourseId = assignedCourseId;
    this.courseId = courseId;
    this.courseName = courseName;
    this.startYear = startYear;
    this.startMonth = startMonth;
    this.startDate = startDate;
    this.endYear = endYear;
    this.endMonth = endMonth;
    this.endDate = endDate;
    this.shifts = shifts;
    this.paymentStatus = paymentStatus;
    this.salaryPercentage = salaryPercentage;
    this.salaryAmount = salaryAmount;
    this.tutorId = tutorId;
    this.padeAmount = padeAmount;
    this.remainingAmount = remainingAmount;
    this.courseFee = courseFee;
  }
}
export default AssignedCourse;
