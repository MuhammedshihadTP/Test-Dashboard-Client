
import { useFormik } from 'formik';
import * as Yup from 'yup';
export const userValidation= Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    role: Yup.string().required('Required'),
  })


  export const roleValidation= Yup.object({
    roleName: Yup.string().required('Required'),
    description: Yup.string().min(5, 'Must be at least 5 characters'),
 
  })


  
  export const loginValidation =Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })