
const getWeather = async () => {
    const location = document.getElementById('location').value;

    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;

    console.log(location);
    console.log(date1);
    console.log(date2);

    const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=YOUR_API_KEY`)
    const data = await resp.json();

    console.log(data);
}