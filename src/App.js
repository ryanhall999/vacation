import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Vacations from "./Vacations.js";
import CreateVacation from "./createVacation";

const API = "https://acme-users-api-rev.herokuapp.com/api";

let id = "";

const fetchUser = async id => {
	const storage = window.localStorage;
	const userId = storage.getItem("userId");
	if (userId) {
		try {
			return (await axios.get(`${API}/users/detail/${userId}`)).data;
		} catch (ex) {
			storage.removeItem("userId");
			return fetchUser();
		}
	}
	const user = (await axios.get(`${API}/users/random`)).data;
	storage.setItem("userId", user.id);
	id = userId;
	return user;
};

export default function App() {
	const [user, setUser] = useState({ fullName: "" });
	const [vacations, setVacations] = useState([]);

	useEffect(() => {
		fetchUser(id).then(data => setUser(data));
	}, []);

	useEffect(() => {
		if (user.id) {
			axios
				.get(`${API}/users/${user.id}/vacations`)
				.then(response => setVacations(response.data));
		}
	}, [user]);

	const createVac = vac => {
		if (vacations.length >= 3) {
			alert("Cannot Add More Vacations");
			return;
		} else if (vac.startDate === "" || vac.endDate === "") {
			alert("Cannot Add Empty Vacations");
			return;
		}
		return axios
			.post(`${API}/users/${user.id}/vacations`, vac)
			.then(response => setVacations([...vacations, response.data]))
			.catch(error => {
				console.log(error);
			});
	};

	const delVac = delVac => {
		return axios
			.delete(`${API}/users/${user.id}/vacations/${delVac.id}`)
			.then(response =>
				setVacations(vacations.filter(vac => vac.id !== delVac.id))
			);
	};

	console.log(user, vacations);

	return (
		<div className="App">
			<div>
				<h1>
					ACME Vacation Planner for {user.fullName} ({vacations.length})
				</h1>
				<CreateVacation vacations={vacations} createVac={createVac} />
			</div>
			<Vacations vacations={vacations} delVac={delVac} />
		</div>
	);
}

//	fetchVacations(id).then(data => setVacations(data));
