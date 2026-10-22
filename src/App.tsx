import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { profile, projects, type Project } from './data/portfolio'

function Arrow({direction='right'}:{direction?:'left'|'right'}){
  return <svg className={direction==='left'?'arrow-left':''} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
}

function Scribble({kind}:{kind:'flower'|'sun'|'leaf'}){
  if(kind==='flower') return <svg className="scribble" viewBox="0 0 90 90" aria-hidden="true"><path d="M45 45C9 50 16 20 42 39 30 8 63 11 50 40 78 17 88 51 55 47 82 68 51 84 47 53 35 84 7 65 40 49Z"/><circle cx="47" cy="46" r="7"/></svg>
  if(kind==='sun') return <svg className="scribble" viewBox="0 0 90 90" aria-hidden="true"><circle cx="45" cy="45" r="18"/><path d="M45 6v18M45 66v18M6 45h18M66 45h18M17 17l13 13M60 60l13 13M73 17 60 30M30 60 17 73"/></svg>
  return <svg className="scribble" viewBox="0 0 90 90" aria-hidden="true"><path d="M16 75C41 61 56 39 70 12M27 62C14 56 13 42 17 32c13 3 20 11 17 23M47 43c1-16 12-25 27-25 0 16-10 25-25 27"/></svg>
}

