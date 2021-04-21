import { useContext } from 'react';

import Context from '../ApiContext.jsx';

const useApi = () => useContext(Context);

export default useApi;
