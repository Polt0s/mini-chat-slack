import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesBox from '../messages/MessagesBox.jsx';
import { changeChannel } from '../../reducers/channels.js';

const Navbar = (props) => {
  const dispatch = useDispatch();
  // const channel = useSelector((state) => state.addChannel.channels);

  const { channels } = props;
  // channels.map((item) => dispatch(changeChannel(item)));
  // dispatch(changeChannel(channels));
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((item) => (
          <li key={item.id} className="nav-item">
            <button type="button" className="nav-link btn-block mb-2 text-left btn btn-primary">{item.name}</button>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Navbar;
