// Login.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { loginValidation } from '../../validation/validation';
import { login } from '../../service/adminservice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



// Styled components
const Container = styled.div`
  text-align: center;
  margin-top: 15rem;

`;

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 16px;
  }
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
  }
`;

const Login = () => {

    const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
     
      console.log('Form values:', values);
try {
    const response =await login('/login',values)
    const token = response.token;

      
        localStorage.setItem('token', token);
        navigate("/user")

    console.log(response);
} catch (error:any) {
   
    toast.error("please provide valid password or username")
}
      
    },
  });

  return (
    <Container>
        <ToastContainer/>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledTextField
          label="Username"
          variant="outlined"
          fullWidth
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <SubmitButton type="submit" variant="contained" style={{backgroundColor:"Black"}}>
          Login
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default Login;
