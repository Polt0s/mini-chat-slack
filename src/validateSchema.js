import * as yup from 'yup';

const getValidationSchema = (channelName) => yup.object({
  text: yup.string().trim()
    .notOneOf(channelName, 'Such a channel already exists')
    .min(3, 'Must be 3 to 20 character')
    .max(20, 'Must be 3 to 20 character')
    .required('required'),
});

export default getValidationSchema;
