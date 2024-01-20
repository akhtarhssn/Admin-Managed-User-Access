// Example function to check user's role and control page behavior
function checkUserRoleAndInitializePage(token) {
  try {
    // Decode the JWT token's payload

    const decoded = jwt_decode(token);
    const userRole = decoded.role;

    if (userRole !== "User" && userRole !== "Admin" && !token) {
      // Redirect to an unauthorized page or login page
      console.log("Unauthorized");
      window.location.href = "/frontend/unauthorized.html";
    } else if (userRole === "User") {
      // window.location.href = "/frontend/user.html";
      console.log("User");
    } else if (userRole === "Admin") {
      // window.location.href = "/frontend/admin.html";
      console.log("Admin");
    }
  } catch (error) {
    console.log("Error decoding JWT", error);
    // Handle the error as needed, e.g., redirect to login page
    // window.location.href = "/frontend/login.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const userProfile = document.getElementById("user-profile");
  const drawerPanel = document.getElementById("drawer-panel");
  const viewButton = document.getElementById("viewButton");
  const backButton = document.getElementById("backButton");

  if (userProfile && drawerPanel && viewButton && backButton) {
    viewButton.addEventListener("click", function () {
      drawerPanel.classList.remove("-right-[500px]");
      drawerPanel.classList.add("right-0");
      userProfile.classList.add("bg-gray-200");
      viewButton.classList.add("hidden");
    });

    backButton.addEventListener("click", function () {
      userProfile.classList.remove("bg-gray-200");
      drawerPanel.classList.remove("right-0");
      drawerPanel.classList.add("-right-[500px]");
      viewButton.classList.remove("hidden");
    });
  } else {
    console.error("One or more elements not found.");
  }
});

// Call the function when the page loads
window.addEventListener("load", checkUserRoleAndInitializePage);
