import EqualizerIcon from "@material-ui/icons/Equalizer";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import FunctionsIcon from "@material-ui/icons/Functions";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SchoolIcon from "@material-ui/icons/School";

import Badge from "@material-ui/core/Badge";

export default function SubjectIcon(props) {
  const { text, type } = props;
  if (text === "Account") return <AccountCircleIcon />;
  const subject = text && text.split(" ")[0].toUpperCase();
  const subjectIcon = {
    STAT: <EqualizerIcon />,
    PHIL: <AirlineSeatReclineExtraIcon />,
    CALC: <FunctionsIcon />,
    ENG: <BookIcon />,
    HIST: <HistoryIcon />,
    PSY: <PeopleAltIcon />,
    ANTH: <NaturePeopleIcon />,
  }[subject] || <BookIcon />;

  if (type && type === "Teacher") {
    return (
      <Badge
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<SchoolIcon color="primary" />}
      >
        {subjectIcon}
      </Badge>
    );
  }

  return subjectIcon;
}
