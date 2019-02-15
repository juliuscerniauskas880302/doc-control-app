import React, { Component } from "react";

var showMessageData = {
  message: "",
  messageType: "",
  show: false
};

function handleMessageInput(message, messageType, timeout) {
  let data = {
    message: message,
    messageType: messageType,
    show: true
  };
  showMessageData = data;
  let emptyData = {
    message: "",
    messageType: "",
    show: false
  };
  setTimeout(() => {
    showMessageData = emptyData;
  }, timeout);
}

function showMessage() {
  if (showMessageData.show) {
    return (
      <div
        className={`
          alert alert-${showMessageData.messageType} fixed-top text-center
          `}
      >
        {showMessageData.message}
      </div>
    );
  } else {
    return null;
  }
}
export { handleMessageInput, showMessage };
