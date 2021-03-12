import Cookies from 'js-cookie';
import faker from 'faker';

const getRandomUserName = () => {
  const userName = Cookies.get('userName');
  const randomUserName = faker.name.findName();
  if (!userName) {
    Cookies.set('userName', 'randomUserName');
    return randomUserName;
  }
  return userName;
};

export default getRandomUserName;
