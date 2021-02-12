module.exports = (db) => {
  const getAttemptsByStudent = (user_id) => {
    return db
      .select("*")
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

  const getAttemptById = (id) => {
    return db
      .select("*")
      .from("exam_attempts")
      .where({ id })
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

  return {
    getAttemptsByStudent,
    getAttemptById,
    createAttempt,
    updateAttempt,
    setExamAttemptAnswer,
    submitMarkForAnswer,
  };
};
