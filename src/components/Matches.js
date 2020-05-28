import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Matches = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [currentTeam, setCurrentTeam] = useState(null);
	useEffect(() => {
		axios
			.get('http://localhost:8080/gameInformation')
			.then(
				(response) => {
					setData(response.data);
					setLoading(false);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	let halfTimeInformation = [];
	let footballPlayerList = [];

	if (!loading) {

		footballPlayerList = data.finalResult.footballPlayerList;
		halfTimeInformation = data.finalResult.halfTimeInformationList;
	}

	const toggleRow = (index, team) => {
		setCurrentIndex(index);
		setCurrentTeam(team);
	};

	const accordion = (i) => {
		if (currentIndex === i) {
			return (
				<tr key={i + 1}>
					<td colSpan='12'>
						<p>
							<b className='m-3'>Player ID:</b>
							{currentTeam.id}
						</p>
						<p>
							<b className='m-3'>Player shirt number:</b>
							{currentTeam.shirtNumber}
						</p>
						<p>
							<b className='m-3'>Distance ran:</b>
							{currentTeam.lengthRun + ' [m]'}
						</p>
						<p>
							<b className='m-3'>Maximum speed:</b>
							{currentTeam.maxSpeed + ' [m/s]'}
						</p>
					</td>
				</tr>
			);
		}
	};

	return (
		<div className="container">
			<h3 className='text-center mt-3'>
				<b>GAME INFORMATION</b>
			</h3><br/>
			<div>
				{halfTimeInformation.map((data) => (
					<>
						<p>Half time start: {convertTime(data.start)}</p>
						<p>Half time end: {convertTime(data.end)}</p>
						<p>Location: {data.location}</p>
						<p>Field size: {data.length + " " + data.width}</p>
					</>
				))}
			</div>
			<table className='table table-condensed table-hover'>
				<thead>
					<tr>
						<th>Team</th>
					</tr>
				</thead>
				<tbody>
					{footballPlayerList.map((footballPlayer, i) => (
						<>
							<tr
								key={i}
								onClick={() => toggleRow(i, footballPlayer)}
								style={{ cursor: 'pointer' }}>							
								<td>{footballPlayer.teamId}</td>			
							</tr>
							{accordion(i)}
						</>
					))}
				</tbody>
			</table>
		</div>
	);
};

function convertTime(params) {
	let  d = new Date(params);
	let month = '' + (d.getMonth() + 1);
	let day = '' + d.getDate();
	let year = d.getFullYear();
	let hours = d.getHours();
	let minutes = d.getMinutes();
	let seconds = d.getSeconds();

	if (month.length < 2) 
	month = '0' + month;
	if (day.length < 2) 
	day = '0' + day;

	return 'Date: ' + [year, month, day].join('-') +
		'Time: ' + [hours, minutes, seconds].join(':');
}

export default Matches;
