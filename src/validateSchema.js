import * as yup from 'yup';

const getValidationSchema = () => yup.object({
  text: yup.string()
    .min(3, 'Must be 3 to 20 character')
    .max(20, 'Must be 3 to 20 character')
    .required('required'),
});

export default getValidationSchema;
