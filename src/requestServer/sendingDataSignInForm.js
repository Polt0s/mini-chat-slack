import axios from 'axios';

const sendingDataSignInForm = async (username, password) => {
  try {
    const response = await axios.post('/api/v1/login', {
      username,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export default sendingDataSignInForm;
