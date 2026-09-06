import React, {useMemo, useState} from 'react'
import {CalendarDays, MapPin, Users, Vote, Trophy, ChevronRight, Search, Menu, X, Clock3} from 'lucide-react'
import data from './demo'
import logo from './nngg-logo.png'

const nav=[['Inicio','inicio'],['Ciudades','ciudades'],['Equipos','equipos'],['Temas','temas'],['Gran final','final']]

function daysLeft(){
  const deadline=new Date('2026-09-27T23:59:59')
  const now=new Date()
  return Math.max(0,Math.ceil((deadline-now)/(1000*60*60*24)))
}

export default function App(){
 const [page,setPage]=useState('inicio')
 const [mobile,setMobile]=useState(false)
 return <div className="app">
  <header className="topbar">
   <button className="brand" onClick={()=>setPage('inicio')} aria-label="Inicio">
    <img src={logo} alt="NNGG"/>
    <span><strong>III TORNEO NACIONAL DE DEBATE</strong><small>NNGG ESPAÑA · 2026</small></span>
   </button>
   <nav className="desktopnav">{nav.map(([l,k])=><button key={k} className={page===k?'active':''} onClick={()=>setPage(k)}>{l}</button>)}</nav>
   <button className="mobilebtn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
  </header>
  {mobile&&<div className="mobilenav">{nav.map(([l,k])=><button key={k} onClick={()=>{setPage(k);setMobile(false)}}>{l}</button>)}</div>}
  <main>
   {page==='inicio'&&<Home go={setPage}/>} 
   {page==='ciudades'&&<Cities/>}
   {page==='equipos'&&<Teams/>}
   {page==='temas'&&<Topics/>}
   {page==='final'&&<Final/>}
  </main>
  <footer><img src={logo} alt="NNGG"/><span>III Torneo Nacional de Debate · Demo</span><small>Datos ficticios para maqueta</small></footer>
 </div>
}

function Home({go}){
 const dl=daysLeft()
 return <>
  <section className="hero">
   <div className="flagline"><i></i><b></b><i></i></div>
   <img className="herologo" src={logo} alt="NNGG"/>
   <div className="kicker">NNGG ESPAÑA PRESENTA</div>
   <h1>III Torneo Nacional<br/><em>de Debate</em></h1>
   <p className="lead">Una competición de <strong>debate académico</strong> para formarnos, competir y poner en valor el talento de nuestra organización.</p>
   <div className="heroactions">
    <button className="primary" onClick={()=>go('ciudades')}>Ver fase clasificatoria <ChevronRight size={18}/></button>
    <button className="secondary" onClick={()=>go('temas')}>Temas a debate</button>
   </div>
  </section>

  <section className="deadline">
   <div className="deadlineicon"><Clock3/></div>
   <div><span>INSCRIPCIONES</span><strong>27 de septiembre</strong><small>Último día para inscribir a tu equipo</small></div>
   <div className="count"><strong>{dl}</strong><span>días</span></div>
  </section>

  <section className="stats">
   <Stat icon={<MapPin/>} n="13" label="Ciudades"/>
   <Stat icon={<CalendarDays/>} n="3/10 oct" label="Clasificatorias"/>
   <Stat icon={<Users/>} n="16" label="Finalistas"/>
   <Stat icon={<Trophy/>} n="24 oct" label="Gran final · Madrid"/>
  </section>

  <section className="section split">
   <div><SectionTitle eyebrow="FORMATO" title="Debate académico"/><p className="copy">La fase clasificatoria se celebrará en trece ciudades de España durante los fines de semana del <strong>3 o del 10 de octubre</strong>, según la sede. Los mejores equipos avanzarán a la final nacional.</p><button className="textlink" onClick={()=>go('ciudades')}>Consultar sedes <ChevronRight/></button></div>
   <div className="infoCard"><span>01</span><h3>Formación</h3><p>Habrá sesiones formativas que se anunciarán próximamente.</p><span>02</span><h3>Temas elegidos por votación</h3><p>Las mociones partirán de los temas más votados por los participantes.</p></div>
  </section>

  <section className="finalbanner">
   <div><span>24 OCTUBRE · MADRID</span><h2>La gran final</h2><p>16 equipos finalistas. Una única jornada. Un campeón nacional.</p></div>
   <button onClick={()=>go('final')}>Ver cuadro demo <ChevronRight/></button>
  </section>
 </>
}

function Cities(){return <section className="section page"><SectionTitle eyebrow="FASE CLASIFICATORIA" title="13 ciudades"/><p className="intro">Cada equipo participa en la sede asignada. En esta demo, las ciudades y cifras de equipos son ficticias.</p><div className="citygrid">{data.cities.map((c,i)=><div className="citycard" key={c.name}><span>{String(i+1).padStart(2,'0')}</span><MapPin size={19}/><h3>{c.name}</h3><p>{c.date} · {c.teams} equipos</p><div className="citybar"><i style={{width:`${Math.min(100,c.teams*6)}%`}}></i></div></div>)}</div></section>}

function Teams(){
 const [q,setQ]=useState('')
 const list=useMemo(()=>data.teams.filter(t=>(t.name+' '+t.city).toLowerCase().includes(q.toLowerCase())),[q])
 return <section className="section page"><SectionTitle eyebrow="PARTICIPANTES" title="Equipos"/><div className="searchbox"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar equipo o ciudad"/></div><div className="teamgrid">{list.map(t=><div className="teamcard" key={t.id}><div className="teammark">{t.name.slice(0,2).toUpperCase()}</div><div><h3>{t.name}</h3><p><MapPin size={14}/>{t.city}</p></div><div className="teamstats"><span><b>{t.wins}</b> victorias</span><span><b>{t.points}</b> puntos</span></div></div>)}</div></section>
}

function Topics(){return <section className="section page"><SectionTitle eyebrow="VOTACIÓN" title="Temas a debate"/><p className="intro">Los temas del torneo serán elegidos por votación. Esta pantalla muestra un ejemplo de cómo podría visualizarse el proceso.</p><div className="topiclist">{data.topics.map((t,i)=><div className="topic" key={t.title}><div className="topicnum">0{i+1}</div><div><span className="pill"><Vote size={14}/>{t.status}</span><h3>{t.title}</h3><div className="votebar"><i style={{width:`${t.votes*2}%`}}></i></div></div><strong>{t.votes}%</strong></div>)}</div></section>}

function Final(){return <section className="section page"><SectionTitle eyebrow="24 OCTUBRE · MADRID" title="Gran final"/><div className="finalintro"><Trophy/><div><h3>16 equipos finalistas</h3><p>Competirán en una única jornada en Madrid. El cuadro de abajo es solamente una maqueta visual.</p></div></div><div className="bracket">{data.qualifiers.map((m,i)=><div className="duel" key={m.city}><div className="dueltop"><span>{m.city}</span><b>Clasificatoria {i+1}</b></div><div className={m.winner===m.a?'win':''}>{m.a}<span>{m.winner===m.a?'CLASIFICA':''}</span></div><div className={m.winner===m.b?'win':''}>{m.b}<span>{m.winner===m.b?'CLASIFICA':''}</span></div></div>)}</div><div className="finalslot"><span>MADRID · 24 OCT</span><Trophy size={30}/><strong>16 FINALISTAS</strong><small>Una jornada · un campeón nacional</small></div></section>}

function SectionTitle({eyebrow,title}){return <div className="sectiontitle"><span>{eyebrow}</span><h2>{title}</h2></div>}
function Stat({icon,n,label}){return <div className="stat"><span>{icon}</span><strong>{n}</strong><small>{label}</small></div>}
