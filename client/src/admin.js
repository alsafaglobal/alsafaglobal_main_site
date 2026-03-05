export const handleAdmin = (type) => {
  const pwd = window.prompt("Enter Admin Password:");
  if (!pwd) return;

  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
  if (pwd === adminPassword) {
    if (type === "cms") {
      const url = process.env.REACT_APP_SANITY_STUDIO_URL;
      if (url) window.location.href = url;
      else alert("CMS URL not configured");
    }
    if (type === "analytics") {
      alert("Analytics coming soon 🙂");
    }
  } else {
    alert("Incorrect Password 😐");
  }
};


