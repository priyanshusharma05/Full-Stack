// Student class
export class Student {
  constructor(id, name, section, rollNumber) {
    this.id = id
    this.name = name
    this.section = section
    this.rollNumber = rollNumber
  }
}

// Section class
export class Section {
  constructor(id, sectionName) {
    this.id = id
    this.sectionName = sectionName
  }
}

// Result class
export class Result {
  constructor(id, studentId, subject, marks, totalMarks) {
    this.id = id
    this.studentId = studentId
    this.subject = subject
    this.marks = marks
    this.totalMarks = totalMarks
  }

  getPercentage() {
    return ((this.marks / this.totalMarks) * 100).toFixed(2)
  }

  getGrade() {
    const percentage = this.getPercentage()
    if (percentage >= 90) return 'O'
    if (percentage >= 80) return 'A+'
    if (percentage >= 70) return 'A'
    if (percentage >= 60) return 'B+'
    if (percentage >= 50) return 'B'
    if (percentage >= 40) return 'C'
    return 'F'
  }
}
