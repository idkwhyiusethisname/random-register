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

// Create form data for registration
const formData = new FormData();
formData.append('user', usname);
formData.append('pass', pspass);
formData.append('pass2', pspass);
formData.append('captcha', '[object HTMLDivElement]');

// Construct fetch options for registration
const registerOptions = {
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

// Perform the fetch POST request for registration
fetch('https://mayashop.xyz/system/register.php', registerOptions)
  .then(response => {
    if (response.ok) {
      console.log('Registration successful');
      return response.text();
    } else {
      throw new Error('Registration failed');
    }
  })
  .then(data => {
    // If registration was successful, perform logout
    const logoutOptions = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1'
      },
      referrer: 'https://mayashop.xyz/?page=information',
      referrerPolicy: 'strict-origin-when-cross-origin',
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch('https://mayashop.xyz/?page=logout', logoutOptions)
      .then(logoutResponse => {
        console.log('Logout Response:', logoutResponse);
      })
      .catch(error => {
        console.error('Logout Error:', error);
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });
