import React from "react";
import moment from "moment";

export default function Vacations({ vacations, delVac }) {
	return (
		<div>
			{vacations.map(vac => {
				return (
					<div>
						<div key={vac.id}>
							{moment(vac.startDate).format("dddd MM/DD/YYYY")} to{" "}
							{moment(vac.endDate).format("dddd MM/DD/YYYY")} (
							{moment(vac.endDate).diff(moment(vac.startDate), "days")} days)
							<button onClick={() => delVac(vac)}>X</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
