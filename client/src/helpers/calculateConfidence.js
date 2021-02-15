const calculateAnswerConfidence = (matchValue, confidenceValue) => {
  const confidenceGroup = `${matchValue}${confidenceValue}`;

  let score;

  switch (confidenceGroup) {
    //no match, highly confident
    case "00":
      score = 1;
      break;
    //no match, low confidence
    case "01":
      score = 2;
      break;
    // match, low confidence
    case "10":
      score = 3;
      break;
    //match, highly confident
    case "11":
      score = 4;
      break;
    //request error or problem -> don't add to score on backend
    default:
      score = 0;
  }

  return score;
};
const calculateExamConfidence = (matchValue, confidenceValue) => {
  const confidenceGroup = `${matchValue}${confidenceValue}`;

  let score;

  switch (confidenceGroup) {
    //no match, highly confident
    case "00":
      score = 1;
      break;
    //no match, low confidence
    case "01":
      score = 2;
      break;
    // match, low confidence
    case "10":
      score = 3;
      break;
    //match, highly confident
    case "11":
      score = 4;
      break;
    //request error or problem -> don't add to score on backend
    default:
      score = 0;
  }

  return score;
};

module.exports = {
  calculateAnswerConfidence,
  calculateExamConfidence,
};
