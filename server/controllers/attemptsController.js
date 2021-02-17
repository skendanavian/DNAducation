module.exports = (db) => {
  const getAttemptsByStudent = (user_id) => {
    return db
      .select(
        "exam_attempts.id as exam_attempt_id",
        "section_students_id",
        "exam_id",
        "average_confidence",
        "time_submitted",
        "time_started"
      )
      .from("exam_attempts")
      .join(
        "section_students",
        "section_students_id",
        "=",
        "section_students.id"
      )
      .where({ user_id })
      .then((result) => result);
  };

  const getAttemptsByTeacher = (teacherId) => {
    return (
      db

        // get all sectionsIds for a teacher
        // get all section_students fro those sections
        // get all exam_attempts for those sectioon_students
        .select(
          "exam_attempts.id as exam_attempt_id",
          "section_students_id",
          "exam_id",
          "average_confidence",
          "time_submitted",
          "time_started"
        )
        .from("exam_attempts")
        .join(
          "section_students",
          "section_students_id",
          "=",
          "section_students.id"
        )
        .join("sections", "section_id", "=", "sections.id")
        .where({ teacher_user_id: teacherId })
        .then((result) => result)
    );
  };

  const getAttemptById = (attemptId) => {
    return db
      .select("*")
      .from("exam_attempts")
      .where({ id: attemptId })
      .then((result) => result);
  };

  const createAttempt = (data) => {
    const { section_students_id, exam_id, time_started } = data;
    return db("exam_attempts")
      .insert({
        section_students_id,
        exam_id,
        time_started,
      })
      .returning("*")
      .then((result) => result);
  };

  const markAttempts = (marks) => {
    return db
      .where
  }

  const updateAttempt = (data) => {
    const { id, average_confidence, time_submitted } = data;
    return db("exam_attempts")
      .where("id", "=", id)
      .update({
        average_confidence,
        time_submitted,
      })
      .returning("*")
      .then((result) => result);
  };

  const getAnswersByAttemptId = (attemptId) => {
    return db
      .select("*")
      .from("exam_answers")
      .where({ exam_attempt_id: attemptId })
      .then((result) => result);
  };

  const getQuestionsbyIds = (questionIds) => {
    return db
      .select("*")
      .from("exam_questions")
      .whereIn("id", questionIds)
      .then((result) => result);
  };

  const setExamAttemptAnswer = (data) => {
    const {
      exam_attempt_id,
      exam_question_id,
      answer,
      confidence_level,
    } = data;

    return db("exam_answers")
      .insert({
        exam_attempt_id,
        exam_question_id,
        answer,
        confidence_level,
      })
      .returning("*")
      .then((result) => result);
  };

  const submitMarkForAnswer = (id, mark) => {
    return db("exam_answers")
      .where("id", "=", id)
      .update({
        mark,
      })
      .then((result) => result);
  };
  // this runs when creating an exam attempt
  // .select("*", "exams.id as exam_id", "user.id as user_id")
  const getSectionStudentId = (data) => {
    const { user_id, exam_id } = data;

    // get section id from exam id
    return db
      .select("section_id")
      .from("exams")
      .where({ id: exam_id })
      .then((result) => {
        console.log(result);
        const section_id = result[0] && result[0].section_id;
        return db
          .select("id")
          .from("section_students")
          .where({ user_id, section_id });
      })
      .then((result) => {
        console.log(result);
        return result;
      });

    // return db
    //   .select("*")
    //   .from("section_students")
    //   .join("sections", "sections.id", "=", "section_students.section_id")
    //   .join("exams", "sections.id", "=", "exams.section_id")
    //   .where({ user_id, "exams.id": exam_id })
    //   .then((result) => result);
  };

  return {
    getAttemptsByStudent,
    getAttemptsByTeacher,
    getAttemptById,
    createAttempt,
    updateAttempt,
    setExamAttemptAnswer,
    submitMarkForAnswer,
    getSectionStudentId,
    getAnswersByAttemptId,
    getQuestionsbyIds,
  };
};
