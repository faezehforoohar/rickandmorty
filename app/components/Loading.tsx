import { Spinner, Stack } from "react-bootstrap";

export default function Loading() {
  return (
    <Stack className="justify-content-center align-items-center">
      <Spinner animation="border" />
    </Stack>
  );
}
