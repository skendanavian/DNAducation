const formatExamQuestions = (data) => {
  const examId = data[0].exam_id;
  const formattedQuestions = data.map((q) => {
    return {
      questionId: q.id,
      questionNumber: q.question_number,
      markValue: q.mark_value,
      question: q.question,
    };
  });

  const formattedData = { examId: examId, questions: formattedQuestions };
  console.log(formattedData);
};

module.exports = {
  formatExamQuestions,
};
