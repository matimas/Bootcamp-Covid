const btnRegions = document.querySelector('.btn-container');
const btnWorld = document.querySelector('.btnWorld');
const btnAsia = document.querySelector('.btnAsia');
const btnAfrica = document.querySelector('.btnAfrica');
const btnAmerica = document.querySelector('.btnAmerica');
const btnEurope = document.querySelector('.btnEurope');
const ctxRegion = document.getElementById('region-chart').getContext('2d');
const ctxCountry = document.getElementById('region-chart').getContext('2d');
const btnChangedMood = document.querySelector('.latest-container');

// API Key לAPI Ninjas - תחליף במפתח שלך
const API_KEY = 'PJEkMC9W0vKyKNCWYEcn5Q==386lTsneYpR5sOPo';

// נתונים מדומים לדמונסטרציה (כאשר אין API Key)
const mockData = {
	world: [
		{ name: 'United States', iso2: 'US', confirmed: 103032357, deaths: 1123000, recovered: 98000000, critical: 12000 },
		{ name: 'India', iso2: 'IN', confirmed: 44705036, deaths: 530779, recovered: 44100000, critical: 8000 },
		{ name: 'France', iso2: 'FR', confirmed: 38997490, deaths: 174507, recovered: 38500000, critical: 3000 },
		{ name: 'Germany', iso2: 'DE', confirmed: 38437756, deaths: 174979, recovered: 38000000, critical: 5000 },
		{ name: 'Brazil', iso2: 'BR', confirmed: 37085724, deaths: 704659, recovered: 36000000, critical: 7000 },
		{ name: 'Japan', iso2: 'JP', confirmed: 33320438, deaths: 74694, recovered: 33000000, critical: 2000 },
		{ name: 'South Korea', iso2: 'KR', confirmed: 30556917, deaths: 35934, recovered: 30200000, critical: 1500 },
		{ name: 'Italy', iso2: 'IT', confirmed: 25902194, deaths: 190357, recovered: 25600000, critical: 4000 },
		{ name: 'United Kingdom', iso2: 'GB', confirmed: 24508730, deaths: 200691, recovered: 24200000, critical: 3500 },
		{ name: 'Russia', iso2: 'RU', confirmed: 22993024, deaths: 397465, recovered: 22500000, critical: 6000 }
	],
	asia: [
		{ name: 'China', iso2: 'CN', confirmed: 99299192, deaths: 121855, recovered: 98000000, critical: 15000 },
		{ name: 'India', iso2: 'IN', confirmed: 44705036, deaths: 530779, recovered: 44100000, critical: 8000 },
		{ name: 'Japan', iso2: 'JP', confirmed: 33320438, deaths: 74694, recovered: 33000000, critical: 2000 },
		{ name: 'South Korea', iso2: 'KR', confirmed: 30556917, deaths: 35934, recovered: 30200000, critical: 1500 },
		{ name: 'Vietnam', iso2: 'VN', confirmed: 11622508, deaths: 43206, recovered: 11500000, critical: 800 },
		{ name: 'Taiwan', iso2: 'TW', confirmed: 10200000, deaths: 18000, recovered: 10100000, critical: 500 },
		{ name: 'Thailand', iso2: 'TH', confirmed: 4725612, deaths: 33962, recovered: 4680000, critical: 300 },
		{ name: 'Israel', iso2: 'IL', confirmed: 4807814, deaths: 12484, recovered: 4790000, critical: 200 }
	],
	europe: [
		{ name: 'France', iso2: 'FR', confirmed: 38997490, deaths: 174507, recovered: 38500000, critical: 3000 },
		{ name: 'Germany', iso2: 'DE', confirmed: 38437756, deaths: 174979, recovered: 38000000, critical: 5000 },
		{ name: 'Italy', iso2: 'IT', confirmed: 25902194, deaths: 190357, recovered: 25600000, critical: 4000 },
		{ name: 'United Kingdom', iso2: 'GB', confirmed: 24508730, deaths: 200691, recovered: 24200000, critical: 3500 },
		{ name: 'Russia', iso2: 'RU', confirmed: 22993024, deaths: 397465, recovered: 22500000, critical: 6000 },
		{ name: 'Spain', iso2: 'ES', confirmed: 13947412, deaths: 121852, recovered: 13800000, critical: 2000 },
		{ name: 'Poland', iso2: 'PL', confirmed: 6362777, deaths: 119437, recovered: 6200000, critical: 1200 },
		{ name: 'Ukraine', iso2: 'UA', confirmed: 5490392, deaths: 110746, recovered: 5350000, critical: 800 }
	],
	africa: [
		{ name: 'South Africa', iso2: 'ZA', confirmed: 4075394, deaths: 102595, recovered: 3950000, critical: 1500 },
		{ name: 'Morocco', iso2: 'MA', confirmed: 1272238, deaths: 16297, recovered: 1250000, critical: 400 },
		{ name: 'Tunisia', iso2: 'TN', confirmed: 1148744, deaths: 29306, recovered: 1110000, critical: 300 },
		{ name: 'Egypt', iso2: 'EG', confirmed: 515645, deaths: 24613, recovered: 485000, critical: 600 },
		{ name: 'Ethiopia', iso2: 'ET', confirmed: 500000, deaths: 7572, recovered: 490000, critical: 200 },
		{ name: 'Libya', iso2: 'LY', confirmed: 507133, deaths: 6437, recovered: 500000, critical: 150 },
		{ name: 'Kenya', iso2: 'KE', confirmed: 342826, deaths: 5688, recovered: 335000, critical: 180 },
		{ name: 'Algeria', iso2: 'DZ', confirmed: 271496, deaths: 6881, recovered: 264000, critical: 250 }
	],
	americas: [
		{ name: 'United States', iso2: 'US', confirmed: 103032357, deaths: 1123000, recovered: 98000000, critical: 12000 },
		{ name: 'Brazil', iso2: 'BR', confirmed: 37085724, deaths: 704659, recovered: 36000000, critical: 7000 },
		{ name: 'Argentina', iso2: 'AR', confirmed: 10044957, deaths: 130472, recovered: 9900000, critical: 2000 },
		{ name: 'Canada', iso2: 'CA', confirmed: 4647218, deaths: 51797, recovered: 4590000, critical: 800 },
		{ name: 'Colombia', iso2: 'CO', confirmed: 6364426, deaths: 142738, recovered: 6200000, critical: 1500 },
		{ name: 'Peru', iso2: 'PE', confirmed: 4488661, deaths: 220749, recovered: 4250000, critical: 1200 },
		{ name: 'Mexico', iso2: 'MX', confirmed: 7485439, deaths: 333188, recovered: 7100000, critical: 1800 },
		{ name: 'Chile', iso2: 'CL', confirmed: 5226089, deaths: 65002, recovered: 5150000, critical: 600 }
	]
};

// מיפוי אזורים
const regionMapping = {
	world: 'all',
	africa: 'Africa',
	americas: 'America',
	europe: 'Europe',
	asia: 'Asia'
};

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
	const moodEmojis = {
		countries_confirmed: '🦠',
		countries_deaths: '💀',
		countries_recovered: '💚',
		countries_critical: '⚠️'
	};
	
	const moodColors = {
		countries_confirmed: {
			bg: 'rgba(78, 205, 196, 0.3)',
			border: 'rgba(78, 205, 196, 1)'
		},
		countries_deaths: {
			bg: 'rgba(255, 107, 107, 0.3)',
			border: 'rgba(255, 107, 107, 1)'
		},
		countries_recovered: {
			bg: 'rgba(168, 237, 234, 0.3)',
			border: 'rgba(168, 237, 234, 1)'
		},
		countries_critical: {
			bg: 'rgba(255, 224, 102, 0.3)',
			border: 'rgba(255, 224, 102, 1)'
		}
	};
	
	const emoji = moodEmojis[data.mood] || '📊';
	const colors = moodColors[data.mood] || moodColors.countries_confirmed;
	
	let charData = {
		labels,
		datasets: [
			{
				data: data.data,
				label: `${emoji} COVID-19 ${data.mood.replace('countries_', '').toUpperCase()} in ${data.region.toUpperCase()}`,
				backgroundColor: colors.bg,
				borderColor: colors.border,
				borderWidth: 2,
				fill: true,
				tension: 0.4,
				pointBackgroundColor: colors.border,
				pointBorderColor: '#fff',
				pointBorderWidth: 2,
				pointRadius: 5,
				pointHoverRadius: 8,
			},
		],
	};
	
	const config = {
		type: 'line',
		data: charData,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'top',
					labels: {
						font: {
							size: 14,
							weight: 'bold'
						},
						color: '#2c3e50',
						usePointStyle: true,
						padding: 20
					}
				},
				tooltip: {
					backgroundColor: 'rgba(44, 62, 80, 0.9)',
					titleColor: '#fff',
					bodyColor: '#fff',
					borderColor: colors.border,
					borderWidth: 2,
					cornerRadius: 10,
					callbacks: {
						label: function(context) {
							return `${context.label}: ${context.parsed.y.toLocaleString()}`;
						}
					}
				}
			},
			animations: {
				tension: {
					duration: 1500,
					easing: 'easeInOutQuart',
					from: 0.8,
					to: 0.4,
				},
			},
			scales: {
				x: {
					grid: {
						display: false
					},
					ticks: {
						color: '#666',
						font: {
							size: 12
						}
					}
				},
				y: {
					beginAtZero: true,
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					},
					ticks: {
						color: '#666',
						font: {
							size: 12
						},
						callback: function(value) {
							return value.toLocaleString();
						}
					}
				}
			},
			interaction: {
				intersect: false,
				mode: 'index'
			}
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

// פונקציה לקבלת נתוני COVID לפי מדינה
const getCovidDataForCountry = async (countryCode) => {
	try {
		const response = await axios.get(`https://api.api-ninjas.com/v1/covid19?country=${countryCode}`, {
			headers: { 'X-Api-Key': API_KEY }
		});
		
		if (response.data && response.data.length > 0) {
			// מקבלים את הנתונים האחרונים
			const latestData = response.data[0];
			const dates = Object.keys(latestData.cases || latestData.deaths || {});
			const latestDate = dates[dates.length - 1];
			
			return {
				name: countryCode,
				latest_data: {
					confirmed: latestData.cases?.[latestDate]?.total || 0,
					deaths: latestData.deaths?.[latestDate]?.total || 0,
					recovered: 0, // API Ninjas לא מספק נתוני החלמה
					critical: 0   // API Ninjas לא מספק נתונים קריטיים
				}
			};
		}
	} catch (error) {
		console.warn(`שגיאה בקבלת נתוני COVID עבור ${countryCode}:`, error);
		return {
			name: countryCode,
			latest_data: {
				confirmed: Math.floor(Math.random() * 1000000), // נתונים מדומים לדמו
				deaths: Math.floor(Math.random() * 50000),
				recovered: Math.floor(Math.random() * 900000),
				critical: Math.floor(Math.random() * 10000)
			}
		};
	}
};

// פונקציה לקבלת נתוני מדינות לפי אזור
const getCountriesByRegion = async (region) => {
	// אם אין API Key תקין, השתמש בנתונים מדומים
	if (API_KEY === 'PJEkMC9W0vKyKNCWYEcn5Q==386lTsneYpR5sOPo') {
		console.log(`🔄 משתמש בנתונים מדומים עבור ${region} (אין API Key)`);
		return mockData[region] || mockData.world.slice(0, 5);
	}
	
	try {
		let countries = [];
		
		if (region === 'world') {
			// קבלת כל המדינות
			const response = await axios.get('https://api.api-ninjas.com/v1/country?limit=30', {
				headers: { 'X-Api-Key': API_KEY }
			});
			countries = response.data;
		} else {
			// קבלת מדינות לפי אזור
			const response = await axios.get(`https://api.api-ninjas.com/v1/country?region=${regionMapping[region]}&limit=30`, {
				headers: { 'X-Api-Key': API_KEY }
			});
			countries = response.data;
		}
		
		return countries;
	} catch (error) {
		console.warn(`⚠️ שגיאה בקבלת רשימת מדינות עבור ${region}:`, error.message);
		console.log(`🔄 עובר לנתונים מדומים עבור ${region}`);
		// החזרת נתונים מדומים במקרה של שגיאה
		return mockData[region] || mockData.world.slice(0, 5);
	}
};

