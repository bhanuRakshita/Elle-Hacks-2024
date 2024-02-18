import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useMyContext } from "@/context/transitroute-context";

const InputForm = () => {
  const { state, updateState } = useMyContext();
  const formik = useFormik({
    initialValues: {
      startingLocation: "",
      destinationLocation: "",
    },
    onSubmit: async (values) => {
      console.log("Form values are valid:", values);

      try {
        const response = await axios.post("http://127.0.0.1:5000/calculate", {
          startingLocation: values.startingLocation,
          destinationLocation: values.destinationLocation,
        });
        console.log('!!!!!!!!!!!!!');
        console.log(response);
        updateState({'heloo':'fnjcn', 'rfrr':'rf'});

      } catch (error) {
        console.log(error);
        ////////////////////////////////////////
        updateState({'heloo':'fnjcn', 'rfrr':'rf'});
      }
    },
    validate: (values) => {
      let errors = {};

      if (!values.startingLocation) {
        errors.startingLocation = "Starting location is required!";
      }

      if (!values.destinationLocation) {
        errors.destinationLocation = "Destination location is required!";
      }

      return errors;
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        padding: "60px",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="startingLocation" style={{ marginRight: "10px" }}>
          Choose a starting place
        </label>
        <input
          type="text"
          id="startingLocation"
          name="startingLocation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.startingLocation}
          placeholder="Enter a location"
        />
        {formik.touched.startingLocation && formik.errors.startingLocation ? (
          <div>{formik.errors.startingLocation}</div>
        ) : null}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="destinationLocation" style={{ marginRight: "10px" }}>
          Choose destination
        </label>
        <input
          type="text"
          id="destinationLocation"
          name="destinationLocation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.destinationLocation}
          placeholder="Enter a destination"
        />
        {formik.touched.destinationLocation &&
        formik.errors.destinationLocation ? (
          <div>{formik.errors.destinationLocation}</div>
        ) : null}
      </div>

      <button type="submit">Get me there safe!</button>
    </form>
  );
};

export default InputForm;
