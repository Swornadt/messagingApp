import messenger_logo from "../messenger_logo.png";

self.addEventListener('push', event => {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: {messenger_logo},
      data: {
        url: "https://messagingapp-tibe.onrender.com/",
      },
    };
    event.waitUntil(
      self.registration.showNotification('Messenger', options)
    );
  });

self.addEventListener('notificationclick', event => {
    const notificationData = event.notification.data;
  
    if (notificationData.url) {
      clients.openWindow(notificationData.url);
    }
event.notification.close();
});