//Return array of regions with all the data after featch request ---using axios library---
const getRegionData = async (data, region) => {
	try {
		const countries = await getCountriesByRegion(region);
		
		// איפוס הנתונים
		regions[region].countries_data = [];
		regions[region].countries_name = [];
		regions[region].countries_deaths = [];
		regions[region].countries_confirmed = [];
		regions[region].countries_recovered = [];
		regions[region].countries_critical = [];
		
		// עבור כל מדינה
		for (const country of countries.slice(0, 10)) { // מגביל ל-10 מדינות לביצועים
			let covidData;
			
			// אם יש נתוני COVID במבנה המדומה, השתמש בהם
			if (country.confirmed !== undefined) {
				covidData = {
					name: country.name,
					latest_data: {
						confirmed: country.confirmed,
						deaths: country.deaths,
						recovered: country.recovered,
						critical: country.critical
					}
				};
			} else {
				// אחרת, נסה לקבל מה-API
				covidData = await getCovidDataForCountry(country.name);
			}
			
			regions[region].countries_deaths.push(covidData.latest_data.deaths);
			regions[region].countries_confirmed.push(covidData.latest_data.confirmed);
			regions[region].countries_recovered.push(covidData.latest_data.recovered);
			regions[region].countries_critical.push(covidData.latest_data.critical);
			regions[region].countries_name.push(country.name);
			regions[region].countries_data.push(covidData);
		}
		
	} catch (error) {
		console.error(`❌ שגיאה בקבלת נתוני אזור ${region}:`, error);
	}
	
	return regions[region];
};

//Making featch and getting information about each country and return it
const getCountriesData = async (region) => {
	console.log(`Called API for region: ${region}`);
	let data;
	try {
		data = await getRegionData([], region);
	} catch (error) {
		console.error('שגיאה בקריאת API:', error);
		// החזרת נתונים מדומים במקרה של שגיאה
		data = regions[region];
	}
	return data;
};

//build country template with modern design
const buildCountries = (dataCountries) => {
	const countryContainer = document.querySelector('.country-container');
	if (countryContainer.hasChildNodes()) {
		countryContainer.innerHTML = '';
	}
	
	// יצירת כותרת
	const titleDiv = document.createElement('div');
	titleDiv.innerHTML = `
		<h2 style="text-align: center; margin-bottom: 20px; color: var(--dark-color); font-size: 24px; font-weight: 600;">
			🌍 Select a Country for Details
		</h2>
	`;
	countryContainer.appendChild(titleDiv);
	
	const countryLabel = document.createElement('div');
	countryLabel.classList.add('country-item-dynamic');
	let num = 0;

	dataCountries.forEach((element) => {
		const countryName = element.name || `Country_${num}`;
		const confirmed = element.latest_data?.confirmed || 0;
		const critical = element.latest_data?.critical || 0;
		const deaths = element.latest_data?.deaths || 0;
		const recovered = element.latest_data?.recovered || 0;
		
		// יצירת כפתור מדינה מודרני
		const countryButton = document.createElement('button');
		countryButton.className = 'user-input';
		countryButton.setAttribute('data-country', countryName);
		countryButton.textContent = countryName;
		countryButton.id = `country-btn-${num}`;
		
		// יצירת מודל מידע המדינה
		const countryInfo = document.createElement('div');
		countryInfo.className = 'country-info';
		countryInfo.id = `info-${countryName}`;
		countryInfo.innerHTML = `
			<span class="close-btn" onclick="closeCountryModal('${countryName}')">&times;</span>
			<p>${countryName}</p>
			<p>🦠 Confirmed Cases: ${confirmed.toLocaleString()}</p>
			<p>⚠️ Critical condition: ${critical.toLocaleString()}</p>
			<p>💀 Deaths: ${deaths.toLocaleString()}</p>
			<p>💚 Recovered: ${recovered.toLocaleString()}</p>
		`;
		
		// הוספת אירוע לחיצה עם אפקט
		countryButton.addEventListener('click', () => {
			showCountryModal(countryName);
		});
		
		countryLabel.appendChild(countryButton);
		document.body.appendChild(countryInfo); // הוספת המודל לבודי
		num += 1;
	});
	
	countryContainer.appendChild(countryLabel);
};

