'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icons';

type SystemType = 'solar' | 'generator' | 'lift' | 'ups';

const systems: {key:SystemType; label:string; hint:string; icon:'solar'|'generator'|'lift'|'ups'}[] = [
  {key:'solar',label:'Solar PV',hint:'Rooftop / hybrid',icon:'solar'},
  {key:'generator',label:'Generator',hint:'Standby power',icon:'generator'},
  {key:'lift',label:'Lift',hint:'Passenger / cargo',icon:'lift'},
  {key:'ups',label:'UPS',hint:'Critical backup',icon:'ups'},
];

export default function EstimatorLauncher(){
  const router=useRouter();
  const [type,setType]=useState<SystemType>('solar');
  return <div className="gx-estimator-launcher" aria-label="Start system size estimate">
    <div className="gx-estimator-title"><span><i/>System Estimator</span><b>Quick start</b></div>
    <div className="gx-launcher-copy"><small>Choose a system</small><h2>Start with the right engineering path.</h2><p>Select the system you want to size. The detailed calculator opens on its own page, where you can move forward or back at any step.</p></div>
    <div className="gx-launcher-options">{systems.map(s=><button key={s.key} type="button" className={type===s.key?'active':''} onClick={()=>setType(s.key)}><span><Icon name={s.icon}/></span><div><b>{s.label}</b><small>{s.hint}</small></div><Icon name="check"/></button>)}</div>
    <button type="button" className="gx-estimator-cta gx-launcher-continue" onClick={()=>router.push(`/estimate-system-size?type=${type}&step=2`)}>Continue to Estimate <Icon name="arrow"/></button>
    <p className="gx-estimator-note">No commitment. Planning estimate only; final sizing requires site and load verification.</p>
  </div>;
}
