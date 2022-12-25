import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

export const AutoComplete = () => {

	const [search, set_search] = useState('');
	const [results, set_results] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await finnHub.get('/search', {
					params: {
						q: search
					}
				})
				if(isMounted){
					set_results(response.data.result);
				}
			} catch(err) {

			}
		}
		if(search.length > 0){
			fetchData();
		} else {
			set_results([]);
		}
		return () => (isMounted = false);
	}, [search])


	return (
		<div className='w-50 p-5 rounded mx-auto'>
			<div className='form-floating dropdown'>
				<input 
					type='text'
					id='search'
					placeholder='Search'
					autoComplete='off'
					className='form-control'
					style={{backgroundColor: 'rgba(145, 158, 171, 0.04)'}} 
					value={search}
					onChange={(e) => set_search(e.target.value)}
				/>
				<label htmlFor='search'>Search</label>
				<ul className={`dropdown-menu ${search.length && 'show'}`}>
				</ul>
			</div>
		</div>
	)
}