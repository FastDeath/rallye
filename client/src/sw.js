console.log("sw here!");
console.log("sw self", self);

self.addEventListener("push", function(event) {
  const data = event.data.json();
  console.log("push received", event, data);

  // var title = "Yay a message.";
  // var body = "We have received a push message.";
  // var icon = "/images/icon-192x192.png";
  // var tag = "simple-push-demo-notification-tag";

  if (data.notification) {
    event.waitUntil(
      self.registration.showNotification(
        data.notification.title,
        data.notification
      )
    );
  }

  // maybe notify the page to update stuff?
  if (data.event) {
    self.clients.matchAll().then(clients => {
      for (const client of clients) {
        console.log("sw send msg to:", client);
        client.postMessage(data.event);
      }
    });
  }
});
