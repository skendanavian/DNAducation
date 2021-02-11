const formatExamQuestions = (data) => {
  console.table(data);
  const { examId, sectionId, classCode, dueDate, classTitle } = data[0];
  const formattedQuestions = data.map((q) => {
    return {
      questionId: q.questionId,
      questionNumber: q.questionNumber,
      markValue: q.markValue,
      question: q.questions,
    };
  });

  const formattedData = {
    examId,
    sectionId,
    classCode,
    classTitle,
    dueDate,
    questions: formattedQuestions,
  };

  return formattedData;
};

module.exports = {
  formatExamQuestions,
};
