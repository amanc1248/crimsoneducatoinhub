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
    shiftId,
    shift,
    paymentStatus,
    salary,
    tutorId,
    padeAmount,
    remainingAmount
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
    this.shiftId = shiftId;
    this.shift = shift;
    this.paymentStatus = paymentStatus;
    this.salary = salary;
    this.tutorId = tutorId;
    this.padeAmount = padeAmount;
    this.remainingAmount = remainingAmount;
  }
}
export default AssignedCourse;
