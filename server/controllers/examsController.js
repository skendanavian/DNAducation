module.exports = (db) => {
  const getExams = () => {
    return db
      .select("*")
      .from("exams")
      .orderBy("id")
      .then((result) => result);
  };

  const getExamById = (id) => {
    return db
      .select("*")
      .from("exams")
      .where({ id })
      .orderBy("id")
      .then((result) => result);
  };

  //   SELECT exam_questions.question as questions, classes.id as classId, classes.code as classCode, exams.id as examId, classes.title as classTitle, exam_questions.question_number as questionNumber, exam_questions.id as questionId, exam_questions.mark_value as markValue, sections.id as sectionId, exams.due_time as dueDate   FROM exam_questions
  // JOIN exams on exam_id = exams.id
  // JOIN sections on section_id = sections.id
  // JOIN classes on class_id = classes.id
  // WHERE exams.id = 1;

  //New Massive Query
  const getQuestionsByExam = (exam_id) => {
    return db
      .select(
        "exam_questions.question as questions",
        "classes.id as classId",
        "classes.code as classCode",
        "exams.id as examId",
        "classes.title as classTitle",
        "exam_questions.question_number as questionNumber",
        "exam_questions.id as questionId",
        "exam_questions.mark_value as markValue",
        "sections.id as sectionId",
        "exams.due_time as dueDate"
      )
      .from("exam_questions")
      .join("exams", "exam_id", "=", "exams.id")
      .join("sections", "section_id", "=", "sections.id")
      .join("classes", "class_id", "=", "classes.id")
      .where({ exam_id })
      .orderBy("questionNumber")
      .then((result) => result);
  };

  // OG mini getQuestionsByExam query
  // const getQuestionsByExam = (exam_id) => {
  //   return db
  //     .select("*")
  //     .from("exam_questions")
  //     .where({ exam_id })
  //     .orderBy("id")
  //     .then((result) => result);
  // };
  const createExam = (data) => {
    const { title, description, section_id, due_time } = data;

    return db("exams")
      .insert({
        title,
        section_id,
        description,
        due_time,
      })
      .returning("*")
      .then((result) => result);
  };

  const createClass = (data) => {
    const { title, code, description } = data;
    return db("classes")
      .insert({
        title,
        code,
        description,
      })
      .returning("*")
      .then((result) => result);
  };

  const setQuestionsByExam = (exam_id, questions) => {
    const rows = questions.map((q, index) => ({
      exam_id,
      question_number: index + 1,
      mark_value: q.mark,
      question: q.question,
    }));

    return db("exam_questions")
      .insert(rows)
      .returning("*")
      .then((result) => result);
  };

  const deleteQuestionsByExam = (exam_id) => {
    return db("exam_questions")
      .where({ exam_id })
      .del()
      .then((result) => result);
  };

  const incrementSubmissionCount = (id) => {
    return db
      .select("*")
      .from("exams")
      .where({ id })
      .increment("total_submissions", 1)
      .then((result) => result);
  };

  return {
    getExams,
    getExamById,
    getQuestionsByExam,
    incrementSubmissionCount,
    setQuestionsByExam,
    deleteQuestionsByExam,
    createExam,
  };
};
