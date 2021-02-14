import { Box, Button, Divider, Typography } from "@material-ui/core";

import SectionDetails from "./SectionDetails";
import UserDetails from "./UserDetails";
import ExamsContainer from "./ExamsContainer";

export default function AccountContent(props) {
  const { contentView, exams } = props;
  if (!contentView) {
    return <Typography>404 Error</Typography>;
  }

  if (contentView === "Account") {
    // display unsubmitted exams
    const examsToDisplay = exams.filter((exam, index) => {
      return !exam.attempts.length;
    });

    return (
      <Box>
        <UserDetails />
        <Typography>Unsubmitted Assessments</Typography>
        <ExamsContainer exams={examsToDisplay} />
      </Box>
    );
  } else {
    // if view not account, view is a code
    // display exams from that section
    const examsToDisplay = exams.filter((exam) => {
      return exam.section.code === contentView;
    });

    return (
      <Box>
        <SectionDetails details={examsToDisplay[0].section} />
        <Typography>All Assessments</Typography>
        <ExamsContainer exams={examsToDisplay} />
      </Box>
    );
  }
}
