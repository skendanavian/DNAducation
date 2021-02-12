import { Box, Button, Divider, Typography } from "@material-ui/core";

import SectionDetails from "./SectionDetails";
import UserDetails from "./UserDetails";
import ExamsContainer from "./ExamsContainer";

export default function AccountContent(props) {
  const { contentView, exams } = props;
  console.table(props);
  if (!contentView) {
    return <Typography>404 Error</Typography>;
  }

  if (contentView === "Account") {
    // display unsubmitted exams
    const examsToDisplay = exams.filter((exam) => {
      return !exam.attempts.length;
    });

    return (
      <>
        <UserDetails
          user={{ name: "Dummy", email: "fake email" }}
        ></UserDetails>
        <Divider></Divider>
        <Typography>Unsubmitted Assessments</Typography>
        <ExamsContainer exams={examsToDisplay}></ExamsContainer>
      </>
    );
  } else {
    // if view not account, view is a code
    // display exams from that section
    const examsToDisplay = exams.filter((exam) => {
      return exam.section.code === contentView;
    });

    return (
      <>
        <SectionDetails details={examsToDisplay[0].section}></SectionDetails>
        <Divider></Divider>
        <Typography>Unsubmitted Assessments</Typography>
        <ExamsContainer exams={examsToDisplay}></ExamsContainer>
      </>
    );
  }
}
