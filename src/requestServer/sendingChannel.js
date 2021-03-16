import axios from 'axios';
import router from '../routes.js';

const sendingChannel = async (name) => {
  const attributes = { ...name };
  try {
    const response = await axios.post(router.channelsPath(), {
      data: { attributes },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default sendingChannel;
