import axios from 'axios';

const sendingDataSignUpForm = async (username, password) => {
  try {
    const response = await axios.post('/api/v1/signup', {
      username,
      password,
    });
    if (response.status === 201) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return { status: response.status };
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export default sendingDataSignUpForm;
