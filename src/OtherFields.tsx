import "./css/OtherFields.css";

import { Slider, TextField, Typography } from "@material-ui/core";

import { Field } from "react-final-form";

interface IOtherFields {
  type: string;
  submitting: boolean;
}

export function OtherFields({ type, submitting }: IOtherFields) {
  switch (type) {
    case "pizza":
      return (
        <div className="othersContainer">
          <Field name="no_of_slices">
            {({ input, meta }) => (
              <TextField
                type="number"
                required
                inputProps={{ min: "1" }}
                variant="outlined"
                label="# of slices"
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={meta.error || meta.submitError}
                disabled={submitting}
                value={input.value}
                onChange={input.onChange}
              />
            )}
          </Field>
          <Field name="diameter">
            {({ input, meta }) => (
              <TextField
                type="number"
                required
                inputProps={{ step: "any", min: "0" }}
                variant="outlined"
                label="Diameter"
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={meta.error || meta.submitError}
                disabled={submitting}
                value={input.value}
                onChange={input.onChange}
              />
            )}
          </Field>
        </div>
      );
    case "soup":
      return (
        <div className="sliderContainer">
          <Typography gutterBottom>Spiciness</Typography>
          <Field name="spiciness_scale">
            {({ input, meta }) => (
              <Slider
                name={input.name}
                min={1}
                max={10}
                valueLabelDisplay="auto"
                disabled={submitting}
                value={input.value}
                onChange={(event, value) => input.onChange(value)}
              />
            )}
          </Field>
        </div>
      );
    case "sandwich":
      return (
        <div className="othersContainer">
          <Field name="slices_of_bread">
            {({ input, meta }) => (
              <TextField
                type="number"
                required
                inputProps={{ min: "1" }}
                variant="outlined"
                label="# of slices of bread"
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={meta.error || meta.submitError}
                disabled={submitting}
                value={input.value}
                onChange={input.onChange}
              />
            )}
          </Field>
        </div>
      );
    default:
      return <></>;
  }
}
