export const urlUS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=aa07570a09784effb2253b36aad73601";
export const urlIN = "https://newsapi.org/v2/top-headlines?country=in&apiKey=aa07570a09784effb2253b36aad73601";
export const urlPrefix = "https://newsapi.org/v2/top-headlines?country=";

export const urlAll = "https://newsapi.org/v2/everything?q=iphone&pageSize=100&language=en&sortBy=publishedAt&apiKey=aa07570a09784effb2253b36aad73601";

export const countries = {'Australia':'au', 
			  'Canada': 'ca',
			  'India': 'in', 
			  'Ireland': 'ie',
			  'Malasia': 'my',
			  'New Zealand': 'nz',
			  'Nigeria': 'ng',
			  'Philippines': 'ph', 
			  'Singapore': 'sg',
			  'Great Britain': 'gb',
			  'USA': 'us', };

export function getNews() {
	fetch(url).then(resp => resp.json()).then(res => res.articles);
}