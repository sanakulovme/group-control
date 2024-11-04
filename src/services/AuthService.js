import axios from 'axios';

const login = async () => {
  const response = await axios.post(
    'https://197f-84-54-71-79.ngrok-free.app/japan/edu/api/auth/login/web',
    {
      phoneNumber: "+998901234568",
      password: "12345678"
    },
    {
      headers: { 'web-request': true }
    }
  );
  localStorage.setItem('token', response.data.token); // Tokenni localStorage’da saqlaymiz
  return response.data.token;
};

export default { login };
