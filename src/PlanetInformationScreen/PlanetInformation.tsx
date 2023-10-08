import { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { Ripple } from 'primereact/ripple';
import { useLocation } from 'react-router-dom'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "../PlanetInformation.css"
import ThreeScene from '../ThreeJSContainer';

export default function PlanetInformation() {
    
    const [activeTab, setActiveTab] = useState<number>(0)

    const location = useLocation()
    const { planet } = location.state

    const [expand, setExpand] = useState<boolean>(false)

    useEffect(() => {
        const clases = document.getElementsByClassName("p-panel-header") as any
        
        for (let i = 0; i < clases.length; i++) {
            clases[i].style.background = `linear-gradient(90deg, ${planet.color[1]} 0%, ${planet.color[0]} 50%, ${planet.color[0]} 100%)`
        }
        const clases2 = document.getElementsByClassName("p-panel-content") as any
        for (let i = 0; i < clases2.length; i++) {
            clases2[i].style.background = `linear-gradient(90deg, ${planet.color[1]} 0%, ${planet.color[0]} 50%, ${planet.color[0]} 100%)`
        }
        
    }, [expand, activeTab])

    

    const template = (options: PanelHeaderTemplateOptions, head : any) => {
        const toggleIcon = options.collapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
        const className = `${options.className} justify-content-end`;

        return (
            <div className={className} style={{ color: "white" }}>
                {head}
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span style={{color:"white"}} className={toggleIcon}></span>
                    <Ripple />
                </button>
            </div>
        );
    }

    function onExpand() {
        setExpand((val) => val? false : true)
    }

    return (
        <div className='root' style={{ background: `radial-gradient(circle, ${planet.color[0]} 0%, ${planet.color[1]} 100%)` }}>
            <main>
                <canvas id='viewport' style={{ zIndex: 0, position: "absolute", background: "transparent" }}></canvas>

                <ThreeScene planetName={planet.name} labelColor={planet.color[0]}></ThreeScene> {/* TREBA DA SE PASSNE PLANET TOA BOJATA I ACTIVE TAB INDEX ZA DENOVITE DA ZNAE KOJ E OTVOREN MOMENTALNO */}
                <h1 className='planetName' style={{ zIndex: 1 }}>{planet.name.toUpperCase()}</h1>
                <div style={{ flex: 1 }}></div>
                <TabView activeIndex={activeTab} onTabChange={(e) => { setActiveTab(e.index); console.log(e.index) }} className={`tourSelector`} style={{ zIndex: 1 }}>
                    {planet.tour.days.map((tourDay: any, index: any) => (
                        <TabPanel key={index} header={'Day ' + (index + 1)}>
                            {tourDay.event.map((event: any, index: any) => (
                                <Panel collapsed onExpand={onExpand} style={{ margin: "5px" }} headerTemplate={(opt) => template(opt, <div className='time-name-wrapper'>
                                    <h2 className='event-time'>{event.time}</h2>
                                    <h2 className='event-name'>{event.name}</h2>
                                </div>)} toggleable className='dayEvent' key={index}>
                                    {event.image && <img className='event-image' style={{ color: "white" }} src={event.image} alt={event.name + '-image'} />}
                                    <h3 className='event-description' style={{ color: "white", padding: "10px" }}>{event.description}</h3>
                                </Panel>
                            ))}
                        </TabPanel>
                    ))}
                </TabView>
                <div className='planetStats' >
                    <h1><span className='planetStat' style={{color: `${planet.color[0]}`}}>Temperature: </span><span className='var'>{planet.temperature}</span>C</h1>
                    <h1><span className='planetStat' style={{ color: `${planet.color[0]}`}}>Days in a year: </span><span className='var'>{planet.daysInYear}</span>days</h1>
                    <h1><span className='planetStat' style={{ color: `${planet.color[0]}`}}>Length of a day: </span><span className='var'>{planet.dayLength.hours}</span>h:<span className='var'>{planet.dayLength.minutes}</span>m:<span className='var'>{planet.dayLength.seconds}</span>s</h1>
                </div>
                <button style={{ zIndex: 1, fontSize: "1.5rem", marginTop: "40px" }} className='Exit' onClick={() => window.location.href = "/"}><i className='fa-solid fa-arrow-left' style={{ transform: "translateY(3px)" }}></i>Explore Other Planets</button>
            </main>
        </div>
    )
}