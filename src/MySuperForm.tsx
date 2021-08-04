import "./css/Form.css";

import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { Field, Form } from "react-final-form";
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

async function onSubmit(formValues: FormData) {
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
    slices_of_bread: type === "sandwich" ? Number(slices_of_bread) : undefined,
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
  const response = await rawResponse.json();
  // console.log(response);
  // Responses with errors don't have id
  if (!response.id) return response;
}

const initialValues = {
  preparation_time: moment("00:00:00", "HH:mm:ss"),
  spiciness_scale: 1,
};

export default function MySuperForm() {
  return (
    <div className="mainContainer">
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={handleSubmit}>
            <div className="container">
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
            </div>
            <div className="container">
              <Button type="submit" variant="outlined" disabled={submitting}>
                Send
              </Button>
              <Button
                variant="outlined"
                disabled={submitting || pristine}
                onClick={form.reset}
              >
                Reset
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}
