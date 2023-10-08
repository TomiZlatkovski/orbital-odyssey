import { useState, Suspense } from "react";
import { Planet } from "./PlanetSelectionScreen/PlanetSelection"
import { Slider } from "./PlanetSelectionScreen/PlanetSelection"
import { iPlanet } from "./Interfaces.tsx";
import PlanetInformation from "./PlanetInformationScreen/PlanetInformation.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import planets from './Resources.json'


// const planets: iPlanet[] = testPlanets


function App() {
	const [counter, setCounter] = useState(0)
    
	
	return (
		<div className="root" style={{backgroundColor: planets[counter].color[1]}}>
			<main>
				<h1 className="Heading">CHOOSE YOUR DESTINATION</h1>
				<Planet planets={planets as iPlanet[]} setCounter={setCounter} planetCounter={counter}></Planet>
				<Slider planets={planets as iPlanet[]} setCounter={setCounter} planetCounter={counter}></Slider>
			</main>
		</div>
	)
}

export default function AppSoRouter() {
	return (
		<Router>
			<Suspense fallback={<main><h1>Fetching data</h1></main>}>
				<Routes>
					<Route path="/" Component={App}></Route>
					<Route path="/info" element={<PlanetInformation></PlanetInformation>}></Route>
				</Routes>
			</Suspense>
		</Router>
	) 
}