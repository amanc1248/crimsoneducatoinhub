class AssignedCourse {
  constructor({
    assignedCourseId,
    courseId,
    courseName,
    year,
    month,
    startDate,
    endDate,
    shiftId,
    shift,
    paymentStatus,
    salary,
    tutorId,
  }) {
    this.assignedCourseId = assignedCourseId;
    this.courseId = courseId;
    this.courseName = courseName;
    this.year = year;
    this.month = month;
    this.startDate = startDate;
    this.endDate = endDate;
    this.shiftId = shiftId;
    this.shift = shift;
    this.paymentStatus = paymentStatus;
    this.salary = salary;
    this.tutorId = tutorId;
  }
}
export default AssignedCourse;
