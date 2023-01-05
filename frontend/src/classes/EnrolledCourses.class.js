class EnrolledCourse {
  constructor({
    id,
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
    actualCoursePrice,
    studentId,
    padeAmount,
    remainingAmount,
    assignedCourseId

  }) {
    this.id = id;
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
    this.actualCoursePrice = actualCoursePrice;
    this.studentId = studentId;
    this.padeAmount = padeAmount;
    this.remainingAmount = remainingAmount;
    this.assignedCourseId = assignedCourseId;
  }
}
export default EnrolledCourse;
