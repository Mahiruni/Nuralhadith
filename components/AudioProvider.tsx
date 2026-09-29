"use client";
import {createContext,useCallback,useContext,useEffect,useMemo,useRef,useState} from "react";
import type {AudioMode} from "../lib/audio";
import {readOfflineAudio} from "../lib/offlineDb";

type Track={id:string;book:string;number:string;language:"ar"|"en"|"am"|"ti"|"om";label:string;url:string};
type Ctx={
 track:Track|null;queue:Track[];mode:AudioMode;playing:boolean;position:number;duration:number;speed:number;sleepUntil:number|null;
 playTrack:(track:Track,mode?:AudioMode)=>Promise<void>;toggle:()=>Promise<void>;seek:(value:number)=>void;setSpeed:(value:number)=>void;setSleep:(minutes:number|null)=>void;downloadCurrent:()=>Promise<void>;
 next:()=>Promise<void>;previous:()=>Promise<void>;stop:()=>void;
};
const AudioContext=createContext<Ctx|null>(null);
const KEY="nur-audio-state";

export function AudioProvider({children}:{children:React.ReactNode}){
 const ref=useRef<HTMLAudioElement|null>(null);
 const objectUrlRef=useRef<string|null>(null);
 const[track,setTrack]=useState<Track|null>(null);
 const[queue,setQueue]=useState<Track[]>([]);
 const[mode,setMode]=useState<AudioMode>("arabic");
 const[playing,setPlaying]=useState(false);
 const[position,setPosition]=useState(0);
 const[duration,setDuration]=useState(0);
 const[speed,setSpeedState]=useState(1);
 const[sleepUntil,setSleepUntil]=useState<number|null>(null);
 const sleepUntilRef=useRef<number|null>(null);

 useEffect(()=>{
   const a=new Audio();
   a.preload="metadata";
   a.setAttribute("playsinline","");
   ref.current=a;
   const tick=()=>{setPosition(a.currentTime);const deadline=sleepUntilRef.current;if(deadline&&Date.now()>=deadline){a.pause();setPlaying(false);sleepUntilRef.current=null;setSleepUntil(null)}};
   const meta=()=>setDuration(Number.isFinite(a.duration)?a.duration:0);
   const onPlay=()=>setPlaying(true);
   const onPause=()=>setPlaying(false);
   const onEnded=()=>{setPlaying(false);};
   a.addEventListener("timeupdate",tick);a.addEventListener("loadedmetadata",meta);a.addEventListener("play",onPlay);a.addEventListener("pause",onPause);a.addEventListener("ended",onEnded);
   try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s?.speed)setSpeedState(s.speed)}catch{}
   return()=>{a.pause();a.removeEventListener("timeupdate",tick);a.removeEventListener("loadedmetadata",meta);a.removeEventListener("play",onPlay);a.removeEventListener("pause",onPause);a.removeEventListener("ended",onEnded);if(objectUrlRef.current)URL.revokeObjectURL(objectUrlRef.current);a.src=""};
 },[sleepUntil]);

 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify({track,mode,position,speed,queue}))}catch{}},[track,mode,position,speed,queue]);

 useEffect(()=>{
   const a=ref.current;if(!a||!track||typeof navigator==="undefined")return;
   if("mediaSession" in navigator){
     navigator.mediaSession.metadata=new MediaMetadata({title:track.label,artist:track.book,album:"Nur al-Hadith"});
     navigator.mediaSession.setActionHandler("play",()=>{void a.play()});
     navigator.mediaSession.setActionHandler("pause",()=>a.pause());
     navigator.mediaSession.setActionHandler("seekbackward",()=>{a.currentTime=Math.max(0,a.currentTime-15)});
     navigator.mediaSession.setActionHandler("seekforward",()=>{a.currentTime=Math.min(a.duration||Infinity,a.currentTime+15)});
   }
 },[track]);

 const haptic=()=>{try{if("vibrate" in navigator)navigator.vibrate(8)}catch{}};

 const playTrack=useCallback(async(t:Track,m:AudioMode=mode)=>{
   const a=ref.current;if(!a)throw new Error("Audio unavailable");
   haptic();
   if(track?.id!==t.id){
     a.pause();
     if(objectUrlRef.current){URL.revokeObjectURL(objectUrlRef.current);objectUrlRef.current=null}
     const offline=await readOfflineAudio(t.id).catch(()=>null);
     if(offline){objectUrlRef.current=URL.createObjectURL(offline);a.src=objectUrlRef.current}else{a.src=t.url}
     a.currentTime=0;setPosition(0);setDuration(0);setTrack(t);setMode(m);
     setQueue(prev=>prev.some(x=>x.id===t.id)?prev:[...prev,t]);
   }
   a.playbackRate=speed;
   await a.play();
 },[mode,speed,track]);

 const toggle=useCallback(async()=>{
   const a=ref.current;if(!a)throw new Error("Audio unavailable");
   haptic();if(a.paused)await a.play();else a.pause();
 },[]);

 const seek=useCallback((v:number)=>{const a=ref.current;if(a){a.currentTime=Math.max(0,v);setPosition(Math.max(0,v))}},[]);
 const setSpeed=useCallback((v:number)=>{const n=Math.max(.75,Math.min(1.5,v));setSpeedState(n);if(ref.current)ref.current.playbackRate=n},[]);
 const setSleep=useCallback((minutes:number|null)=>{const deadline=minutes?Date.now()+minutes*60000:null;sleepUntilRef.current=deadline;setSleepUntil(deadline)},[]);
 const downloadCurrent=useCallback(async()=>{
   const t=track;if(!t)throw new Error("No audio selected");
   const offline=await readOfflineAudio(t.id).catch(()=>null);
   const blob=offline||await fetch(t.url).then(r=>{if(!r.ok)throw new Error("Download unavailable");return r.blob()});
   const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=t.book+"-"+t.number+"-"+t.language+".mp3";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 },[track]);
 const next=useCallback(async()=>{
   if(!track)return;
   const i=queue.findIndex(x=>x.id===track.id);
   const candidate=i>=0?queue[i+1]:undefined;
   if(candidate)await playTrack(candidate,mode);else{ref.current?.pause();setPlaying(false)}
 },[track,queue,mode,playTrack]);
 const previous=useCallback(async()=>{
   if(!track)return;
   const a=ref.current;
   if(a&&a.currentTime>3){a.currentTime=0;setPosition(0);return}
   const i=queue.findIndex(x=>x.id===track.id);
   const candidate=i>0?queue[i-1]:undefined;
   if(candidate)await playTrack(candidate,mode);
   else{if(a){a.currentTime=0;setPosition(0)}}
 },[track,queue,mode,playTrack]);
 const stop=useCallback(()=>{if(objectUrlRef.current){URL.revokeObjectURL(objectUrlRef.current);objectUrlRef.current=null}ref.current?.pause();setTrack(null);setPosition(0);setDuration(0)},[]);

 useEffect(()=>{const a=ref.current;if(!a)return;const onEnded=async()=>{const i=track?queue.findIndex(x=>x.id===track.id):-1;const candidate=i>=0?queue[i+1]:undefined;if(candidate)await playTrack(candidate,mode);};a.addEventListener("ended",onEnded);return()=>a.removeEventListener("ended",onEnded)},[track,queue,mode,playTrack]);

 const value=useMemo(()=>({track,queue,mode,playing,position,duration,speed,sleepUntil,playTrack,toggle,seek,setSpeed,setSleep,downloadCurrent,next,previous,stop}),[track,queue,mode,playing,position,duration,speed,sleepUntil,playTrack,toggle,seek,setSpeed,setSleep,downloadCurrent,next,previous,stop]);
 return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
export function useAudio(){const c=useContext(AudioContext);if(!c)throw new Error("useAudio must be used inside AudioProvider");return c}