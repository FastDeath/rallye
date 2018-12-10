import { Api } from "@/api";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
// import { EventBus } from "@/EventBus";

export default {
  init() {
    if ("serviceWorker" in navigator) {
      this.serviceWorker = navigator.serviceWorker;

      runtime
        .register()
        .then(function(registration) {
          console.log("registration:", registration);
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: window.vapidPublicKey
          });
        })
        .then(function(subscription) {
          console.log("subscription:", subscription);
          Api.post("push/subscribe", subscription);
        })
        .catch(function(err) {
          console.error(err);
        });

      // maybe update scores on push?
      // navigator.serviceWorker.addEventListener("message", function(e) {
      //   console.log("vue sw msg:", e);
      //   EventBus.$emit("ServiceWorkerMessage", e);
      // });
    }
  }
};
