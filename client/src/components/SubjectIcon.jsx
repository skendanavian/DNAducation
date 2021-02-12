import EqualizerIcon from "@material-ui/icons/Equalizer";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import FunctionsIcon from "@material-ui/icons/Functions";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function SubjectIcon(props) {
  const { text } = props;
  if (text === "Account") return <AccountCircleIcon />;
  const subject = text && text.split(" ")[0].toUpperCase();
  return (
    {
      STAT: <EqualizerIcon />,
      PHIL: <AirlineSeatReclineExtraIcon />,
      CALC: <FunctionsIcon />,
      ENG: <BookIcon />,
      HIST: <HistoryIcon />,
      PSY: <PeopleAltIcon />,
      ANTH: <NaturePeopleIcon />,
    }[subject] || <BookIcon />
  );
}
