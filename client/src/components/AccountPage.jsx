import Nav from "./Nav";
import Typography from "@material-ui/core/Typography";

const AccountPage = (props) => {
  // const { data } = props;
  const classCodes = [
    "STAT 100",
    "HIST 220",
    "PHIL 230",
    "CALC 232",
    "ENG 330",
    "PSY 395",
    "ANTH 440",
  ];
  const pageTitle = "🧬 DNAducation";
  const user = { name: "Devin Sanders", email: "dsand@gmail.com" };

  const navProps = {
    classCodes,
    pageTitle,
    user,
  };
  return (
    <Nav {...navProps}>
      <Typography>
        Et suscipit doloribus eos qui magni ad. Odio deserunt enim odio tempora
        commodi. Sunt corrupti voluptas quas eos quia. Maiores deserunt eius
        atque rerum quibusdam. Totam unde est quo neque cum.
      </Typography>
    </Nav>
  );
};

export default AccountPage;
