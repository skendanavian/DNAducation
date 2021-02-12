import { Box, Button, Divider, Typography } from "@material-ui/core";

export default function SectionDetails({ details }) {
  const { title, description, teacher_id, code } = details;
  return (
    <Box>
      <Typography>{code}</Typography>
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
      <Typography>{teacher_id}</Typography>
    </Box>
  );
}
