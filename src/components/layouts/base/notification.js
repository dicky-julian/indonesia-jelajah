import { store } from 'react-notifications-component';

const showNotification = (title, message, variants) => {
  store.addNotification({
    title,
    message,
    type: variants,
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
}

export {
  showNotification
}