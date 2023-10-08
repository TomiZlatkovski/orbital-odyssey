import { iPlanet } from "../Interfaces"
import { useState } from "react"
import { Link } from 'react-router-dom'
 
interface iPlanetProps {
    planets: iPlanet[]
    planetCounter: number
    setCounter: Function
}

export function Planet({planets, planetCounter, setCounter}: iPlanetProps)
{

    const [animation, setAnimation] = useState("")
    const [big, setBig] = useState("")

    function goLeft()
    {
        setBig("MakeBig 1s")
        setCounter((val:number) => planetCounter != 0 ? val-1 : val)
        planetCounter != 0 ? setAnimation("SlideRight 1s") : null   
        setTimeout(()=>{setAnimation("");},1000)
        setTimeout(()=>setBig(""),1000)
    };

    function goRight()
    {
        setBig("MakeBig 1s")
        setCounter((val:number) => planets.length-1 == planetCounter ? val : val+1)
        planets.length-1 != planetCounter ? setAnimation("SlideLeft 1s") : null
        setTimeout(()=>setAnimation(""),1000)
        setTimeout(()=>setBig(""),1000)
    }

    return (    
        <>
        <div className="Planets" style={{animation: animation}}>
            <div>
                {planetCounter >= 2 ? <img src={planets[planetCounter-2].image} className="canvas" /> : null }
            </div>
            <div style={{cursor: big == "MakeBig 1s" ? "default" : "pointer"}} onClick={() => big == "MakeBig 1s" ? null : goLeft()}>
                {planetCounter != 0 ? <img src={planets[planetCounter-1].image} className="canvas" /> : null }
            </div>
            
                <div>
                    <h1 style={{animation: big == "MakeBig 1s" ? "Fade 1s" : ""}}><Link style={{textDecoration: "none",color: "white"}} to="/info" state={{planet: planets[planetCounter]}} >{planets[planetCounter]["name"].toUpperCase()}</Link></h1>
                    
                    <Link to="/info" state={{planet: planets[planetCounter]}} ><img src={planets[planetCounter].image} className="canvas" /></Link>
                    
                    <h2 style={{ fontSize: "1rem", animation: big == "MakeBig 1s" ? "Fade 1s" : ""}}>{planets[planetCounter]["description"]}</h2>
                </div>
            <div style={{cursor: big == "MakeBig 1s" ? "default" : "pointer"}} onClick={() => big == "MakeBig 1s" ? null : goRight()}>
                {planetCounter == planets.length-1 ? null : <img src={planets[planetCounter+1].image} className="canvas" /> }
            </div>
            <div>
                {planetCounter >= planets.length-2 ? null : <img src={planets[planetCounter+2].image} className="canvas" /> }
            </div>
        </div>
        <i style={{left: "2%", top:"50%", display: big == "MakeBig 1s" ? "none" : "initial" }} onClick={() => goLeft()}className="fa-solid fa-chevron-left Arrows"></i> 
        <i style={{right: "2%", top:"50%",display: big == "MakeBig 1s" ? "none" : "initial" }} onClick={() => goRight()} className="fa-solid fa-chevron-right Arrows"></i> 
        </>
    )
}

export function Slider({planets, planetCounter}: iPlanetProps)
{
    return (
    <div className="Slider">
        {planets?.map((planet, index)=><button className="button" key={index} style={{background: index == planetCounter ? planet["color"][0] : "rgba(255, 255, 255, 0.603)"}}></button>)}
    </div>
    )
}