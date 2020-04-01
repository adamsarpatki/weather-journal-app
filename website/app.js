/* Global Variables */
const baseURL = 'api.openweathermap.org/data/2.5/weather?';
const appID = 'd29325eeedff19bec6e46a01c7124d3f';

const getData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
  });

  try {
    const newData = response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const retreive = async () => {
  const retreivedData = await getData('/data');
  document.getElementById('date').innerHTML = retreivedData.date;
  document.getElementById('temp').innerHTML = retreivedData.temperature;
  document.getElementById('content').innerHTML = retreivedData.userResponse;
}

const sendData = async () => {
  const zip = document.getElementById('zip');
  const userResponse = document.getElementById('feelings');
  let d = new Date();
  let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
  const weatherData = await getData(`http://api.openweathermap.org/data/2.5/weather?zip=${zip.value},us&appid=${appID}`);
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userResponse: userResponse.value
  };
  await postData('/data', data);
  retreive();
}

const generate = document.getElementById('generate');
generate.addEventListener("click", sendData);