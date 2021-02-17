const calculateAnswerConfidence = (matchValue, confidenceValue) => {
  const confidenceGroup = `${matchValue}${confidenceValue}`;

  let score;

  switch (confidenceGroup) {
    //no match, high confidence
    case "01":
      score = 1;
      break;
    //no match, low confidence
    case "00":
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
const calculateExamConfidence = (array) => {
  console.log("array coming into avg confidence func", array);
  const validScores = array.filter((e) => e !== 0);

  const validScoresSum = validScores.reduce((a, b) => a + b, 0);

  const confidencePercentage = Math.ceil(
    (validScoresSum * 100) / (validScores.length * 4)
  );
  console.log({ confidencePercentage });
  console.log("conf percentage from avgConf func", confidencePercentage);

  return confidencePercentage;
};

module.exports = {
  calculateAnswerConfidence,
  calculateExamConfidence,
};

//TESTS

// test = [1, 2, 2, 4, 4, 5, 0, 0, 0, 0];
// test1 = [0, 0, 0, 1, 0, 0, 0, 0];
// test2 = [4, 4, 4, 4, 4, 5, 0, 2, 1, 0];
// test3 = [1, 2, 2, 4, 4, 5, 0, 0, 0, 0];
// test4 = [1, 2, 1, 2, 1, 2, 3, 1, 1, 0, 0, 0];

// console.log(calculateExamConfidence(test));
// console.log(calculateExamConfidence(test1));
// console.log(calculateExamConfidence(test2));
// console.log(calculateExamConfidence(test3));
// console.log(calculateExamConfidence(test4));
