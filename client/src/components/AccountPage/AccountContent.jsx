import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import SectionDetails from "./SectionDetails";
import UserDetails from "./UserDetails";
import ExamsContainer from "./ExamsContainer";
import CreateExam from "../CreateExam/CreateExam";
import AttemptView from "./AttemptView";

// display the following exams for the following views
// student account -> latest unsubmitted
// teacher account -> latest unmarked
// student code -> latest from section
// teacher code ->  latest from section

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "1.1rem",
  },
}));

const examFilter = ({ type, view, exams, token, sectionId }) => {
  if (!exams) return [];
  let toDisplay;
  const examsOfType = type === "Student" ? exams.student : exams.teacher;

  if (view === "Account" && type === "Student") {
    toDisplay = (exam) => !exam.attempts.length;
  } else if (view === "Account" && type === "Teacher") {
    toDisplay = (exam) => exam.attempts.find((att) => !att.marks_earned);
  } else {
    toDisplay = (exam) => exam.section.section_id === sectionId;
  }
  const examsToDisplay = examsOfType.filter(toDisplay);
  return examsToDisplay;
};

export default function AccountContent(props) {
  const styles = useStyles();
  const {
    contentView,
    updateContentView,
    exams,
    user,
    sections,
    setExamId,
    setTdnaOpen,
  } = props;
  if (!contentView) {
    return <Typography>404 Error</Typography>;
  }
  const { type, view, sectionId, attemptId } = contentView;

  if (view === "Loading") {
    return <Typography>...Loading</Typography>;
  }
  const sectionsOfType =
    type === "Student" ? sections.student : sections.teacher;
  const sectionDetails = sectionsOfType.find(
    (sec) => sec.section_id === sectionId
  );

  const examsToDisplay = examFilter({ type, view, sectionId, exams });

  if (view === "Account") {
    return (
      <Box>
        <UserDetails type={type} user={user} setTdnaOpen={setTdnaOpen} />
        <Typography
          className={styles.heading}
          variant="overline"
          color="primary"
          align="center"
        >
          {type === "Student"
            ? "Unsubmitted Assessments"
            : "Unmarked Submissions"}
        </Typography>
        <ExamsContainer
          setExamId={setExamId}
          user={user}
          type={type}
          exams={examsToDisplay}
          updateContentView={updateContentView}
        />
      </Box>
    );
  } else if (view === "createExam") {
    return (
      <CreateExam
        type={type}
        details={sectionDetails}
        user={user}
        token
        updateContentView={updateContentView}
      ></CreateExam>
    );
  } else if (view === "Attempt") {
    return (
      <Box>
        <AttemptView
          contentView={contentView}
          token
          attemptId={attemptId}
          updateContentView={updateContentView}
        ></AttemptView>
      </Box>
    );
  } else {
    // if view not account, view is a section id
    // display exams from that section
    // const sectionsOfType =
    //   type === "Student" ? sections.student : sections.teacher;
    // console.log({ sectionsOfType, view });
    // const sectionDetails = sectionsOfType.find(
    //   (sec) => sec.section_id === view
    // );
    return (
      <Box>
        <SectionDetails
          type={type}
          user={user}
          details={sectionDetails}
          view={view}
          updateContentView={updateContentView}
        />
        <Typography
          className={styles.heading}
          color="primary"
          variant="overline"
        >
          All Assessments
        </Typography>
        <ExamsContainer
          setExamId={setExamId}
          type={type}
          exams={examsToDisplay}
          user={user}
          updateContentView={updateContentView}
        />
      </Box>
    );
  }
}
