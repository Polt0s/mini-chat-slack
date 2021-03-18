import axios from 'axios';
import router from '../routes.js';

const sendingRenameChannel = async (id, name) => {
  const attributes = { ...name };
  try {
    const response = await axios.patch(router.channelPath(id), {
      data: { attributes },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default sendingRenameChannel;
