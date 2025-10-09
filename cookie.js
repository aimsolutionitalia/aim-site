document.addEventListener("DOMContentLoaded", function(){
  const banner = document.getElementById("cookie-banner");
  const choice = localStorage.getItem("cookiesChoice");

  if (!choice) { if (banner) banner.style.display = "flex"; }
  else { if (banner) banner.style.display = "none"; }

  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (acceptBtn) acceptBtn.onclick = () => { localStorage.setItem("cookiesChoice","accepted"); if (banner) banner.style.display="none"; };
  if (declineBtn) declineBtn.onclick = () => { localStorage.setItem("cookiesChoice","declined"); if (banner) banner.style.display="none"; };
});
