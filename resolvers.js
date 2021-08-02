const { students, colleges } = require('./db')

const Query = {
    test: () => 'Test Success, GraphQL server is up & running !!',
    studentData: (parent, args, context, info) => {
        var currentStudent = students.get(args.id)
        var college = colleges.get(currentStudent.collegeId)
        currentStudent['college'] = college instanceof Object ? college : {}
        return currentStudent
    },
    studentsData: () => {
        var studentsArray = []
        for (student of students.list()) {
            studentsArray.push({...student, college: colleges.get(student.collegeId)})
        }
        return studentsArray
    },
}

const Mutation = {
    createStudent: (parent, args) => {
        const {firstName = '', lastName = '', email = '', password = '', collegeId = ''} = args.data
        var newStudentObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            collegeId: collegeId
        }
        var newStudentId = students.create(newStudentObj)
        var currentStudent = students.get(newStudentId)
        return currentStudent
    },
    updateStudent: (parent, args) => {
        const {id: studentId, data} = args
        var currentStudent = students.get(studentId)
        var updatedStudentData = {...currentStudent, ...data}
        students.update(updatedStudentData)
        return students.get(studentId)
    }
}
 
 module.exports = {Query, Mutation}
