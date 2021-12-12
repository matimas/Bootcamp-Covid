const btnRegions = document.querySelector('.btn-container');
const btnWorld = document.querySelector('.btnWorld');
const btnAsia = document.querySelector('.btnAsia');
const btnAfrica = document.querySelector('.btnAfrica');
const btnAmerica = document.querySelector('.btnAmerica');
const btnEurope = document.querySelector('.btnEurope');
const ctxRegion = document.getElementById('region-chart').getContext('2d');
const ctxCountry = document.getElementById('region-chart').getContext('2d');
const btnChangedMood = document.querySelector('.latest-container');
const regions = {
	world: {
		countries_data: [],
		countries_name: [],
		countries_deaths: [],
		countries_confirmed: [],
		countries_recovered: [],
		countries_critical: [],
		status_mode: 'countries_deaths',
		region: 'world',
	},
	africa: {
		countries_data: [],
		countries_name: [],
		countries_deaths: [],
		countries_confirmed: [],
		countries_recovered: [],
		countries_critical: [],
		status_mode: 'countries_deaths',
		region: 'africa',
	},
	americas: {
		countries_data: [],
		countries_name: [],
		countries_deaths: [],
		countries_confirmed: [],
		countries_recovered: [],
		countries_critical: [],
		status_mode: 'countries_deaths',
		region: 'americas',
	},
	europe: {
		countries_data: [],
		countries_name: [],
		countries_deaths: [],
		countries_confirmed: [],
		countries_recovered: [],
		countries_critical: [],
		status_mode: 'countries_deaths',
		region: 'europe',
	},
	asia: {
		countries_data: [],
		countries_name: [],
		countries_deaths: [],
		countries_confirmed: [],
		countries_recovered: [],
		countries_critical: [],
		status_mode: 'countries_deaths',
		region: 'asia',
	},
};
let currentState = {
	countries_data: [],
	countries_name: [],
	countries_deaths: [],
	countries_confirmed: [],
	countries_recovered: [],
	countries_critical: [],
	statistics_mood: 'countries_deaths',
	region: 'world',
};
let data2 = [];

