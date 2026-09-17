'use client';

import { FormEvent, useMemo, useState } from 'react';
import Icon from './Icons';

export type SystemType = 'solar' | 'generator' | 'lift' | 'ups';
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
type EstimateResult = { headline:string; label:string; stats:[string,string][]; detail:string };

const systems: {key:SystemType; label:string; short:string; icon:'solar'|'generator'|'lift'|'ups'}[] = [
  {key:'solar',label:'Solar PV',short:'Rooftop & hybrid',icon:'solar'},
  {key:'generator',label:'Generator',short:'Standby power',icon:'generator'},
  {key:'lift',label:'Lift',short:'Passenger & cargo',icon:'lift'},
  {key:'ups',label:'UPS',short:'Critical backup',icon:'ups'},
];

function round(value:number, digits=0){const p=10**digits;return Math.round(value*p)/p}

export default function SystemEstimator({compact=false,initialType='solar',initialStep=1}:{compact?:boolean;initialType?:SystemType;initialStep?:1|2|3}){
  const [type,setType]=useState<SystemType>(initialType);
  const [step,setStep]=useState<1|2|3>(initialStep);
  const [status,setStatus]=useState<SubmitState>('idle');
  const [location,setLocation]=useState('Dhaka');
  const [solarKwp,setSolarKwp]=useState(250);
  const [monthlyKwh,setMonthlyKwh]=useState(30000);
  const [criticalKw,setCriticalKw]=useState(120);
  const [liftPersons,setLiftPersons]=useState(10);
  const [liftFloors,setLiftFloors]=useState(8);
  const [upsKw,setUpsKw]=useState(20);
  const [upsMinutes,setUpsMinutes]=useState(30);
  const [contact,setContact]=useState({name:'',company:'',phone:'',email:''});

  const result=useMemo<EstimateResult>(()=>{
    if(type==='solar'){
      const size=compact?solarKwp:Math.max(5,round(monthlyKwh/120));
      return {headline:`${size} kWp`,label:'Indicative solar size',stats:[['Annual generation',`${round(size*1.45)} MWh`],['550W panels',`${Math.ceil(size*1000/550)}`],['Indicative roof area',`${Math.ceil(size*5.5).toLocaleString()} m²`]],detail:`Based on ${compact?'selected capacity':`${monthlyKwh.toLocaleString()} kWh monthly consumption`} and planning assumptions for Bangladesh.`};
    }
    if(type==='generator'){
      const kva=Math.ceil(((criticalKw/0.8)*1.15)/10)*10;
      return {headline:`${kva} kVA`,label:'Recommended generator class',stats:[['Critical load',`${criticalKw} kW`],['Design margin','15%'],['Power factor','0.80']],detail:'Indicative standby sizing. Starting currents, motor loads and duty cycle should be checked during engineering review.'};
    }
    if(type==='lift'){
      const kg=liftPersons*75;
      const speed=liftFloors>12?'1.5 m/s':liftFloors>7?'1.0 m/s':'0.75 m/s';
      return {headline:`${liftPersons} Person`,label:`${kg} kg passenger class`,stats:[['Floors',`${liftFloors}`],['Indicative speed',speed],['Drive','VVVF']],detail:'Final car size, shaft, speed and motor selection depend on building drawings, traffic pattern and code requirements.'};
    }
    const kwh=round(upsKw*(upsMinutes/60)*1.25,1);
    return {headline:`${upsKw} kW`,label:'Critical UPS load',stats:[['Backup target',`${upsMinutes} min`],['Indicative storage',`${kwh} kWh`],['Topology','Online']],detail:'Indicative energy requirement before battery ageing, inverter losses and redundancy requirements are finalized.'};
  },[type,compact,solarKwp,monthlyKwh,criticalKw,liftPersons,liftFloors,upsKw,upsMinutes]);

  const adjust=(delta:number)=>setSolarKwp(v=>Math.min(5000,Math.max(10,v+delta)));

  async function submit(e:FormEvent){
    e.preventDefault();
    if(!contact.name.trim()||!contact.phone.trim()) return;
    setStatus('submitting');
    const technical = type==='solar' ? `Monthly consumption: ${monthlyKwh} kWh\nEstimated PV size: ${result.headline}` : type==='generator' ? `Critical load: ${criticalKw} kW\nRecommended class: ${result.headline}` : type==='lift' ? `Persons: ${liftPersons}\nFloors: ${liftFloors}\nIndicative class: ${result.headline}` : `Critical load: ${upsKw} kW\nBackup: ${upsMinutes} minutes\nIndicative storage: ${result.stats[1][1]}`;
    const body={name:contact.name,company:contact.company,phone:contact.phone,email:contact.email,service:systems.find(s=>s.key===type)?.label||'System Estimator',location,message:`Estimate System Size request\nLocation: ${location}\n${technical}\n\nPlanning estimate only; engineering verification requested.`};
    try{
      const r=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      setStatus(r.ok?'success':'error');
    }catch{setStatus('error')}
  }

  if(compact) return <div className="gx-live-estimator">
    <div className="gx-estimator-title"><span><i/>System Estimator</span><b>Live</b></div>
    <div className="gx-mini-tabs">{systems.slice(0,3).map(s=><button key={s.key} className={type===s.key?'active':''} onClick={()=>setType(s.key)}><Icon name={s.icon}/>{s.label}</button>)}</div>
    {type==='solar'&&<><label className="gx-est-field"><span>Plant capacity (kWp)</span><div className="gx-number-control"><button onClick={()=>adjust(-25)}>−</button><b>{solarKwp.toLocaleString()} kWp</b><button onClick={()=>adjust(25)}>+</button></div></label></>}
    {type==='generator'&&<label className="gx-est-field"><span>Critical load (kW)</span><input type="number" min="10" value={criticalKw} onChange={e=>setCriticalKw(Math.max(10,Number(e.target.value)||10))}/></label>}
    {type==='lift'&&<label className="gx-est-field"><span>Passenger capacity</span><select value={liftPersons} onChange={e=>setLiftPersons(Number(e.target.value))}>{[6,8,10,13,15,20].map(x=><option value={x} key={x}>{x} persons</option>)}</select></label>}
    <label className="gx-est-field"><span>Location</span><select value={location} onChange={e=>setLocation(e.target.value)}><option>Dhaka</option><option>Gazipur</option><option>Chattogram</option><option>Narayanganj</option><option>Other Bangladesh</option></select></label>
    <div className="gx-live-result"><small>{result.label}</small><strong>{result.headline}</strong><span>{result.stats[0][0]} <b>{result.stats[0][1]}</b></span></div>
    <a className="gx-estimator-cta" href="/estimate-system-size">View Detailed Estimate <Icon name="arrow"/></a>
    <p className="gx-estimator-note">Planning estimate only. Final sizing requires site and load verification.</p>
  </div>;

  return <form className="gx-full-estimator" onSubmit={submit}>
    <div className="gx-estimator-progress"><span className={step>=1?'active':''}>01 <b>System</b></span><i/><span className={step>=2?'active':''}>02 <b>Requirements</b></span><i/><span className={step>=3?'active':''}>03 <b>Result & contact</b></span></div>
    {status==='success'?<div className="gx-estimator-success"><span><Icon name="check"/></span><h3>Estimate request received.</h3><p>Greenex can now review the indicative sizing and contact you for the technical details required for a proposal.</p><button type="button" onClick={()=>{setStatus('idle');setStep(1)}}>Create another estimate</button></div>:<>
      {step===1&&<div className="gx-estimator-step"><span className="kicker">Step 1</span><h3>What system are you planning?</h3><p>Select the closest engineering scope. The next step will ask only the inputs relevant to that system.</p><div className="gx-system-choice">{systems.map(s=><button type="button" key={s.key} className={type===s.key?'active':''} onClick={()=>setType(s.key)}><span><Icon name={s.icon}/></span><b>{s.label}</b><small>{s.short}</small></button>)}</div><div className="gx-estimator-nav"><span/><button type="button" className="btn btn-primary" onClick={()=>setStep(2)}>Continue <Icon name="arrow"/></button></div></div>}
      {step===2&&<div className="gx-estimator-step"><span className="kicker">Step 2</span><h3>Enter the planning inputs.</h3><p>Use the best information you currently have. The result is an indicative starting point, not a final engineering design.</p><div className="gx-est-fields">
        {type==='solar'&&<label>Average monthly electricity use <div className="gx-input-unit"><input type="number" min="500" step="500" value={monthlyKwh} onChange={e=>setMonthlyKwh(Math.max(500,Number(e.target.value)||500))}/><span>kWh / month</span></div></label>}
        {type==='generator'&&<label>Critical load to be backed up <div className="gx-input-unit"><input type="number" min="10" step="5" value={criticalKw} onChange={e=>setCriticalKw(Math.max(10,Number(e.target.value)||10))}/><span>kW</span></div></label>}
        {type==='lift'&&<><label>Passenger capacity<select value={liftPersons} onChange={e=>setLiftPersons(Number(e.target.value))}>{[6,8,10,13,15,20].map(x=><option value={x} key={x}>{x} persons</option>)}</select></label><label>Number of floors<input type="number" min="2" max="60" value={liftFloors} onChange={e=>setLiftFloors(Math.max(2,Number(e.target.value)||2))}/></label></>}
        {type==='ups'&&<><label>Critical IT / equipment load<div className="gx-input-unit"><input type="number" min="1" value={upsKw} onChange={e=>setUpsKw(Math.max(1,Number(e.target.value)||1))}/><span>kW</span></div></label><label>Required backup time<select value={upsMinutes} onChange={e=>setUpsMinutes(Number(e.target.value))}>{[15,30,60,120,240].map(x=><option key={x} value={x}>{x} minutes</option>)}</select></label></>}
        <label>Project location<select value={location} onChange={e=>setLocation(e.target.value)}><option>Dhaka</option><option>Gazipur</option><option>Chattogram</option><option>Narayanganj</option><option>Other Bangladesh</option></select></label>
      </div><div className="gx-estimator-nav"><button type="button" className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button type="button" className="btn btn-primary" onClick={()=>setStep(3)}>Calculate Estimate <Icon name="arrow"/></button></div></div>}
      {step===3&&<div className="gx-estimator-step gx-result-step"><div className="gx-result-card"><small>{result.label}</small><strong>{result.headline}</strong><p>{result.detail}</p><div>{result.stats.map(([k,v])=><span key={k}><small>{k}</small><b>{v}</b></span>)}</div><em>Indicative planning result — final capacity, equipment selection and commercial offer require engineering verification.</em></div><div className="gx-est-contact"><span className="kicker">Get the technical follow-up</span><h3>Send this estimate to Greenex.</h3><div className="gx-est-contact-grid"><label>Your name<input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})}/></label><label>Company<input value={contact.company} onChange={e=>setContact({...contact,company:e.target.value})}/></label><label>Phone<input required value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})}/></label><label>Email<input type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})}/></label></div>{status==='error'&&<p className="gx-form-error">Could not submit. Please use the direct phone or WhatsApp contact.</p>}<div className="gx-estimator-nav"><button type="button" className="btn btn-secondary" onClick={()=>setStep(2)}>Back</button><button className="btn btn-primary" disabled={status==='submitting'}>{status==='submitting'?'Sending…':'Request Engineering Review'} <Icon name="arrow"/></button></div></div></div>}
    </>}
  </form>;
}
