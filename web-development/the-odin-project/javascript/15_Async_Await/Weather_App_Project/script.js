

const getWeather = async () => {
    const location = document.getElementById('location').value;
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
    const temp = document.getElementById('temp');
    const tempLabel = document.getElementById('tempLabel');

    const resp = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=`)
    const data = await resp.json();

    temp.innerText = data?.currentConditions?.temp;

    if (data.currentConditions.temp) {
        tempLabel.innerText = 'Fahrenheit'
    }
}

const toggleTemp = () => {
    const temp = document.getElementById('temp');
    const tempLabel = document.getElementById('tempLabel');

    if (temp.innerText && tempLabel.innerText === 'Celsius') {
        const fah = (1.8 * Number(temp.innerText)) + 32;
        temp.innerText = fah.toFixed(1);
        tempLabel.innerText = 'Fahrenheit'
    } else {
        const cel = (Number(temp.innerText) - 32) * (0.55555556);
        temp.innerText = cel.toFixed(1);
        tempLabel.innerText = 'Celsius'
    }
}