const getCharData = (data) => {
	const labels = data.countries;
	let charData = {
		labels,
		datasets: [
			{
				data: data.data,
				label: `# Covid 19 ${data.mood} graph in ${data.region}`,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	const config = {
		type: 'line',
		data: charData,
		options: {
			responsive: true,
			animations: {
				tension: {
					duration: 1000,
					easing: 'linear',
					from: 1,
					to: 0,
					loop: true,
				},
			},
			scales: {
				x: {
					// defining min and max so hiding the dataset does not change scale range
					min: 0,
					max: 100,
				},
			},
		},
	};
	return config;
};
let myChart = '';
const generateRegionChart = (resData) => {
	const mood = resData.statistics_mood;
	const data = {
		data: resData[mood],
		countries: resData.countries_name,
		region: resData.region,
		mood: mood,
	};
	const config = getCharData(data);
	if (myChart !== '') myChart.destroy();

	myChart = new Chart(ctxRegion, config);
};
//Return array of regions with all the data after featch request ---using axios library---
const getRegionData = async (data, region) => {
	const baseURLCovid = 'https://corona-api.com/countries';
	if (region !== 'world') {
		//Getting country by region, and stored it in regions[region] (array);
		data.data.forEach(async (country, index) => {
			if (country.cca2 !== 'XK') {
				let response = await axios.get(`${baseURLCovid}/${country.cca2}`);
				regions[region].countries_deaths.push(
					response.data.data.latest_data.deaths,
				);
				regions[region].countries_confirmed.push(
					response.data.data.latest_data.confirmed,
				);
				regions[region].countries_recovered.push(
					response.data.data.latest_data.recovered,
				);
				regions[region].countries_critical.push(
					response.data.data.latest_data.critical,
				);
				regions[region].countries_name.push(response.data.data.name);
				regions[region].countries_data.push(response.data.data);
			}
		});
	} else {
		//Getting countries from the all world, and stored it in regions[world] (array);
		countries = await axios.get(baseURLCovid);
		countries.data.data.forEach((country) => {
			regions.world.countries_confirmed.push(country.latest_data.confirmed);
			regions.world.countries_recovered.push(country.latest_data.recovered);
			regions.world.countries_critical.push(country.latest_data.critical);
			regions.world.countries_deaths.push(country.latest_data.deaths);
			regions.world.countries_name.push(country.name);
			regions.world.countries_data.push(country);
		});
	}
	return regions[region];
};
//Making featch and getting information about each country and return it
const getCountriesData = async (region) => {
	let countries;
	const baseURLCountry =
		'https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/';
	console.log('Called API');
	let data;
	if (region !== 'world') {
		countries = await axios.get(baseURLCountry + region);
		data = await getRegionData(countries, region);
	} else {
		data = await getRegionData([], region);
	}
	return data;
};
//build country template
const buildCountries = (dataCountries) => {
	const countryContainer = document.querySelector('.country-container');
	if (countryContainer.hasChildNodes()) {
		countryContainer.innerHTML = '';
	}
	const countryLabel = document.createElement('div');
	countryLabel.classList.add('country-item-dynamic');
	let num = 0;

	dataCountries.forEach((element) => {
		let country = `<input id=${num} class='user-input' type='text' value=${element.name} />
		               <div class='country-info' id=${element.name}> 
									   <p> Country Name :${element.name}</p>
									   <p> Confirmed Cases :${element.latest_data.confirmed}</p>
									   <p> Number of critical condition :${element.latest_data.critical}</p>
									   <p> Number of Deaths :${element.latest_data.deaths}</p>
									   <p> Number of recovered :${element.latest_data.recovered}</p>
									 </div>`;
		num += 1;
		countryLabel.innerHTML += country;
		countryContainer.append(countryLabel);
	});
	countryLabel.addEventListener('click', (e) => {
		const country = document.getElementById(e.target.value);
		const countryDynamicLabel = document.querySelector('.country-item-dynamic');
		country.style.display = 'block';
		countryDynamicLabel.append(country);
	});
};
//Getting all the information we need about the region and the country and build the canvas with generateRegionChart function
const getRegionCountries = async (region) => {
	const data = await getCountriesData(region);
	data.countries_data.forEach((cd) => {
		currentState.countries_data.push(cd);
		currentState.countries_name.push(cd.name);
		currentState.countries_deaths.push(cd.latest_data.deaths);
		currentState.countries_recovered.push(cd.latest_data.recovered);
		currentState.countries_critical.push(cd.latest_data.critical);
		currentState.countries_confirmed.push(cd.latest_data.confirmed);
	});

	// buildCountry(currentState);
	if (region === 'world') {
		buildCountries(currentState.countries_data);
	}
	generateRegionChart(currentState);
};

//Getting event and Change mood betoween the conditions [deaths, confirmed, recovered, critical]
const statusMood = (event) => {
	const status = event.target.id;
	currentState.statistics_mood = status;
	generateRegionChart(currentState);
};
//updated the currentState
const upDatedState = (state, currentState) => {
	currentState.countries_confirmed = [...state.countries_confirmed];
	currentState.countries_critical = [...state.countries_critical];
	currentState.countries_deaths = [...state.countries_deaths];
	currentState.countries_name = [...state.countries_name];
	currentState.countries_data = [...state.countries_data];
	currentState.countries_recovered = [...state.countries_recovered];
};
//updated the choosing region
const upDatedRegion = (event) => {
	currentState.region = event.target.id;
	upDatedState(regions[currentState.region], currentState);
	generateRegionChart(currentState);
	buildCountries(currentState.countries_data);
};
//Buttons event change mood and change by region
btnChangedMood.addEventListener('click', statusMood);
btnRegions.addEventListener('click', upDatedRegion);

//Loading Page...
window.addEventListener('load', async () => {
	await getRegionCountries('world');
	await getRegionCountries('asia');
	await getRegionCountries('africa');
	await getRegionCountries('europe');
	await getRegionCountries('americas');
});
