import { TextField, Box } from "@mui/material";

export function Input(
  name: string,
  setEdit: any,
  data: any = undefined,
  type: string | undefined = undefined
): JSX.Element {
  let param = name.toLowerCase().replace(" ", "_");
  const val = data ? data[param] : undefined;
  return (
    <TextField
      id="outlined"
      type={type}
      label={name}
      defaultValue={val}
      onChange={(e) => {
        setEdit(param, e.target.value);
      }}
    />
  );
}

export function InputBlock(inputs: JSX.Element[]) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      {inputs}
    </Box>
  );
}
