import axios from 'axios';
import router from '../routes.js';

const postSendingMessage = async (message, channelId) => {
  const attributes = { ...message };
  try {
    const response = await axios.post(router.channelMessagesPath(channelId), {
      data: { attributes },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.message);
    return null;
  }
};

export default postSendingMessage;
