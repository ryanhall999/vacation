const API = "https://swapi.co/api/people";

const getSWData = async id => {
	const response = await fetch(`${API}/1/`);
	const data = await response.json();
	console.log(data);
	return data;
};

export default function App() {
	const [person, setPeople] = useState({});

	useEffect(() => {
		getSWData().then(data => setPeople(data));
	}, []);

	return (
		<div>
			<h1>{person.name}</h1>
		</div>
	);
}
