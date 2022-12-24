import axios from 'axios';
const TOKEN = 'cejavs2ad3if39n2bha0cejavs2ad3if39n2bhag';

export default axios.create({
	baseURL: 'https://finnhub.io/api/v1',
	params: {
		token: TOKEN
	}
})