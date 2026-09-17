import React, {useMemo, useState} from 'react'
import {CalendarDays, MapPin, Users, Vote, Trophy, ChevronRight, Search, Menu, X, Clock3, RefreshCw} from 'lucide-react'
import data from './realData'
import logo from './nngg-logo.png'

const nav=[['Inicio','inicio'],['Ciudades','ciudades'],['Equipos','equipos'],['Temas','temas'],['Gran final','final']]

function fmtDate(iso, fallback=''){
  if(!iso) return fallback
  const [y,m,d]=String(iso).split('-').map(Number)
  if(!y||!m||!d) return String(iso)
  return new Intl.DateTimeFormat('es-ES',{day:'numeric',month:'long'}).format(new Date(y,m-1,d))
}
function daysLeft(deadline){
  const target=new Date(`${deadline}T23:59:59`)
  return Math.max(0,Math.ceil((target-new Date())/(1000*60*60*24)))
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
   {page==='inicio'&&<Home go={setPage} data={data}/>}
   {page==='ciudades'&&<Cities data={data}/>}
   {page==='equipos'&&<Teams data={data}/>}
   {page==='temas'&&<Topics data={data}/>}
   {page==='final'&&<Final data={data}/>}
  </main>
  <footer><img src={logo} alt="NNGG"/><span>III Torneo Nacional de Debate</span><small>Datos reales de inscripción · 17 septiembre 2026</small></footer>
 </div>
}

function Home({go,data}){
 const c=data.config||{}
 const deadline=c.cierre_inscripcion||'2026-09-27'
 const dl=daysLeft(deadline)
 return <>
  <section className="hero">
   <div className="flagline"><i></i><b></b><i></i></div>
   <img className="herologo" src={logo} alt="NNGG"/>
   <div className="kicker">NNGG ESPAÑA PRESENTA</div>
   <h1>III Torneo Nacional<br/><em>de Debate</em></h1>
   <p className="lead">Una competición de <strong>debate académico</strong> para formarnos, competir y poner en valor el talento de nuestra organización.</p>
   <div className="heroactions">
    <button className="primary" onClick={()=>go('ciudades')}>Elegir sede clasificatoria <ChevronRight size={18}/></button>
    <button className="secondary" onClick={()=>go('temas')}>Ver temas a debate</button>
   </div>
  </section>

  <section className="deadline">
   <div className="deadlineicon"><Clock3/></div>
   <div><span>INSCRIPCIONES</span><strong>27 de septiembre</strong><small>Último día para inscribir un equipo de 4 o 5 personas</small></div>
   <div className="count"><strong>{dl}</strong><span>días</span></div>
  </section>

  <section className="stats">
   <Stat icon={<MapPin/>} n="13" label="Sedes clasificatorias"/>
   <Stat icon={<CalendarDays/>} n="3/10 oct" label="Dos fines de semana"/>
   <Stat icon={<Users/>} n={String(data.teams.length)} label="Respuestas recibidas"/>
   <Stat icon={<Trophy/>} n="24 oct" label="Gran final · Madrid"/>
  </section>

  <section className="section split">
   <div>
    <SectionTitle eyebrow="INSCRIPCIÓN" title="Cada equipo elige sede"/>
    <p className="copy">Los equipos eligen una de las 13 sedes clasificatorias. La inscripción admite también solicitudes pendientes de completar equipo. Siete sedes compiten el <strong>3 de octubre</strong>, Sevilla el <strong>8 de octubre</strong> y cinco sedes el <strong>10 de octubre</strong>.</p>
    <button className="textlink" onClick={()=>go('ciudades')}>Consultar las 13 sedes <ChevronRight/></button>
   </div>
   <div className="infoCard">
    <span>01</span><h3>Votación de temas</h3><p>Cada equipo selecciona en la inscripción el tema sobre el que preferiría debatir.</p>
    <span>02</span><h3>Cómo se reparten</h3><p>El tema más votado se debatirá en la gran final. Los temas segundo y tercero se debatirán en la fase clasificatoria.</p>
   </div>
  </section>

  <section className="finalbanner">
   <div><span>24 OCTUBRE · MADRID</span><h2>La gran final</h2><p>Los equipos clasificados en las 13 sedes competirán en una única jornada.</p></div>
   <button onClick={()=>go('final')}>Ver finalistas <ChevronRight/></button>
  </section>
 </>
}

