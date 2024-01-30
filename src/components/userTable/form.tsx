import React from "react";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userValidation } from "../../validation/validation";
import { createUser, updateUser } from "../../service/adminservice";

interface IRoles {
  _id: string;
  name: string;
}

interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: IRoles;
  password: string;
}

interface Props {
  open: any;
  onClose: any;
  roles: any;
  isEdit?: IUsers;
}

const CreateUserModal = ({ open, onClose, roles, isEdit }: Props) => {
  const initialValues = {
    name: isEdit ? isEdit?.name : "",
    email: isEdit ? isEdit?.email : "",
    password: isEdit ? isEdit?.password : "", 
    role: isEdit ? isEdit?.role?.name : "",
  };


  console.log(isEdit, "werty");
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    validationSchema: userValidation,
    onSubmit: async (values) => {
      
      console.log(values);

      try {
        if (isEdit) {
          const respose = await updateUser(`/users/${isEdit?._id}`, values);
          if (respose) {
            onClose();
          }
          console.log(respose);
        }
        const respose = await createUser("/users", values);
        if (respose) {
          onClose();
        }
        console.log(respose);
      } catch (error: any) {
        console.log(error.message);
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
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Role"
            name="role"
            select
            fullWidth
            margin="normal"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {roles.map((role: any) => (
              <MenuItem key={role} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
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

export default CreateUserModal;
