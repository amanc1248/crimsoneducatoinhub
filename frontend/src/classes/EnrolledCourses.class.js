class EnrolledCourse{
    constructor({ id, courseId,courseName, year,month, startDate, endDate, shiftId, shift, paymentStatus,actualCoursePrice, studentId, padeAmount, remainingAmount}){
        this.id = id
        this.courseId = courseId;
        this.courseName = courseName;
        this.year = year;
        this.month = month;
        this.startDate = startDate;
        this.endDate = endDate;
        this.shiftId = shiftId;
        this.shift = shift;
        this.paymentStatus = paymentStatus;
        this.actualCoursePrice = actualCoursePrice;
        this.studentId = studentId;
        this.padeAmount =padeAmount;
        this.remainingAmount = remainingAmount;
    }
}
export default EnrolledCourse;