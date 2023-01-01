class CourseClass {
  constructor({
    courseId,
    courseName,
    courseDuration,
    courseFee,
    courseDetails,
    date,
    typeClass,
  }) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseDuration = courseDuration;
    this.courseFee = courseFee;
    this.courseDetails = courseDetails;
    this.date = date;
    this.typeClass = typeClass;
  }
}
export default CourseClass;
