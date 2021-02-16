import { Box, Typography } from "@material-ui/core";

import SectionDetails from "./SectionDetails";
import UserDetails from "./UserDetails";
import ExamsContainer from "./ExamsContainer";

// display the following exams for the following views
// student account -> latest unsubmitted
// teacher account -> latest unmarked
// student code -> latest from section
// teacher code ->  latest from section

const examFilter = ({ type, view, exams }) => {
  if (!exams) return [];
  let toDisplay;
  const examsOfType = type === "Student" ? exams.student : exams.teacher;

  if (view === "Account" && type === "Student") {
    toDisplay = (exam) => !exam.attempts.length;
  } else if (view === "Account" && type === "Teacher") {
    toDisplay = (exam) => exam.attempts.find((att) => !att.marks_earned);
  } else {
    toDisplay = (exam) => exam.section.section_id === view;
  }
  const examsToDisplay = examsOfType.filter(toDisplay);
  return examsToDisplay;
};

export default function AccountContent(props) {
  const { contentView, exams, user, sections, setExamId, setTdnaOpen } = props;
  if (!contentView) {
    return <Typography>404 Error</Typography>;
  }
  const { type, view } = contentView;

  if (view === "Loading") {
    return <Typography>...Loading</Typography>;
  }

  const examsToDisplay = examFilter({ type, view, exams });

  if (view === "Account") {
    return (
      <Box>
        <UserDetails type={type} user={user} setTdnaOpen={setTdnaOpen} />
        <Typography variant="overline" color="textPrimary">
          {type === "Student"
            ? "Unsubmitted Assessments"
            : "Unmarked Submissions"}
        </Typography>
        <ExamsContainer
          setExamId={setExamId}
          user={user}
          type={type}
          exams={examsToDisplay}
        />
      </Box>
    );
  } else {
    // if view not account, view is a section id
    // display exams from that section
    const sectionsOfType =
      type === "Student" ? sections.student : sections.teacher;
    console.log({ sectionsOfType, view });
    const sectionDetails = sectionsOfType.find(
      (sec) => sec.section_id === view
    );
    return (
      <Box>
        <SectionDetails type={type} user={user} details={sectionDetails} />
        <Typography variant="overline">All Assessments</Typography>
        <ExamsContainer
          setExamId={setExamId}
          type={type}
          exams={examsToDisplay}
          user={user}
        />
      </Box>
    );
  }
}
