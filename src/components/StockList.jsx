import { useState, useEffect } from 'react';
import { CaretDownFill } from 'react-bootstrap-icons';
import { CaretUpFill } from 'react-bootstrap-icons';
import finnHub from '../apis/finnHub';

export const StockList = () => {
	const [stock, set_stock] = useState();
	const [watch_list, set_watch_list] = useState(['GOOGL', 'MSFT', 'AMZN']);


	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			try {
				const responses = await Promise.all(watch_list.map((name) => {
					return finnHub.get("/quote", {
						params: {
							symbol: name
						}
					})
				}))
				console.log('responses',responses);
				const data = responses.map((response) => {
					return {
						data: response.data,
						symbol: response.config.params.symbol
					}
				})
				console.log('data', data);
				if(isMounted){
					set_stock(data);
				}
			} catch(err) {

			}
		}
		fetchData();

		return () => (isMounted = false);
	}, []);
	return (
		<div>
			<table className='table hover mt-5'>
				<thead style={{color: 'rgb(79, 89, 102)'}}>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Last</th>
						<th scope='col'>Chg</th>
						<th scope='col'>Chg%</th>
						<th scope='col'>High</th>
						<th scope='col'>Low</th>
						<th scope='col'>Open</th>
						<th scope='col'>Pclose</th>
					</tr>
				</thead>
				<tbody>
					{
						// For the first time, when the component gets rendered, the stock will be undefined. So we are putting a condition to check if it gets the value or not
						stock && 
						stock.map((stockData) => {
							return (
								<tr className='table-row' key={stockData.symbol}>
									<th scope='row'>{stockData.symbol}</th>
									<td>{stockData.data.c}</td>
									<td className={`text-${stockData.data.d>0? 'success':'danger'}`}
									>
										{stockData.data.d}
										{stockData.data.d>0?<CaretUpFill />:<CaretDownFill />}
									</td>
									<td className={`text-${stockData.data.d>0? 'success':'danger'}`}
									>
										{stockData.data.dp}
										{stockData.data.dp>0?<CaretUpFill />:<CaretDownFill />}
									</td>
									<td>{stockData.data.h}</td>
									<td>{stockData.data.l}</td>
									<td>{stockData.data.o}</td>
									<td>{stockData.data.pc}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

