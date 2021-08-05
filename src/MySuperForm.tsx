import "./css/Form.css";

import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { ClearAll, Send } from "@material-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { Field, Form } from "react-final-form";
import { green, grey, red } from "@material-ui/core/colors";
import moment, { Moment } from "moment";

import { KeyboardTimePicker } from "@material-ui/pickers";
import { OtherFields } from "./OtherFields";

interface FormData {
  name: string;
  preparation_time: Moment;
  type: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale: number;
  slices_of_bread?: string;
}

interface FormDataToStringify {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

const initialValues = {
  preparation_time: moment("00:00:00", "HH:mm:ss"),
  spiciness_scale: 1,
};

interface IMySuperForm {
  setResponseToDisplay: Dispatch<SetStateAction<string>>;
}

const useStyles = makeStyles((theme) => ({
  send: {
    color: theme.palette.getContrastText(green[800]),
    borderColor: green[800],
    "&:hover": {
      borderColor: green[900],
    },
    "&:disabled": {
      color: grey[400],
      borderColor: grey[700],
    },
  },
  reset: {
    color: theme.palette.getContrastText(red[800]),
    borderColor: red[800],
    "&:hover": {
      borderColor: red[900],
    },
    "&:disabled": {
      color: grey[400],
      borderColor: grey[700],
    },
  },
}));

export default function MySuperForm({ setResponseToDisplay }: IMySuperForm) {
  const classes = useStyles();
  async function onSubmit(formValues: FormData) {
    setResponseToDisplay(""); // Remove previous response
    const {
      preparation_time,
      no_of_slices,
      diameter,
      slices_of_bread,
      spiciness_scale,
      type,
    } = formValues;
    const valuesToSend: FormDataToStringify = {
      ...formValues,
      preparation_time: preparation_time.format("HH:mm:ss"),
      // Don't send extra fields
      no_of_slices: type === "pizza" ? Number(no_of_slices) : undefined,
      diameter: type === "pizza" ? Number(diameter) : undefined,
      slices_of_bread:
        type === "sandwich" ? Number(slices_of_bread) : undefined,
      spiciness_scale: type === "soup" ? spiciness_scale : undefined,
    };
    // console.log(valuesToSend);
    const rawResponse = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT!}/dishes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valuesToSend),
      }
    );
    const { ok } = rawResponse;
    const response = await rawResponse.json();
    // console.log(response);
    if (!ok) return response;
    setResponseToDisplay(JSON.stringify(response, null, 2));
  }
  return (
    <Container maxWidth="xs">
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={handleSubmit}>
            <div className="mainContainer">
              <Field name="name">
                {({ input, meta }) => (
                  <TextField
                    label="Dish name"
                    variant="outlined"
                    required
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={meta.error || meta.submitError}
                    disabled={submitting}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="preparation_time">
                {({ input, meta }) => (
                  <KeyboardTimePicker
                    label="Preparation time"
                    required
                    inputVariant="outlined"
                    variant="inline"
                    ampm={false}
                    format="HH:mm:ss"
                    views={["hours", "minutes", "seconds"]}
                    autoOk
                    error={(meta.error || meta.submitError) && meta.touched}
                    helperText={meta.error || meta.submitError}
                    disabled={submitting}
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
              <Field name="type">
                {({ input }) => (
                  <>
                    <Select
                      autoWidth
                      variant="outlined"
                      value={input.value}
                      onChange={input.onChange}
                      required
                      disabled={submitting}
                      className="select"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="pizza">Pizza</MenuItem>
                      <MenuItem value="soup">Soup</MenuItem>
                      <MenuItem value="sandwich">Sandwich</MenuItem>
                    </Select>
                  </>
                )}
              </Field>
              <OtherFields type={values.type} submitting={submitting} />
              <div className="row">
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={submitting}
                  startIcon={<Send />}
                  className={classes.send}
                >
                  Send
                </Button>
                <Button
                  variant="outlined"
                  disabled={submitting || pristine}
                  onClick={form.reset}
                  startIcon={<ClearAll />}
                  className={classes.reset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </Container>
  );
}