function ProjectPage({project}:{project:Project}){
  return <article className={`book-page accent-${project.accent}`}>
    <div className="book-copy">
      <p className="project-index">PROJECT {project.number} · {project.subtitle}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="project-actions">
        {project.liveUrl
          ? <a className="button solid" href={project.liveUrl} target="_blank" rel="noreferrer">打开作品 <Arrow/></a>
          : <span className="button pending">○ 正在部署</span>}
        {project.repoUrl&&<a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">GitHub 源码 <Arrow/></a>}
      </div>
      <span className="margin-note">made with<br/>patience & tea ♡</span>
    </div>
    <figure className="book-visual">
      <span className="photo-tape"></span>
      <img src={project.image} alt={`${project.title}项目界面`}/>
      <figcaption>{project.number} / A SMALL IDEA MADE REAL</figcaption>
    </figure>
  </article>
}

function ProjectBook(){
  const [active,setActive]=useState(0)
  const [motion,setMotion]=useState<'next'|'prev'>('next')
  const turn=(target:number)=>{
    if(target===active) return
    setMotion(target>active?'next':'prev')
    setActive(target)
  }
  const next=()=>turn((active+1)%projects.length)
  const previous=()=>turn((active-1+projects.length)%projects.length)
  return <div className="book-shell reveal">
    <div className="book-rings" aria-hidden="true">{Array.from({length:9}).map((_,i)=><i key={i}></i>)}</div>
    <div className={`project-book turn-${motion}`}>
      <ProjectPage project={projects[active]} key={`${motion}-${projects[active].title}`}/>
      <span className="page-corner" aria-hidden="true"></span>
    </div>
    <div className="book-controls">
      <button onClick={previous} aria-label="上一个作品"><Arrow direction="left"/> 上一页</button>
      <div className="page-dots" aria-label="选择作品">{projects.map((project,index)=><button key={project.title} className={index===active?'active':''} onClick={()=>turn(index)} aria-label={`查看${project.title}`}><span>{project.number}</span></button>)}</div>
      <button onClick={next} aria-label="下一个作品">下一页 <Arrow/></button>
    </div>
  </div>
}

const chapters=[['top','00'],['about','01'],['works','02'],['process','03'],['contact','04']]

export default function App(){
  const heroRef=useRef<HTMLElement>(null)
  const [menuOpen,setMenuOpen]=useState(false)
  const [introDone,setIntroDone]=useState(false)
  const [chapter,setChapter]=useState('top')

  useEffect(()=>{
    const timer=window.setTimeout(()=>setIntroDone(true),1250)
    const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.13})
    document.querySelectorAll('.reveal').forEach(item=>reveals.observe(item))
    const sections=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&setChapter(entry.target.id)),{rootMargin:'-35% 0px -55%',threshold:0})
    chapters.forEach(([id])=>{const node=document.getElementById(id);if(node)sections.observe(node)})
    const onScroll=()=>heroRef.current?.style.setProperty('--drift',`${Math.min(window.scrollY*.09,55)}px`)
    window.addEventListener('scroll',onScroll,{passive:true})
    return()=>{window.clearTimeout(timer);reveals.disconnect();sections.disconnect();window.removeEventListener('scroll',onScroll)}
  },[])

  const moveHero=(event:PointerEvent<HTMLElement>)=>{
    const rect=event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx',`${((event.clientX-rect.left)/rect.width-.5)*15}px`)
    event.currentTarget.style.setProperty('--my',`${((event.clientY-rect.top)/rect.height-.5)*12}px`)
  }

  return <main>
    <div className={introDone?'paper-intro done':'paper-intro'} aria-hidden="true"><span></span><span></span><div><small>cen's field notes</small><b>翻开一页，慢慢走走。</b></div></div>

    <header className="nav-wrap">
      <nav><a className="logo" href="#top"><span>C</span><b>cen's field notes</b></a><button className="menu" aria-label="打开导航" onClick={()=>setMenuOpen(v=>!v)}>☰</button><div className={menuOpen?'nav-links open':'nav-links'}><a href="#about" onClick={()=>setMenuOpen(false)}>关于</a><a href="#works" onClick={()=>setMenuOpen(false)}>作品</a><a href="#process" onClick={()=>setMenuOpen(false)}>过程</a><a href="#contact" onClick={()=>setMenuOpen(false)}>联系</a></div></nav>
    </header>

    <aside className="chapter-rail" aria-label="页面章节">{chapters.map(([id,number])=><a key={id} className={chapter===id?'active':''} href={`#${id}`}><span>{number}</span><i></i></a>)}</aside>

    <section className="hero" id="top" ref={heroRef} onPointerMove={moveHero}>
      <div className="hero-photo reveal visible"><img src="./assets/hero-landscape.png" alt="草原、远山与云朵"/><span className="photo-label">somewhere soft & green · 2026</span><i className="tape tape-a"></i><i className="tape tape-b"></i></div>
      <div className="hero-paper">
        <div className="hero-copy reveal visible"><p className="kicker">HELLO, I AM {profile.name.toUpperCase()}.</p><h1>把灵感写进<br/><em>风经过的地方。</em></h1><p>{profile.intro}</p><div className="hero-actions"><a className="button solid" href="#works">翻看作品集 <Arrow/></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow/></a></div></div>
        <div className="hero-doodle"><Scribble kind="flower"/><span>keep growing<br/>at my own pace</span></div>
        <div className="paper-note note-one">currently<br/><strong>learning & building</strong></div>
        <div className="paper-note note-two">山有回声<br/>代码也有。</div>
        <div className="scroll-hint"><span></span>SCROLL TO WANDER</div>
      </div>
    </section>

    <section className="about paper-section" id="about">
      <div className="section-label reveal"><span>01</span><p>ABOUT / 关于我</p></div>
      <div className="about-spread">
        <div className="about-title reveal"><p className="hand-kicker">a little note about me</p><h2>在学习中，慢慢长出<br/><em>自己的方向。</em></h2><span className="hand-note">collect moments<br/>build with care ♡</span></div>
        <figure className="about-illustration reveal"><span className="sun-stamp">✦</span><img src="./illustrations/about-fieldbook.png" alt="从手账中生长出的远山与植物拼贴插画"/><figcaption>FIELD NOTE / 轻轻记录，也认真生长</figcaption></figure>
        <div className="about-copy reveal"><Scribble kind="leaf"/><p>你好，我是 {profile.name}。我关注页面是否清晰、交互是否自然，也喜欢从纸张、植物、天气和生活的微小片段里寻找视觉灵感。</p><p>目前我使用 React、TypeScript 和现代 CSS 完成个人工具，也在练习数据存储、API 调用和网页部署。</p><div className="skill-line"><span>React</span><span>TypeScript</span><span>Vite</span><span>CSS</span><span>Web API</span></div></div>
      </div>
      <div className="quote reveal"><span>“</span><p>Wide is the hush.<br/>We build softly.</p><small>— FIELD NOTE 001</small></div>
    </section>

    <section className="works" id="works">
      <div className="section-label reveal"><span>02</span><p>SELECTED WORKS / 近期作品</p></div>
      <div className="works-heading reveal"><div><p className="hand-kicker">four tiny things I made</p><h2>一些已经落地的<br/><em>小小想法。</em></h2></div><div className="works-note"><div className="mini-landscape"><i></i><i></i><i></i><b></b></div><p>像翻手账一样，点击“下一页”看看每个项目。每一页都是一次从不会到会一点的练习。</p></div></div>
      <ProjectBook/>
    </section>

    <section className="process paper-section" id="process">
      <div className="section-label reveal"><span>03</span><p>HOW I WORK / 我的方式</p></div>
      <div className="process-landscape reveal"><img src="./illustrations/process-trail.png" alt="从种子、山路到灯火的成长旅程拼贴插画"/><span>from a small idea<br/>to a warm light.</span><Scribble kind="sun"/></div>
      <div className="process-grid">
        <article className="reveal"><span>Ⅰ</span><p className="tiny-note">listen first</p><h3>先理解</h3><p>把真正要解决的问题写清楚，再决定页面与功能。</p></article>
        <article className="reveal"><span>Ⅱ</span><p className="tiny-note">make it real</p><h3>再搭建</h3><p>从核心流程开始，让每一步操作都有明确反馈。</p></article>
        <article className="reveal"><span>Ⅲ</span><p className="tiny-note">soften edges</p><h3>最后打磨</h3><p>检查移动端、空状态、错误提示与那些容易忽略的细节。</p></article>
      </div>
    </section>

    <section className="contact" id="contact">
      <div className="contact-art"><span className="moon"></span><img src="./illustrations/contact-valley.png" alt="傍晚山谷与微光拼贴插画"/><i className="firefly f1"></i><i className="firefly f2"></i><i className="firefly f3"></i><p>follow the little lights.</p></div>
      <div className="contact-copy reveal"><p className="kicker">LET'S MAKE SOMETHING GENTLE.</p><h2>下一段路，<br/><em>一起走走？</em></h2><p>如果你也对网页、设计或这些小工具感兴趣，欢迎来 GitHub 看看。</p><a className="button paper-button" href={profile.github} target="_blank" rel="noreferrer">访问我的 GitHub <Arrow/></a><span className="sign-off">see you somewhere<br/>under the clouds ♡</span></div>
    </section>

    <footer><a className="logo" href="#top"><span>C</span><b>cen's field notes</b></a><p>Designed & built with patience · 2026</p><a href="#top">回到顶部 ↑</a></footer>
  </main>
}
