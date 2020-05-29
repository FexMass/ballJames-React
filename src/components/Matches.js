import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/UI/Spinner/Spinner.js';

const Matches = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(null);
	const [currentTeam, setCurrentTeam] = useState(null);
	const [spinner, setSpinner] = useState(null);
	const [halfTimeInformation, setHalftimeInformation] = useState(null);
	const [footballPlayer, setFootballPlayer] = useState(null);
	useEffect(() => {
		axios
			.get('http://localhost:8080/gameInformation')
			.then(
				(response) => {
					setSpinner(<Spinner />);

					const timer = setTimeout(() => {
						setData(response.data);
						setHalftimeInformation(response.data.finalResult.halfTimeInformationList);
						setFootballPlayer(response.data.finalResult.footballPlayerList);
						setLoading(false);
						setSpinner(null);
					}, 2000);
					return () => clearTimeout(timer);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

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
			</h3><br />
			{loading ? (
				spinner
			) : (
					<div className="parentElement">
						<div>
							<h3>First half</h3>
							<p>Start: {convertDateAndTime(halfTimeInformation[0].start)}</p>
							<p>End: {convertDateAndTime(halfTimeInformation[0].end)}</p>
							<br/>
							<h3>Second half</h3>
							<p>Start: {convertDateAndTime(halfTimeInformation[1].start)}</p>
							<p>End: {convertDateAndTime(halfTimeInformation[1].end)}</p>
							<br/>
							<h3>Other information</h3>
							<p>Location: {halfTimeInformation[1].location}</p>
							<p>Field size: {halfTimeInformation[1].length + " x " + halfTimeInformation[1].width + " [m]"}</p>
						</div>
						<table className='table table-condensed table-hover'>
							<thead>
								<tr>
									<th>Team</th>
								</tr>
							</thead>
							<tbody>
								{footballPlayer.map((footballPlayer, i) => (
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
				)}
		</div>
	);
};

let convertDateAndTime = (params) => {
	let d = new Date(params);
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

	return 'Date: ' + [year, month, day].join('-') + '\n' +
		'Time: ' + [hours, minutes, seconds].join(':');
}

export default Matches;
