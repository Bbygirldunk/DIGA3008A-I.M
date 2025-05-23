document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("emailBtn").addEventListener("click", () => {
    window.location.href = "mailto:2708798@students.wits.ac.za";
  });

  document.getElementById("phoneBtn").addEventListener("click", () => {
    window.location.href = "tel:+27676691026";
  });

  document.getElementById("githubBtn").addEventListener("click", () => {
    window.open("https://github.com/bbygirldunk", "_blank");
  });
});

