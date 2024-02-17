import React from "react";
import { useFormik } from "formik";
import { geoCode } from "@/utils/geoCode";
import axios from 'axios';

const InputForm = () => {
  const formik = useFormik({
    initialValues: {
      startingLocation: "",
      destinationLocation: "",
    },
    onSubmit: async (values) => {
      console.log("Form values are valid:", values);

      try {
        const response = await axios.post('http://localhost:8080/calculate', {
        startingLocation: startingLocation,
        destinationLocation: destinationLocation,
      });

      if (!response.okay) {
        throw new Error('Something went wrong');
      }
      // manage this data
      console.log(response);
      } catch (error) {
        console.log(error);
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
        padding: "20px",
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
