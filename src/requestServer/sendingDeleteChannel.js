import axios from 'axios';
import router from '../routes.js';

const postDeleteChannel = async (currentId) => {
  try {
    const response = await axios.delete(router.channelPath(currentId));
    return response.data;
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default postDeleteChannel;
