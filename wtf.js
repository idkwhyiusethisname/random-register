// Function to generate random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate random values for usname and pspass
const usname = generateRandomString(8);
const pspass = generateRandomString(8);

// Create form data
const formData = new FormData();
formData.append('user', usname);
formData.append('pass', pspass);
formData.append('pass2', pspass);
formData.append('captcha', '[object HTMLDivElement]');

// Construct fetch options
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

// Perform the fetch POST request
fetch('https://mayashop.xyz/system/register.php', requestOptions)
  .then(response => response.text())
  .then(data => {
    console.log('Random usname:', usname);
    console.log('Random pspass:', pspass);
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
