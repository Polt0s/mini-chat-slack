import React from 'react';

const Navbar = (props) => {
  const { channels } = props;
  return (
    channels.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))
  );
};

export default Navbar;
