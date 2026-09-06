import React, {useMemo, useState} from 'react'
import { Trophy, Map, CalendarDays, Users, Mic2, ChevronRight, Search, Menu, X, Crown } from 'lucide-react'
import data from './demo'

const nav = [
  ['Inicio','inicio'],['Clasificación','clasificacion'],['Regiones','regiones'],
  ['Jornadas','jornadas'],['Equipos','equipos'],['Speakers','speakers']
]

function App(){
  const [page,setPage]=useState('inicio')
  const [region,setRegion]=useState('Todas')
  const [mobile,setMobile]=useState(false)

  const ranking = useMemo(() => [...data.teams]
    .filter(t => region==='Todas' || t.region===region)
    .sort((a,b)=> b.points-a.points || b.speakerPoints-a.speakerPoints), [region])

  return <div className="app">
    <header className="topbar">
      <div className="brand" onClick={()=>setPage('inicio')}>
        <div className="brandmark">BP</div>
        <div><strong>LIGA BP</strong><span>ESPAÑA · 2026/27</span></div>
      </div>
      <nav className="desktopnav">
        {nav.map(([label,key])=><button key={key} className={page===key?'active':''} onClick={()=>setPage(key)}>{label}</button>)}
      </nav>
      <button className="mobilebtn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </header>
    {mobile && <div className="mobilenav">{nav.map(([label,key])=><button key={key} onClick={()=>{setPage(key);setMobile(false)}}>{label}</button>)}</div>}
    <main>
      {page==='inicio' && <Home go={setPage}/>}
      {page==='clasificacion' && <Ranking ranking={ranking} region={region} setRegion={setRegion}/>}
      {page==='regiones' && <Regions go={setPage} setRegion={setRegion}/>}
      {page==='jornadas' && <Rounds/>}
      {page==='equipos' && <Teams/>}
      {page==='speakers' && <Speakers/>}
    </main>
    <footer><strong>LIGA BP ESPAÑA</strong><span>Demo · Datos ficticios</span></footer>
  </div>
}

function Home({go}){
 const top=[...data.teams].sort((a,b)=>b.points-a.points).slice(0,5)
 return <>
  <section className="hero">
    <div className="eyebrow">TEMPORADA 2026/27</div>
    <h1>El debate<br/><em>se juega.</em></h1>
    <p>Clasificación, jornadas, equipos y speakers de la liga nacional de debate British Parliamentary.</p>
    <div className="heroactions">
      <button className="primary" onClick={()=>go('clasificacion')}>Ver clasificación <ChevronRight size={18}/></button>
      <button className="ghost" onClick={()=>go('jornadas')}>Últimos debates</button>
    </div>
  </section>

  <section className="stats">
    <Stat n="40" label="Equipos"/>
    <Stat n="10" label="Regiones"/>
    <Stat n="6" label="Jornadas"/>
    <Stat n="160" label="Debates"/>
  </section>

  <section className="grid2 section">
    <div>
      <SectionTitle kicker="RANKING" title="Los que mandan"/>
      <div className="rankingcard">
        {top.map((t,i)=><div className="rankrow" key={t.id}>
          <span className="ranknum">{i+1}</span>
          <div className="teamdot">{t.name.slice(0,2).toUpperCase()}</div>
          <div className="teamname"><strong>{t.name}</strong><span>{t.region}</span></div>
          <div className="points"><strong>{t.points}</strong><span>pts</span></div>
        </div>)}
        <button className="textlink" onClick={()=>go('clasificacion')}>Clasificación completa <ChevronRight size={16}/></button>
      </div>
    </div>

    <div>
      <SectionTitle kicker="ÚLTIMA JORNADA" title="Debates recientes"/>
      <div className="matchstack">
        {data.matches.slice(0,2).map(m=><MatchCard m={m} key={m.id}/>)}
      </div>
    </div>
  </section>

  <section className="darksection">
    <div>
      <div className="eyebrow light">FASE NACIONAL</div>
      <h2>De las regiones<br/>a la gran final.</h2>
    </div>
    <div className="path">
      <Path n="01" a="Ligas regionales" b="10 regiones"/>
      <Path n="02" a="Fase nacional" b="20 clasificados"/>
      <Path n="03" a="Semifinales" b="8 equipos"/>
      <Path n="04" a="Gran final" b="4 equipos"/>
    </div>
  </section>
 </>
}

