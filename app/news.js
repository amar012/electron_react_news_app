import { urlKey } from "./config/key";

export const urlUS = `https://newsapi.org/v2/top-headlines?country=us${urlKey}`;
export const urlIN = `https://newsapi.org/v2/top-headlines?country=in${urlKey}`;
export const urlAll = `https://newsapi.org/v2/everything?q=iphone&pageSize=100&language=en&sortBy=publishedAt${urlKey}`;

export const urlPrefix = "https://newsapi.org/v2/top-headlines?country=";

export const countries = {'Australia':'au', 
			  'Canada': 'ca',
			  'India': 'in', 
			  'Ireland': 'ie',
			  'Malaysia': 'my',
			  'New Zealand': 'nz',
			  'Nigeria': 'ng',
			  'Philippines': 'ph', 
			  'Singapore': 'sg',
			  'Great Britain': 'gb',
			  'USA': 'us', };

export function getNews() {
	fetch(url).then(resp => resp.json()).then(res => res.articles);
}