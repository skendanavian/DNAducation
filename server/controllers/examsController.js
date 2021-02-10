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

  const getQuestionsByExam = (exam_id) => {
    return db
      .select("*")
      .from("exam_questions")
      .where({ exam_id })
      .orderBy('id')
      .then((result) => result);
  };


  const createClass = (data) => {
    const {title, code, description} = data;
    return db("classes")
    .insert({
      title,
      code,
      description
    })
    .returning("*")
    .then((result) => result);
  }
  const setQuestionsByExam = (exam_id, questions) => {

    const rows = questions.map(q => ({exam_id, ...q}));

    return db("exam_questions")
      .insert(rows)
      .returning('*')
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
      .select('*')
      .from("exams")
      .where({ id })
      .increment('total_submissions', 1)
      .then((result) => result);
  };

  return {
    getExams,
    getExamById,
    getQuestionsByExam,
    incrementSubmissionCount,
    setQuestionsByExam,
    deleteQuestionsByExam
  };
};