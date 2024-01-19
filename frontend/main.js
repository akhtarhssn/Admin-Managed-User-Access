const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const userId = form.userId.value;
  const password = form.password.value;

  console.log({ userId, password });
};

function makeHttpRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    const result = { data: null, loading: true, error: null };

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        result.loading = false;

        if (httpRequest.status >= 200 && httpRequest.status < 300) {
          result.data = JSON.parse(httpRequest.responseText);
          resolve(result);
        } else {
          result.error = new Error(`HTTP error! Status: ${httpRequest.status}`);
          reject(result);
        }
      }
    };

    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader("Content-Type", "application/json");

    httpRequest.send(data ? JSON.stringify(data) : null);
  });
}

function showToast(message, type = "info") {
  Toastify({
    text: message,
    duration: 3000, // Display duration in milliseconds (e.g., 3000 for 3 seconds)
    close: true, // Show close button
    gravity: "top", // Position of the toast: 'top', 'bottom', 'center'
    position: "center",
    style: { background: type === "error" ? "#ff4444" : "#4CAF50" }, // Customize background color based on the type
  }).showToast();
}
