class CourseClass {
  constructor({
    courseId,
    courseName,
    courseDuration,
    courseFee,
    courseDetails,
    date,
    classType,
  }) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseDuration = courseDuration;
    this.courseFee = courseFee;
    this.courseDetails = courseDetails;
    this.classType = classType;
    this.date = date;
  }
}
export default CourseClass;
