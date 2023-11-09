document.addEventListener("DOMContentLoaded", function () {
    const companyList = ["Company A", "Company B", "Company C"];
  
    const selectElement = document.getElementById("select");
    companyList.forEach(function (company, index) {
      const option = document.createElement("option");
      option.value = company;
      option.textContent = company;
      selectElement.appendChild(option);
    });
  });

function redirectToNew() {
    const selectedCompany = document.getElementById("select").value;

    if (selectedCompany === "") {
        alert("Please select a company.");
      } else {
    const queryString = "?companyName=" + encodeURIComponent(selectedCompany);
    window.location.href = "editor" + queryString;
  }}