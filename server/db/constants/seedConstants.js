const seedConstants = {
  users: 8,
  teachers: 2,
  classes: 2,
  sections: 4, //2 sections per class //2 sections per teacher
  section_students:16, //4 students per section
  exams: 8, //2 exams per section
  exam_questions: 24, //3 questions per exam
  exam_attempts: 16, //2 attempts per exam // 1 attempt per student section
  exam_answers: 48 //3 answers per exam, same as exam_questions times 2 attempts per exam
}


module.exports = seedConstants;