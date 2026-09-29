"use client";
import {useState} from "react";
import {useAudio} from "./AudioProvider";
import Icon from "./Icon";
function formatTime(value:number){const total=Math.max(0,Math.floor(value||0));return Math.floor(total/60)+":"+String(total%60).padStart(2,"0");}
export default function AudioMiniPlayer(){
 const audio=useAudio(); const[expanded,setExpanded]=useState(false); const[queueOpen,setQueueOpen]=useState(false);
 if(!audio.track)return null; const{track,playing,position,duration}=audio; const pct=duration?Math.min(100,Math.max(0,position/duration*100)):0;
 const shift=(seconds:number)=>audio.seek(Math.min(Math.max(position+seconds,0),duration||position+seconds));
 const share=async()=>{const text=track.label+" — "+track.book+" "+track.number;if(navigator.share){try{await navigator.share({title:"Nur al-Hadith",text,url:location.href})}catch{}}else{try{await navigator.clipboard.writeText(location.href)}catch{}}};
 return <aside className={"audio-player-shell"+(expanded?" expanded":"")} aria-label="Audio player">
  {expanded&&<div className="audio-player-backdrop" onClick={()=>setExpanded(false)} aria-hidden="true"/>}
  <div className="audio-player">
   {expanded&&<div className="audio-sheet-handle" aria-hidden="true"/>}
   {expanded&&<div className="audio-sheet-header"><span>NOW PLAYING</span><button className="audio-icon-button" onClick={()=>setExpanded(false)} aria-label="Close player"><Icon name="chevronDown" size={20}/></button></div>}
   {expanded?<div className="audio-expanded-content">
    <div className="audio-large-artwork" aria-hidden="true"><span>ﷺ</span></div>
    <div className="audio-expanded-meta"><strong>{track.label}</strong><span>{track.book} · Hadith {track.number}</span></div>
    <div className="audio-full-progress"><input aria-label="Audio position" type="range" min="0" max={duration||1} step=".1" value={Math.min(position,duration||position)} onChange={e=>audio.seek(Number(e.target.value))}/><div><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div></div>
    <div className="audio-transport"><button className="audio-secondary-control" onClick={()=>shift(-15)} aria-label="Rewind 15 seconds"><Icon name="rewind" size={22}/><small>15</small></button><button className="audio-main-control" onClick={()=>audio.toggle().catch(()=>{})} aria-label={playing?"Pause":"Play"}><Icon name={playing?"pause":"play"} size={25}/></button><button className="audio-secondary-control" onClick={()=>shift(15)} aria-label="Forward 15 seconds"><Icon name="forward" size={22}/><small>15</small></button></div>
    <div className="audio-secondary-actions"><button onClick={()=>audio.setSpeed(audio.speed===1?1.25:1)}><Icon name="speed" size={18}/><span>{audio.speed}×</span></button><button onClick={()=>audio.setSleep(audio.sleepUntil?null:30)}><Icon name="timer" size={18}/><span>{audio.sleepUntil?"Sleep on":"Sleep timer"}</span></button><button onClick={share}><Icon name="share" size={18}/><span>Share</span></button><button onClick={()=>setQueueOpen(!queueOpen)}><Icon name="queue" size={18}/><span>Queue</span></button></div>
    {queueOpen&&<div className="audio-queue"><strong>Queue</strong><div><span>Current</span><b>{track.label}</b><small>{track.book} · {track.number}</small></div></div>}
   </div>:<div className="audio-mini-bar">
    <button className="audio-artwork" onClick={()=>setExpanded(true)} aria-label="Open full audio player"><span>ﷺ</span></button>
    <button className="audio-mini-main" onClick={()=>setExpanded(true)} aria-label="Expand audio player"><span className="audio-mini-copy"><strong>{track.label}</strong><small>{track.book} · Hadith {track.number}</small></span><span className="audio-mini-progress"><i style={{width:pct+"%"}}/></span></button>
    <button className="audio-mini-play" onClick={()=>audio.toggle().catch(()=>{})} aria-label={playing?"Pause":"Play"}><Icon name={playing?"pause":"play"} size={18}/></button>
    <button className="audio-mini-skip" onClick={()=>shift(15)} aria-label="Skip forward 15 seconds"><Icon name="skipForward" size={18}/></button>
   </div>}
  </div>
 </aside>;
}