// Example function to check user's role and control page behavior
function checkUserRoleAndInitializePage() {
  const token = localStorage.getItem("token");

  try {
    // Decode the JWT token's payload
    const decoded = jwt_decode(token);

    const userRole = decoded.role;

    if (userRole !== "User") {
      // Redirect to an unauthorized page or login page
      window.location.href = "/frontend/unauthorized.html";
    } else {
      // Initialize the user.html page for authorized users
      // Add your code here to set up the page for authorized users
      console.log("User is authorized!");
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
    // Handle the error as needed, e.g., redirect to login page
    window.location.href = "/frontend/login.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const drawer = document.getElementById("drawer");
  const viewButton = document.getElementById("viewButton");
  const backButton = document.getElementById("backButton");

  viewButton.addEventListener("click", function () {
    drawer.classList.remove("-right-[500px]");
    drawer.classList.add("right-0");
    viewButton.classList.add("hidden");
  });

  backButton.addEventListener("click", function () {
    drawer.classList.remove("right-0");
    drawer.classList.add("-right-[500px]");
    viewButton.classList.remove("hidden");
  });
});

// Call the function when the page loads
window.addEventListener("load", checkUserRoleAndInitializePage);
