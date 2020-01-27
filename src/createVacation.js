import React, { useState } from "react";
import moment from "moment";

export default function CreateVacation({ vacations, createVac }) {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();
		await createVac({ startDate, endDate });
		setStartDate(moment().format("MM/DD/YYYY"));
		setEndDate(moment().format("MM/DD/YYYY"));
	};

	return (
		<div>
			<form>
				Start Date:{" "}
				<input
					value={startDate}
					type="date"
					onChange={ev => setStartDate(ev.target.value)}
				></input>
			</form>
			<form>
				End Date:{" "}
				<input
					value={endDate}
					type="date"
					onChange={ev => setEndDate(ev.target.value)}
				></input>
			</form>
			<button onClick={handleSubmit}>Create</button>
		</div>
	);
}