function Cities({data}){
 const first=data.cities.filter(c=>c.date==='2026-10-03')
 const seville=data.cities.filter(c=>c.date==='2026-10-08')
 const second=data.cities.filter(c=>c.date==='2026-10-10')
 const Block=({title,list})=><>
   <h3 className="dateheading">{title}</h3>
   <div className="citygrid">{list.map((c,i)=><div className="citycard" key={c.id}>
      <span>{String(c.id).padStart(2,'0')}</span><MapPin size={19}/>
      <h3>{c.name}</h3>
      <p>{c.responses ?? c.registered} respuestas recibidas · {c.registered} equipos confirmados</p>
      <small>{c.finalistSlots ? `${c.finalistSlots} ${c.finalistSlots===1?'plaza':'plazas'} para la final` : 'Plazas para la final: por confirmar'}</small>
      <div className="citybar"><i style={{width:`${Math.min(100,c.registered*8)}%`}}></i></div>
   </div>)}</div>
 </>
 return <section className="section page">
   <SectionTitle eyebrow="FASE CLASIFICATORIA" title="13 sedes"/>
   <p className="intro">Al inscribirse, cada grupo debe elegir una de estas sedes. La ciudad elegida determina también la fecha de su clasificatoria.</p>
   <Block title="FIN DE SEMANA DEL 3 DE OCTUBRE" list={first}/>
   <Block title="JUEVES 8 DE OCTUBRE" list={seville}/>
   <Block title="FIN DE SEMANA DEL 10 DE OCTUBRE" list={second}/>
 </section>
}

function Teams({data}){
 const [q,setQ]=useState('')
 const list=useMemo(()=>data.teams.filter(t=>(t.name+' '+t.city).toLowerCase().includes(q.toLowerCase())),[q,data.teams])
 return <section className="section page">
  <SectionTitle eyebrow="INSCRIPCIONES" title="Equipos"/>
  <p className="intro">{data.teams.length ? 'La lista se alimenta directamente de las respuestas reales del formulario. No se publican datos personales de los participantes.' : 'Todavía no hay equipos cargados. En cuanto lleguen respuestas del formulario aparecerán aquí automáticamente.'}</p>
  <div className="searchbox"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar equipo o sede"/></div>
  <div className="teamgrid">{list.map(t=><div className="teamcard" key={t.id}>
    <div className="teammark">{t.name.slice(0,2).toUpperCase()}</div>
    <div><h3>{t.name}</h3><p><MapPin size={14}/>{t.city}</p><small>{t.participants} participantes · {fmtDate(t.date)}</small></div>
    <div className="teamstats"><span><b>{t.status||'INSCRITO'}</b></span></div>
  </div>)}</div>
 </section>
}

function Topics({data}){
 return <section className="section page">
  <SectionTitle eyebrow="VOTACIÓN" title="Temas a debate"/>
  <p className="intro">Cada equipo vota un tema al inscribirse. El <strong>1.º más votado</strong> será el tema de la gran final; los <strong>2.º y 3.º</strong> se debatirán en la fase clasificatoria.</p>
  <div className="topiclist">{data.topics.map((t,i)=><div className="topic" key={t.id}>
   <div className="topicnum">{String(i+1).padStart(2,'0')}</div>
   <div>
    <span className="pill"><Vote size={14}/>{i===0?'GRAN FINAL':i<3?'CLASIFICATORIA':'EN VOTACIÓN'}</span>
    <h3>{t.title}</h3>
    <div className="votebar"><i style={{width:`${t.pct||0}%`}}></i></div>
   </div>
   <strong>{t.votes} votos<br/><small>{t.pct||0}%</small></strong>
  </div>)}</div>
 </section>
}

function Final({data}){
 return <section className="section page">
  <SectionTitle eyebrow="24 OCTUBRE · MADRID" title="Gran final"/>
  <div className="finalintro"><Trophy/><div><h3>Final nacional</h3><p>Los finalistas se cargarán automáticamente cuando se confirme qué equipos clasifican en cada sede.</p></div></div>
  {data.finalists.length?<div className="bracket">{data.finalists.map((f,i)=><div className="duel" key={i}><div className="dueltop"><span>{f.origin}</span><b>Finalista {i+1}</b></div><div className="win">{f.team}<span>{f.status||'CLASIFICADO'}</span></div></div>)}</div>:<div className="emptyfinal"><Trophy/><strong>Aún no hay finalistas confirmados</strong><span>La web los mostrará cuando se vuelquen en la pestaña FINALISTAS del Google Sheet.</span></div>}
  <div className="finalslot"><span>MADRID · 24 OCT</span><Trophy size={30}/><strong>GRAN FINAL</strong><small>El tema más votado en la inscripción</small></div>
 </section>
}

function SectionTitle({eyebrow,title}){return <div className="sectiontitle"><span>{eyebrow}</span><h2>{title}</h2></div>}
function Stat({icon,n,label}){return <div className="stat"><span>{icon}</span><strong>{n}</strong><small>{label}</small></div>}