function Ranking({ranking,region,setRegion}){
 return <section className="section page">
   <SectionTitle kicker="TEMPORADA 2026/27" title="Clasificación"/>
   <div className="filterbar">
     <select value={region} onChange={e=>setRegion(e.target.value)}>
       <option>Todas</option>
       {[...new Set(data.teams.map(t=>t.region))].map(r=><option key={r}>{r}</option>)}
     </select>
     <span>{ranking.length} equipos</span>
   </div>
   <div className="tablewrap">
    <table>
      <thead><tr><th>#</th><th>Equipo</th><th>Región</th><th>J</th><th>Pts</th><th>SP</th></tr></thead>
      <tbody>{ranking.map((t,i)=><tr key={t.id}>
        <td className="pos">{i+1}</td>
        <td><strong>{t.name}</strong></td><td>{t.region}</td><td>{t.rounds}</td>
        <td className="bigpts">{t.points}</td><td>{t.speakerPoints.toFixed(1)}</td>
      </tr>)}</tbody>
    </table>
   </div>
 </section>
}

function Regions({go,setRegion}){
 const grouped=[...new Set(data.teams.map(t=>t.region))]
 return <section className="section page">
  <SectionTitle kicker="TERRITORIO" title="Regiones"/>
  <div className="regiongrid">{grouped.map((r,i)=>{
    const list=data.teams.filter(t=>t.region===r).sort((a,b)=>b.points-a.points)
    return <button className="regioncard" key={r} onClick={()=>{setRegion(r);go('clasificacion')}}>
      <span className="regionindex">{String(i+1).padStart(2,'0')}</span>
      <h3>{r}</h3>
      <p>{list.length} equipos</p>
      <div className="leader"><Crown size={16}/><span>{list[0].name}</span><strong>{list[0].points} pts</strong></div>
    </button>
  })}</div>
 </section>
}

function Rounds(){
 return <section className="section page">
  <SectionTitle kicker="CALENDARIO" title="Jornadas"/>
  <div className="timeline">
    <div className="timelinehead"><strong>Jornada 6</strong><span>12 octubre 2026</span></div>
    {data.matches.map(m=><MatchCard m={m} key={m.id} expanded/>)}
  </div>
 </section>
}

function Teams(){
 const [q,setQ]=useState('')
 const list=data.teams.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())||t.region.toLowerCase().includes(q.toLowerCase()))
 return <section className="section page">
  <SectionTitle kicker="CLUBES" title="Equipos"/>
  <div className="searchbox"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar equipo o región"/></div>
  <div className="teamgrid">{list.map(t=><div className="teamcard" key={t.id}>
    <div className="teamlogo">{t.name.slice(0,2).toUpperCase()}</div>
    <h3>{t.name}</h3><p>{t.region}</p>
    <div className="teamstats"><span><b>{t.points}</b> pts</span><span><b>{t.speakerPoints.toFixed(1)}</b> SP</span></div>
  </div>)}</div>
 </section>
}

function Speakers(){
 return <section className="section page">
  <SectionTitle kicker="INDIVIDUAL" title="Speaker ranking"/>
  <div className="rankingcard wide">
   {data.speakers.map((s,i)=><div className="rankrow" key={s.name}>
    <span className="ranknum">{i+1}</span>
    <div className="speakericon"><Mic2 size={18}/></div>
    <div className="teamname"><strong>{s.name}</strong><span>{s.team}</span></div>
    <div className="points"><strong>{s.avg.toFixed(1)}</strong><span>media</span></div>
   </div>)}
  </div>
 </section>
}

function MatchCard({m,expanded=false}){
 return <div className={"matchcard "+(expanded?'expanded':'')}>
   <div className="matchtop"><span>{m.region}</span><span>{m.round} · {m.date}</span></div>
   {expanded && <div className="motion"><span>MOCIÓN</span>{m.motion}</div>}
   <div className="matchteams">{m.teams.map(t=><div className="matchteam" key={t.pos}>
    <span className="role">{t.pos}</span><strong>{t.name}</strong><span className={"place p"+t.place}>{t.place}º</span>
   </div>)}</div>
 </div>
}
function Stat({n,label}){return <div><strong>{n}</strong><span>{label}</span></div>}
function SectionTitle({kicker,title}){return <div className="sectiontitle"><span>{kicker}</span><h2>{title}</h2></div>}
function Path({n,a,b}){return <div className="pathitem"><span>{n}</span><div><strong>{a}</strong><small>{b}</small></div></div>}

export default App
