import{OrbitControls as g}from"https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";import*as i from"https://unpkg.com/three@0.127.0/build/three.module.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function f(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=f(e);fetch(e.href,t)}})();const l=document.querySelector("canvas.webgl"),h=new i.Scene,y=new i.TextureLoader,x=y.load("coolTex.jpg"),u=new i.BoxGeometry(1,1,1),M=new i.DodecahedronGeometry(.5,3),w=new i.MeshBasicMaterial({map:x}),a=new i.Mesh(u,w),m=new i.Mesh(M,w);h.add(a);a.position.x=0;a.position.y=.8;m.position.x=-1.6;m.position.y=.5;u.center();const o={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight,n.aspect=o.width/o.height,n.updateProjectionMatrix(),r.setSize(o.width,o.height),r.setPixelRatio(Math.min(window.devicePixelRatio,2))});const n=new i.PerspectiveCamera(75,o.width/o.height,.1,100);n.position.z=3;h.add(n);const p=new g(n,l);p.enableZoom=!1;p.enableDamping=!0;const r=new i.WebGLRenderer({canvas:l,alpha:!0});r.setSize(o.width,o.height);r.setPixelRatio(Math.min(window.devicePixelRatio,2));new i.Clock;
