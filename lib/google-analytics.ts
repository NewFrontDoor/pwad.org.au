//PWAD ids
export const GA_TRACKING_ID = "UA-179034248-1";
export const GA4_TRACKING_ID = "G-BXYV1BHM62";

//NFD testing IDs
//export const GA4_TRACKING_ID = "G-GJ13YG9W57";
//export const GA_TRACKING_ID = "UA-179509736-1";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url, ID) => {
  window.gtag("config", ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
