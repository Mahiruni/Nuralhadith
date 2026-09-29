"use client";
import {useState} from "react";
import {useAudio} from "./AudioProvider";

function formatTime(value:number){
  const total=Math.max(0,Math.floor(value||0));
  return Math.floor(total/60)+":"+String(total%60).padStart(2,"0");
}

const speedOptions=[0.75,1,1.25,1.5];
const sleepOptions:[number|null,string][]=[[null,"Off"],[15,"15 min"],[30,"30 min"],[45,"45 min"],[60,"60 min"]];

export default function AudioMiniPlayer(){
  const audio=useAudio();
  const [expanded,setExpanded]=useState(false);
  const [speedOpen,setSpeedOpen]=useState(false);
  const [sleepOpen,setSleepOpen]=useState(false);
  const [downloadState,setDownloadState]=useState<"idle"|"loading"|"done"|"error">("idle");
  if(!audio.track)return null;

  const {track,playing,position,duration}=audio;
  const hasRecording=Boolean(track.url);
  const pct=duration?Math.min(100,Math.max(0,position/duration*100)):0;
  const statusUnavailable=!hasRecording;
  const sleepLabel=audio.sleepUntil?(Math.max(1,Math.ceil((audio.sleepUntil-Date.now())/60000))+" min"):"Off";

  const close=()=>{setExpanded(false);setSpeedOpen(false);setSleepOpen(false)};
  const selectSpeed=(value:number)=>{audio.setSpeed(value);setSpeedOpen(false)};
  const selectSleep=(value:number|null)=>{audio.setSleep(value);setSleepOpen(false)};
  const download=async()=>{
    setDownloadState("loading");
    try{await audio.downloadCurrent();setDownloadState("done");setTimeout(()=>setDownloadState("idle"),1800)}
    catch{setDownloadState("error");setTimeout(()=>setDownloadState("idle"),2200)}
  };

  return <aside className={"audio-player-shell"+(expanded?" expanded":"")} aria-label="In-app audio player">
    {expanded&&<div className="audio-player-backdrop" onClick={close} aria-hidden="true"/>}
    <section className="audio-player" aria-label="Listen to hadith audio">
      {expanded&&<div className="audio-sheet-handle" aria-hidden="true"/>}
      {expanded&&<div className="audio-sheet-header">
        <div className="audio-listen-heading"><strong>Listen · 148</strong><span>In-app audio</span></div>
        <button className="audio-icon-button" onClick={close} aria-label="Close audio player">×</button>
      </div>}

      {expanded?<div className="audio-expanded-content">
        <div className="audio-status-panel">
          <div className="audio-status-row">
            <div>
              <strong>Listen · 148</strong>
              <p className={statusUnavailable?"audio-status-unavailable":"audio-status-available"}>{statusUnavailable?"Arabic recording not available":"Arabic recording available"}</p>
            </div>
            <label className="audio-language-select">
              <span className="sr-only">Audio language</span>
              <select defaultValue="Arabic" aria-label="Audio language">
                <option>Arabic</option>
              </select>
              <span aria-hidden="true">⌄</span>
            </label>
          </div>
          <div className="audio-status-lines" aria-live="polite">
            <span>Translation unavailable</span>
            <span>Arabic + translation unavailable</span>
          </div>
        </div>

        <div className="audio-track-heading">
          <strong>{track.label}</strong>
          <span>{track.book} · Hadith {track.number}</span>
        </div>

        <div className="audio-progress-block">
          <input aria-label="Audio position" type="range" min="0" max={duration||1} step=".1" value={Math.min(position,duration||position)} onChange={e=>audio.seek(Number(e.target.value))} disabled={!hasRecording}/>
          <div><span>{formatTime(position)}</span><span>{formatTime(duration)}</span></div>
        </div>

        <div className="audio-main-controls" aria-label="Playback controls">
          <button onClick={()=>audio.previous().catch(()=>{})} aria-label="Previous track">← <span>Previous</span></button>
          <button className="audio-play-primary" onClick={()=>audio.toggle().catch(()=>{})} aria-label={playing?"Pause":"Play"} disabled={!hasRecording}>
            <span aria-hidden="true">{playing?"Ⅱ":"▶"}</span><span>{playing?"Pause":"Play"}</span>
          </button>
          <button onClick={()=>audio.next().catch(()=>{})} aria-label="Next track"><span>Next</span> →</button>
        </div>

        <div className="audio-secondary-controls">
          <div className="audio-control-wrap">
            <button onClick={()=>{setSpeedOpen(v=>!v);setSleepOpen(false)}} aria-expanded={speedOpen} aria-haspopup="dialog">Speed <b>{audio.speed}×</b></button>
            {speedOpen&&<div className="audio-popover" role="dialog" aria-label="Playback speed">
              {speedOptions.map(value=><button key={value} className={audio.speed===value?"selected":""} onClick={()=>selectSpeed(value)}>{value}×</button>)}
            </div>}
          </div>
          <div className="audio-control-wrap">
            <button onClick={()=>{setSleepOpen(v=>!v);setSpeedOpen(false)}} aria-expanded={sleepOpen} aria-haspopup="dialog">Sleep <b>{sleepLabel}</b></button>
            {sleepOpen&&<div className="audio-popover" role="dialog" aria-label="Sleep timer">
              {sleepOptions.map(([value,label])=><button key={label} className={!value&&!audio.sleepUntil||value&&audio.sleepUntil?"selected":""} onClick={()=>selectSleep(value)}>{label}</button>)}
            </div>}
          </div>
          <button onClick={download} disabled={!hasRecording||downloadState==="loading"} aria-label="Download audio">
            <span>{downloadState==="loading"?"Downloading…":downloadState==="done"?"Downloaded":downloadState==="error"?"Download failed":"Download audio"}</span>
          </button>
          <button onClick={close} aria-label="Close audio player">Close</button>
        </div>

        <p className="audio-only-note">Only explicitly supplied recordings are presented</p>
      </div>:<button className="audio-mini-bar" onClick={()=>setExpanded(true)} aria-label="Open audio player">
        <span className="audio-mini-artwork" aria-hidden="true">ﷺ</span>
        <span className="audio-mini-copy"><strong>{track.label}</strong><small>{track.book} · Hadith {track.number}</small></span>
        <span className="audio-mini-state">{playing?"Playing":"Paused"}</span>
        <span className="audio-mini-progress" aria-hidden="true"><i style={{width:pct+"%"}}/></span>
      </button>}
    </section>
  </aside>;
}