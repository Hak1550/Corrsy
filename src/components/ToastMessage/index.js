import React from 'react';

const ToastAlert = ({title, msg, type}) => {
  return <></>;
};

const toastMessage = (title, msg, type, position) => {
  let id = 'toast-message';
  return (
    !Toast.isActive(id) &&
    Toast.show({
      id,
      title: msg,
      placement: position,
      duration: 3000,
      render: () => {
        return <ToastAlert msg={msg} title={title} type={type} />;
      },
    })
  );
};

export default toastMessage;
