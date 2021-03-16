import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  NavItem,
  Button,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { changeChannel } from '../../reducers/channels.js';
import { openModal } from '../../reducers/modal.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const selectionActiveChannel = (id) => (currentChannelId === id ? 'primary' : 'light');
  const showModal = (type, extra = null) => dispatch(openModal({ type, extra }));

  const changeClickActiveId = (id) => () => {
    dispatch(changeChannel({ id }));
  };

  const getMainChannels = (channel) => (
    <NavItem key={channel.id} as="li">
      <Button
        onClick={changeClickActiveId(channel.id)}
        variant={selectionActiveChannel(channel.id)}
        className="nav-link btn-block mb-2 text-left"
      >
        {channel.name}
      </Button>
    </NavItem>
  );

  const getCreatedChannels = (channel) => (
    <NavItem key={channel.name} as="li">
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button
          onClick={changeClickActiveId(channel.id)}
          variant={selectionActiveChannel(channel.id)}
          className="flex-grow-1 text-left"
        >
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={selectionActiveChannel(channel.id)} className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => showModal('remove', channel)} href="#">Remove</Dropdown.Item>
          <Dropdown.Item onClick={() => showModal('rename', channel)} href="#">Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </NavItem>
  );

  const renderChannelItems = () => (
    <Nav fill variant="pills" as="ul" className="flex-column">
      {channels.map((channel) => (
        channel.removable ? getCreatedChannels(channel) : getMainChannels(channel)
      ))}
    </Nav>
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" onClick={() => showModal('addChannel')} className="ml-auto p-0 btn btn-link">+</button>
      </div>
      {renderChannelItems()}
    </div>
  );
};

export default Navbar;
