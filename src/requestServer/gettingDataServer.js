import axios from 'axios';

const sendingDataFromTheServer = async () => {
  const user = localStorage.getItem('user');
  const parseUser = JSON.parse(user);
  try {
    const response = await axios.get('/api/v1/data',
      {
        headers: { Authorization: `Bearer ${parseUser.token}` },
      });
    return response.data;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export default sendingDataFromTheServer;
