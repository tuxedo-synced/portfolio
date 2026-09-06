import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight, Github, Instagram, Mail, ExternalLink, Menu, X} from 'lucide-react';
import profile from './data/profile.json';
import projects from './data/projects.json';
import skills from './data/skills.json';
import experience from './data/experience.json';
import education from './data/education.json';
import certifications from './data/certifications.json';
import achievements from './data/achievements.json';
import socials from './data/socials.json';
import './styles.css';

function Project({project,index}) {
  const [open,setOpen]=useState(false);
  const content=<div className="project-content">
    <p className="eyebrow">0{index+1} / PROJECT</p>
    <h3>{project.title}</h3>
    {project.intro && <p className="intro">{project.intro}</p>}
    <div className="tags">{project.technologies?.map(t=><span key={t}>{t}</span>)}</div>
    <div className="links">
      {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>}
      {project.live && <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={17}/> Live Demo</a>}
    </div>
  </div>;
  return <article className={'project '+(index%2?'reverse':'')}>
    <button className={'project-image '+(open?'open':'')} onClick={()=>setOpen(!open)} aria-label="Show project description">
      <img src={project.image} alt={project.title}/>
      <div className="project-overlay"><p>{project.description}</p><span>{open?'Tap to close':'Hover / tap for details'}</span></div>
    </button>
    {content}
  </article>
}

function App(){
 const [menu,setMenu]=useState(false);
 const grouped=skills.reduce((a,s)=>{(a[s.category]??=[]).push(s);return a},{});
 return <div>
  <header><a className="brand" href="#top">SR<span>.</span></a>
   <button className="menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
   <nav className={menu?'show':''}>{['about','projects','skills','journey','contact'].map(x=><a key={x} href={'#'+x} onClick={()=>setMenu(false)}>{x}</a>)}</nav>
  </header>
  <main id="top">
   <section className="hero">
    <div className="hero-copy"><p className="eyebrow">SADARAM RAHUL · PORTFOLIO</p><h1>{profile.name}<br/><em>BACKEND</em><br/>DEVELOPER<span>.</span></h1>
      <p className="hero-text">{profile.intro}</p>
      <div className="actions"><a className="primary" href="#projects">View projects <ArrowUpRight size={18}/></a><a className="secondary" href="#contact">Contact me</a></div>
    </div>
    <div className="portrait-wrap"><div className="portrait-frame"><div className="portrait-placeholder">SR</div></div><span className="portrait-note">BUILDING FROM<br/>THE LOGIC UP</span></div>
   </section>
   <section id="about" className="about section"><div className="section-label">01 — ABOUT</div><div><h2>Quietly building the<br/><span>systems behind</span> the screen.</h2><p>{profile.about}</p></div></section>
   <section id="projects" className="section projects-section"><div className="section-label">02 — SELECTED WORK</div><div>{projects.map((p,i)=><Project key={p.title} project={p} index={i}/>)}</div></section>
   <section id="skills" className="section skills-section"><div className="section-label">03 — TOOLKIT</div><div className="skill-grid">{Object.entries(grouped).map(([cat,items])=><div className="skill-group" key={cat}><h3>{cat}</h3>{items.map(s=><div className="skill" key={s.name}><span>{s.name}</span><small>{s.level||''}</small></div>)}</div>)}</div></section>
   {(experience.length||education.length||certifications.length||achievements.length)>0 && <section id="journey" className="section"><div className="section-label">04 — JOURNEY</div><div className="timeline">{[...experience.map(x=>({...x,type:'Experience'})),...education.map(x=>({...x,type:'Education'})),...certifications.map(x=>({...x,type:'Certification'})),...achievements.map(x=>({...x,type:'Achievement'}))].map((x,i)=><div className="timeline-item" key={i}><span>{x.type}</span><h3>{x.title||x.name}</h3><p>{x.company||x.institution||x.description||''}</p><small>{x.startDate||x.date||''} {x.endDate?'— '+x.endDate:''}</small></div>)}</div></section>}
   <section id="contact" className="contact section"><div className="section-label">05 — CONTACT</div><div><h2>Have an idea?<br/><span>Let's talk.</span></h2><p>For projects, collaborations, or just a good technical conversation.</p><div className="socials">
    {socials.instagram&&<a href={socials.instagram} target="_blank" rel="noreferrer"><Instagram/> Instagram</a>}
    {socials.github&&<a href={socials.github} target="_blank" rel="noreferrer"><Github/> GitHub</a>}
    {socials.email&&<a href={'mailto:'+socials.email}><Mail/> {socials.email}</a>}
   </div></div></section>
  </main>
  <footer><span>SADARAM RAHUL</span><span>BACKEND DEVELOPER · {new Date().getFullYear()}</span></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);