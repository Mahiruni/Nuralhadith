"use client";
import {createContext,useCallback,useContext,useEffect,useMemo,useRef,useState} from "react";
import type {AudioMode} from "../lib/audio";
import {readOfflineAudio} from "../lib/offlineDb";
type Track={id:string;book:string;number:string;language:"ar"|"en"|"am"|"ti"|"om";label:string;url:string};
type Ctx={track:Track|null;mode:AudioMode;playing:boolean;position:number;duration:number;speed:number;sleepUntil:number|null;playTrack:(track:Track,mode?:AudioMode)=>Promise<void>;toggle:()=>Promise<void>;seek:(value:number)=>void;setSpeed:(value:number)=>void;setSleep:(minutes:number|null)=>void;stop:()=>void};
const AudioContext=createContext<Ctx|null>(null);const KEY="nur-audio-state";
export function AudioProvider({children}:{children:React.ReactNode}){const ref=useRef<HTMLAudioElement|null>(null);const[track,setTrack]=useState<Track|null>(null);const[mode,setMode]=useState<AudioMode>("arabic");const[playing,setPlaying]=useState(false);const[position,setPosition]=useState(0);const[duration,setDuration]=useState(0);const[speed,setSpeedState]=useState(1);const[sleepUntil,setSleepUntil]=useState<number|null>(null);
useEffect(()=>{const a=new Audio();a.preload="metadata";ref.current=a;const tick=()=>{setPosition(a.currentTime);if(sleepUntil&&Date.now()>=sleepUntil){a.pause();setPlaying(false);setSleepUntil(null)}};const meta=()=>setDuration(Number.isFinite(a.duration)?a.duration:0);a.addEventListener("timeupdate",tick);a.addEventListener("loadedmetadata",meta);a.addEventListener("play",()=>setPlaying(true));a.addEventListener("pause",()=>setPlaying(false));a.addEventListener("ended",()=>setPlaying(false));try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s?.speed)setSpeedState(s.speed)}catch{}return()=>{a.pause();a.src=""}},[sleepUntil]);
useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify({track,mode,position,speed}))}catch{}},[track,mode,position,speed]);
const playTrack=useCallback(async(t:Track,m:AudioMode=mode)=>{const a=ref.current;if(!a)throw new Error("Audio unavailable");if(track?.id!==t.id){a.pause();const offline=await readOfflineAudio(t.id).catch(()=>null);a.src=offline?URL.createObjectURL(offline):t.url;a.currentTime=0;setPosition(0);setDuration(0);setTrack(t);setMode(m)}a.playbackRate=speed;await a.play()},[mode,speed,track]);
const toggle=useCallback(async()=>{const a=ref.current;if(!a)throw new Error("Audio unavailable");if(a.paused)await a.play();else a.pause()},[]);
const seek=useCallback((v:number)=>{const a=ref.current;if(a){a.currentTime=v;setPosition(v)}},[]);
const setSpeed=useCallback((v:number)=>{const n=Math.max(.75,Math.min(1.5,v));setSpeedState(n);if(ref.current)ref.current.playbackRate=n},[]);
const setSleep=useCallback((minutes:number|null)=>setSleepUntil(minutes?Date.now()+minutes*60000:null),[]);
const stop=useCallback(()=>{ref.current?.pause();setTrack(null);setPosition(0);setDuration(0)},[]);
const value=useMemo(()=>({track,mode,playing,position,duration,speed,sleepUntil,playTrack,toggle,seek,setSpeed,setSleep,stop}),[track,mode,playing,position,duration,speed,sleepUntil,playTrack,toggle,seek,setSpeed,setSleep,stop]);return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>}
export function useAudio(){const c=useContext(AudioContext);if(!c)throw new Error("useAudio must be used inside AudioProvider");return c}
