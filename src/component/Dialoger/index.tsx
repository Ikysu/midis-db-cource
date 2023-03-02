import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export function Dialoger(
  open: any,
  close: any,
  options: { title: string; content: JSX.Element[]; query: any }
) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>{options.content}</DialogContent>
      <DialogActions>
        <Button onClick={close}>Отмена</Button>
        <Button
          onClick={() => {
            options.query();
            close();
          }}
        >
          Продолжить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
