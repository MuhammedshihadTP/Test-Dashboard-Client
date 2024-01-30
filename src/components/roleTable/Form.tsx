import React from "react";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { roleValidation, userValidation } from "../../validation/validation";
import { createRole, createUser, updateUser } from "../../service/adminservice";
import { toast } from "react-toastify";

interface IRoles {
  _id: string;
  name: string;
}


const CreateRoleModal = ({ open, onClose, }:any) => {
  const initialValues = {
    roleName: "",
    description: "",
 
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    validationSchema: roleValidation,
    onSubmit: async (values) => {
      
      try {
        const respose = await createRole('/roles', values);
        if (respose) {
          onClose();
          toast.success(respose.message);
        }
        console.log(respose);
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          padding: 2,
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Role Name"
            name="roleName"
            fullWidth
            margin="normal"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
            helperText={formik.touched.roleName && formik.errors.roleName}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateRoleModal;
