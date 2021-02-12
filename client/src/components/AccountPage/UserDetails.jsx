import { Box, Button, Divider, Typography } from "@material-ui/core";

export default function UserDetails(props) {
  const { user } = props;
  const { name, email } = user;
  return (
    <Box>
      <Typography>{name}</Typography>
      <Typography>{email}</Typography>
      <Button>Record Your TypeDNA Profile!</Button>
    </Box>
  );
}