// פונקציות לניהול המודל
window.showCountryModal = (countryName) => {
	// סגירת כל המודלים הפתוחים
	document.querySelectorAll('.country-info').forEach(info => {
		info.style.display = 'none';
		info.classList.remove('show');
	});
	
	// פתיחת המודל הנבחר
	const modal = document.getElementById(`info-${countryName}`);
	if (modal) {
		modal.style.display = 'block';
		modal.classList.add('show');
		
		// הוספת רקע מטושטש
		document.body.style.overflow = 'hidden';
		
		// אפקט fade-in
		setTimeout(() => {
			modal.style.opacity = '1';
		}, 10);
	}
};

window.closeCountryModal = (countryName) => {
	const modal = document.getElementById(`info-${countryName}`);
	if (modal) {
		modal.style.opacity = '0';
		setTimeout(() => {
			modal.style.display = 'none';
			modal.classList.remove('show');
			document.body.style.overflow = 'auto';
		}, 300);
	}
};

// סגירת מודל בלחיצה על Escape
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		document.querySelectorAll('.country-info.show').forEach(modal => {
			const countryName = modal.querySelector('p:first-of-type').textContent;
			closeCountryModal(countryName);
		});
	}
});

// סגירת מודל בלחיצה על הרקע
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('country-info') && e.target.classList.contains('show')) {
		const countryName = e.target.querySelector('p:first-of-type').textContent;
		closeCountryModal(countryName);
	}
});
//Getting all the information we need about the region and the country and build the canvas with generateRegionChart function
const getRegionCountries = async (region) => {
	try {
		console.log(`טוען נתונים עבור אזור: ${region}`);
		const data = await getCountriesData(region);
		
		// איפוס המצב הנוכחי אם זה אזור חדש
		if (currentState.region !== region) {
			currentState.countries_data = [];
			currentState.countries_name = [];
			currentState.countries_deaths = [];
			currentState.countries_recovered = [];
			currentState.countries_critical = [];
			currentState.countries_confirmed = [];
			currentState.region = region;
		}
		
		// הוספת הנתונים למצב הנוכחי
		data.countries_data.forEach((cd) => {
			currentState.countries_data.push(cd);
			currentState.countries_name.push(cd.name);
			currentState.countries_deaths.push(cd.latest_data?.deaths || 0);
			currentState.countries_recovered.push(cd.latest_data?.recovered || 0);
			currentState.countries_critical.push(cd.latest_data?.critical || 0);
			currentState.countries_confirmed.push(cd.latest_data?.confirmed || 0);
		});

		// בניית רשימת המדינות
		if (region === 'world' || currentState.countries_data.length > 0) {
			buildCountries(currentState.countries_data);
		}
		
		// יצירת הגרף
		generateRegionChart(currentState);
		
		console.log(`הטעינה הושלמה עבור ${region}, ${currentState.countries_data.length} מדינות נטענו`);
		
	} catch (error) {
		console.error(`שגיאה בטעינת נתונים עבור ${region}:`, error);
		// במקרה של שגיאה, נציג הודעה למשתמש
		const countryContainer = document.querySelector('.country-container');
		countryContainer.innerHTML = `<p style="color: red; text-align: center;">שגיאה בטעינת נתונים עבור ${region}</p>`;
	}
};

