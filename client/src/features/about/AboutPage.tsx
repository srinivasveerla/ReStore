import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";
export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }
  return (
    <>
      <Typography variant="h2">Exception testing</Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => {
            agent.TestErrors.get400Error().catch((error) =>
              console.log("error:", error)
            );
          }}
        >
          400Error
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            agent.TestErrors.get404Error().catch((error) =>
              console.log("error:", error)
            );
          }}
        >
          404Error
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            agent.TestErrors.get401Error().catch((error) =>
              console.log("error:", error)
            );
          }}
        >
          401Error
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            agent.TestErrors.get500Error().catch((error) =>
              console.log("error:", error)
            );
          }}
        >
          500Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          ValidationError
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </>
  );
}
