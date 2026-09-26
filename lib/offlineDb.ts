"use client";
import {useEffect,useState} from "react";
import {BOOKS} from "../lib/source";
export type OfflineBook={id:string;status:"downloaded"|"downloading"|"available"|"missing";bytes?:number;count?:number;updatedAt?:string};
const DB="nur-hadith-offline",STORE="books";
function openDb(){return new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(STORE))d.createObjectStore(STORE,{keyPath:"id"})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
export function useOfflineBooks(){const[books,setBooks]=useState<OfflineBook[]>(BOOKS.map(id=>({id,status:"available"})));useEffect(()=>{if(!("indexedDB"in window))return;openDb().then(db=>{const r=db.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>setBooks(BOOKS.map(id=>r.result.find((x:OfflineBook)=>x.id===id)||{id,status:"available"}))}).catch(()=>{})},[]);return{books,setBooks}}
export async function saveOfflineBook(id:string,data:unknown){const db=await openDb();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put({id,status:"downloaded",data,updatedAt:new Date().toISOString()});tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
export async function readOfflineBook(id:string){if(!("indexedDB"in window))return null;const db=await openDb();return new Promise<any>(resolve=>{const r=db.transaction(STORE).objectStore(STORE).get(id);r.onsuccess=()=>resolve(r.result?.data||null);r.onerror=()=>resolve(null)})}
export async function readAllOfflineBooks(){if(!("indexedDB"in window))return [];const db=await openDb();return new Promise<any[]>(resolve=>{const r=db.transaction(STORE).objectStore(STORE).getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>resolve([])})}
export async function deleteOfflineBook(id:string){const db=await openDb();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).delete(id);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error)})}