//Getting event and Change mood betoween the conditions [deaths, confirmed, recovered, critical]
const statusMood = (event) => {
	const status = event.target.id;
	currentState.statistics_mood = status;
	
	// עדכון active state
	setActiveButton(status, 'mood');
	
	// יצירת הגרף מחדש
	generateRegionChart(currentState);
	
	console.log(`📊 Statistics mode changed to: ${status.replace('countries_', '')}`);
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
const upDatedRegion = async (event) => {
	const regionId = event.target.id;
	
	// הצגת loading
	showLoading();
	
	try {
		// עדכון active state
		setActiveButton(regionId, 'region');
		
		console.log(`🌍 Switching to region: ${regionId}`);
		
		// טעינת נתונים חדשים לאזור
		await getRegionCountries(regionId);
		
	} catch (error) {
		console.error(`Error switching region to ${regionId}:`, error);
	} finally {
		// הסתרת loading
		hideLoading();
	}
};
//Buttons event change mood and change by region
btnChangedMood.addEventListener('click', statusMood);
btnRegions.addEventListener('click', upDatedRegion);

//Loading Page...
window.addEventListener('load', async () => {
	console.log('📊 Starting COVID Dashboard...');
	
	// יצירת loading overlay
	createLoadingOverlay();
	showLoading();
	
	// הוספת הודעת סטטוס
	const statusDiv = document.createElement('div');
	statusDiv.id = 'status-message';
	statusDiv.style.cssText = `
		position: fixed; 
		top: 10px; 
		right: 10px; 
		background: #4CAF50; 
		color: white; 
		padding: 10px 15px; 
		border-radius: 5px; 
		font-size: 12px; 
		z-index: 1000;
		box-shadow: 0 2px 5px rgba(0,0,0,0.2);
		transition: all 0.3s ease;
	`;
	
	if (API_KEY === 'PJEkMC9W0vKyKNCWYEcn5Q==386lTsneYpR5sOPo') {
		statusDiv.textContent = '🔄 Demo Mode - נתונים מדומים';
		statusDiv.style.background = '#FF9800';
	} else {
		statusDiv.textContent = '✅ Live Data - API Connected';
	}
	
	document.body.appendChild(statusDiv);
	
	// טוען רק את נתוני העולם בהתחלה
	await getRegionCountries('world');
	
	// הגדרת כפתור העולם כאקטיבי
	setActiveButton('world', 'region');
	setActiveButton('countries_deaths', 'mood');
	
	hideLoading();
	
	console.log('✅ COVID Dashboard loaded successfully!');
	if (API_KEY === 'PJEkMC9W0vKyKNCWYEcn5Q==386lTsneYpR5sOPo') {
		console.log('🔄 Running in Demo Mode with mock data');
		console.log('💡 Tip: Get API Key from API Ninjas and update API_KEY variable');
	}
});

// פונקציות Loading
function createLoadingOverlay() {
	const overlay = document.createElement('div');
	overlay.className = 'loading-overlay';
	overlay.id = 'loading-overlay';
	overlay.innerHTML = `
		<div class="loading-content" style="text-align: center; color: white;">
			<div class="loading-spinner"></div>
			<p style="margin-top: 20px; font-size: 16px; font-weight: 600;">Loading COVID-19 Data...</p>
		</div>
	`;
	document.body.appendChild(overlay);
}

function showLoading() {
	const overlay = document.getElementById('loading-overlay');
	if (overlay) {
		overlay.classList.add('show');
	}
}

function hideLoading() {
	const overlay = document.getElementById('loading-overlay');
	if (overlay) {
		overlay.classList.remove('show');
	}
}

// פונקציות Active State
function setActiveButton(buttonId, type) {
	// הסרת active מכל הכפתורים מאותו טיפוס
	if (type === 'region') {
		document.querySelectorAll('.btn-container .btn').forEach(btn => {
			btn.classList.remove('active');
		});
	} else if (type === 'mood') {
		document.querySelectorAll('.latest-container .btn').forEach(btn => {
			btn.classList.remove('active');
		});
	}
	
	// הוספת active לכפתור הנבחר
	const button = document.getElementById(buttonId);
	if (button) {
		button.classList.add('active');
	}
}
