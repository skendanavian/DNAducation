import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { TextField, Typography } from "@material-ui/core";

export default function DummyAccountPage(props) {
  const { userId, setUserId } = props;
  const [formId, setFormId] = useState("");
  console.log("props", { ...props });

  const onSubmit = (e) => {
    e.preventDefault();
    setUserId(formId);
  };

  useEffect(() => {
    console.log("in useEffect", { ...{ userId } });
  }, [userId]);

  const handleInput = (e) => {
    setFormId(e.target.value);
  };
  return (
    <>
      <div>UserId: {userId}</div>
      <form onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="userId"
          label="userId"
          type="userId"
          id="userId"
          inputProps={{ maxLength: 40 }}
          onChange={handleInput}
        />
        <Button type="submit" fullWidth variant="contained" color="secondary">
          <Typography color="primary"> Change userId</Typography>
        </Button>
      </form>
    </>
  );
}
