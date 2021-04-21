import { useContext } from 'react';

import Context from '../AuthContext.jsx';

const useAuth = () => useContext(Context);

export default useAuth;
