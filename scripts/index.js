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
const btnRegions = document.querySelector('.btn-container');
const btnWorld = document.querySelector('.btnWorld');
const btnAsia = document.querySelector('.btnAsia');
const btnAfrica = document.querySelector('.btnAfrica');
const btnAmerica = document.querySelector('.btnAmerica');
const btnEurope = document.querySelector('.btnEurope');
const ctx = document.getElementById('myChart').getContext('2d');
const latestContainer = document.querySelector('.latest-container');
let data2 = [];
let currentState = {
	countries_data: [],
	countries_name: [],
	countries_deaths: [],
	countries_confirmed: [],
	countries_recovered: [],
	countries_critical: [],
	status_mood: 'countries_deaths',
	region: 'world',
	canvas_type: 'bar',
};

let myChart = '';
const generateChart = (resData) => {
	// if (resData.countries_name.length === 0) {
	// 	return;
	// }
	const mood = resData.status_mood;
	const data = {
		data: resData[mood],
		countries: resData.countries_name,
		region: resData.region,
	};
	console.log(data);
	if (myChart !== '') myChart.destroy();
	myChart = new Chart(ctx, {
		type: 'line', // bar, pie, line, doughnut, radar, polarArea
		data: {
			labels: data.countries,
			datasets: [
				{
					label: `# Covid 19 ${mood} graph in ${data.region}`,
					data: data.data,
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
		},
		options: {
			title: {
				display: true,
				text: `INthe latest updated about`,
				fontSize: 25,
			},
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
};
const getRegionData = async (data, region) => {
	const baseURLCovid = 'https://corona-api.com/countries';
	if (region !== 'world') {
		data.data.forEach((country, index) => {
			if (country.cca2 !== 'XK') {
				axios.get(`${baseURLCovid}/${country.cca2}`).then((response) => {
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
				});
			}
		});
	} else {
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
	console.log(regions[region]);
	return regions[region];
};

const getCountries = async (region) => {
	let countries;
	const baseURLCountry =
		'https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/';

	console.log('Called API');
	let data;
	if (region !== 'world') {
		countries = await axios.get(baseURLCountry + region);
		data = await getRegionData(countries, region);
		console.log(data);
	} else {
		data = await getRegionData([], region);
	}

	data.countries_data.forEach((cd) => {
		currentState.countries_data.push(cd);
		currentState.countries_name.push(cd.name);
		currentState.countries_deaths.push(cd.latest_data.deaths);
		currentState.countries_recovered.push(cd.latest_data.recovered);
		currentState.countries_critical.push(cd.latest_data.critical);
		currentState.countries_confirmed.push(cd.latest_data.confirmed);
	});

	console.log(currentState);
	generateChart(currentState);
};

//change mood
const statusMood = (event) => {
	const status = event.target.id;
	currentState.status_mood = status;
	console.log('recaver');
	console.log(currentState);
	generateChart(currentState);
};
//updated state
const upDateState = (state, currentState) => {
	currentState.countries_confirmed = [...state.countries_confirmed];
	currentState.countries_critical = [...state.countries_critical];
	currentState.countries_deaths = [...state.countries_deaths];
	currentState.countries_name = [...state.countries_name];
	currentState.countries_data = [...state.countries_data];
	currentState.countries_recovered = [...state.countries_recovered];
	console.log('the currentState in the updatedstate:', currentState);
	console.log('the state to updated in the updatedstate:', state);
};
//all the btn event
latestContainer.addEventListener('click', statusMood);
btnRegions.addEventListener('click', (e) => {
	const region = e.target.id;
	currentState.region = region;
	upDateState(regions[region], currentState);
	generateChart(currentState);
});

//Loading Page...
window.addEventListener('load', async () => {
	await getCountries('world');
	await getCountries('asia');
	await getCountries('africa');
	await getCountries('europe');
	await getCountries('americas');
});

// const regions = {
// 	world: {
// 		countries_data: [],
// 		countries_name: [],
// 		deaths: 0,
// 		confirmed: 0,
// 		recovered: 0,
// 		critical: 0,
// 	},
// 	africa: {
// 		countries_data: [],
// 		countries_name: [],
// 		deaths: 0,
// 		confirmed: 0,
// 		recovered: 0,
// 		critical: 0,
// 	},
// 	americas: {
// 		countries_data: [],
// 		countries_name: [],
// 		deaths: 0,
// 		confirmed: 0,
// 		recovered: 0,
// 		critical: 0,
// 	},
// 	europe: {
// 		countries_data: [],
// 		countries_name: [],
// 		deaths: 0,
// 		confirmed: 0,
// 		recovered: 0,
// 		critical: 0,
// 	},
// 	asia: {
// 		countries_data: [],
// 		countries_name: [],
// 		deaths: 0,
// 		confirmed: 0,
// 		recovered: 0,
// 		critical: 0,
// 	},
// };

// const btnWorld = document.querySelector('.btnWorld');
// const btnAsia = document.querySelector('.btnAsia');
// const btnAfrica = document.querySelector('.btnAfrica');
// const btnAmerica = document.querySelector('.btnAmerica');
// const btnEurope = document.querySelector('.btnEurope');
// const ctx = document.getElementById('myChart');
// const latestContainer = document.querySelector('.latest-container');
// let myChart = '';
// let data2 = [];
// let curentState = {
// 	countries_data: [],
// 	countries_name: [],
// 	status_mood: '',
// };

// const generateChart = (resData) => {
// 	const data = [];
// 	console.log(resData);
// 	resData.countries_data.forEach((cd) => {
// 		data.push(cd.latest_data.deaths);
// 		curentState.countries_data.push(cd);
// 		curentState.countries_name.push(cd);
// 	});
// 	console.log(curentState);
// 	if (myChart !== '') myChart.destroy();
// 	myChart = new Chart(ctx, {
// 		type: 'bar',
// 		data: {
// 			labels: resData.countries_name,
// 			datasets: [
// 				{
// 					label: `# Covid 19  Deaths`,
// 					data: data,
// 					backgroundColor: [
// 						'rgba(255, 99, 132, 0.2)',
// 						'rgba(54, 162, 235, 0.2)',
// 						'rgba(255, 206, 86, 0.2)',
// 						'rgba(75, 192, 192, 0.2)',
// 						'rgba(153, 102, 255, 0.2)',
// 					],
// 					borderColor: [
// 						'rgba(255, 99, 132, 1)',
// 						'rgba(54, 162, 235, 1)',
// 						'rgba(255, 206, 86, 1)',
// 						'rgba(75, 192, 192, 1)',
// 						'rgba(153, 102, 255, 1)',
// 					],
// 					borderWidth: 1,
// 				},
// 			],
// 		},
// 		options: {
// 			scales: {
// 				y: {
// 					beginAtZero: true,
// 				},
// 			},
// 		},
// 	});
// };
// const getRegionData = async (data, region) => {
// 	const baseURLCovid = 'https://corona-api.com/countries';
// 	if (region !== 'world') {
// 		data.data.forEach((country, index) => {
// 			if (country.cca2 !== 'XK') {
// 				axios.get(`${baseURLCovid}/${country.cca2}`).then((response) => {
// 					regions[region].deaths += response.data.data.latest_data.deaths;
// 					regions[region].confirmed += response.data.data.latest_data.confirmed;
// 					regions[region].recovered += response.data.data.latest_data.recovered;
// 					regions[region].critical += response.data.data.latest_data.critical;
// 					regions[region].countries_name.push(response.data.data.name);
// 					regions[region].countries_data.push(response.data.data);
// 				});
// 			}
// 		});
// 	} else {
// 		countries = await axios.get(baseURLCovid);
// 		countries.data.data.forEach((country) => {
// 			regions.world.deaths += country.latest_data.deaths;
// 			regions.world.confirmed += country.latest_data.confirmed;
// 			regions.world.recovered += country.latest_data.recovered;
// 			regions.world.critical += country.latest_data.critical;
// 			regions.world.countries_name.push(country.name);
// 			regions.world.countries_data.push(country);
// 		});
// 		generateChart(regions[region]);
// 	}
// };
// const getCountries = async (region) => {
// 	let countries;
// 	const baseURLCountry =
// 		'https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/';

// 	console.log('Called API');
// 	if (region !== 'world') {
// 		countries = await axios.get(baseURLCountry + region);
// 		getRegionData(countries, region);
// 	} else {
// 		getRegionData([], region);
// 	}
// }; //TODO keep building the structure of the statusmood
// const statusMood = (event) => {
// 	const status = event.target.id;
// 	switch (status) {
// 		case 'confirmed':
// 			generateChart;
// 			break;

// 		default:
// 			break;
// 	}
// };

// btnWorld.addEventListener('click', () => {
// 	generateChart(regions.world);
// });
// btnAfrica.addEventListener('click', () => {
// 	generateChart(regions.africa);
// });
// btnAsia.addEventListener('click', () => {
// 	generateChart(regions.asia);
// });
// btnAmerica.addEventListener('click', () => {
// 	generateChart(regions.americas);
// });
// btnEurope.addEventListener('click', () => {
// 	generateChart(regions.europe);
// });
// //Loading Page...
// window.addEventListener('load', () => {
// 	getCountries('world').catch((err) => {
// 		console.error(err);
// 	});

// 	getCountries('asia').catch((err) => {
// 		console.error(err);
// 	});
// 	getCountries('africa').catch((err) => {
// 		console.error(err);
// 	});
// 	getCountries('europe').catch((err) => {
// 		console.error(err);
// 	});
// 	getCountries('americas').catch((err) => {
// 		console.error(err);
// 	});
// });

// latestContainer.addEventListener('click', statusMood);
