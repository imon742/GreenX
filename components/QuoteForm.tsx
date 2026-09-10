'use client';
import { FormEvent, useState } from 'react';
import Icon from './Icons';

const services=['Solar Energy','Generator & Backup Power','Lift & Elevator','Electrical Engineering','Lightning Protection','Maintenance & Support'];
const siteTypes=['Industrial','Commercial','Residential','Institution / Infrastructure'];

export default function QuoteForm(){
  const [step,setStep]=useState(1);
  const [status,setStatus]=useState('');
  const [form,setForm]=useState({service:'Solar Energy',site_type:'Industrial',capacity:'',name:'',company:'',phone:'',email:'',location:'',message:''});
  const change=(key:string,value:string)=>setForm(f=>({...f,[key]:value}));
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus('Sending…');
    const body={...form,message:`Site type: ${form.site_type}\nRequired capacity / load: ${form.capacity||'Not specified'}\n\n${form.message||''}`.trim()};
    const r=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(r.ok){setStatus('Thank you. Your request has been received.');setStep(1);setForm({service:'Solar Energy',site_type:'Industrial',capacity:'',name:'',company:'',phone:'',email:'',location:'',message:''});}
    else setStatus('Could not send the request. Please call or WhatsApp us.');
  }
  return <form className="quote-builder" onSubmit={submit}>
    <div className="quote-progress"><span className={step===1?'active':''}>01 <b>Requirement</b></span><i/><span className={step===2?'active':''}>02 <b>Contact</b></span></div>
    {step===1 ? <div className="quote-step">
      <div className="quote-step-head"><span className="kicker">Step 1</span><h3>Tell us what you need.</h3><p>Choose the closest project type. Our engineering team can refine the sizing after a site review.</p></div>
      <label>Required service<select value={form.service} onChange={e=>change('service',e.target.value)}>{services.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Site type<select value={form.site_type} onChange={e=>change('site_type',e.target.value)}>{siteTypes.map(x=><option key={x}>{x}</option>)}</select></label>
      <label>Estimated capacity / load<input value={form.capacity} onChange={e=>change('capacity',e.target.value)} placeholder="Example: 250 kWp, 100 kVA, 10 persons"/></label>
      <button type="button" className="btn btn-primary btn-wide" onClick={()=>setStep(2)}>Continue <Icon name="arrow"/></button>
    </div> : <div className="quote-step">
      <div className="quote-step-head"><span className="kicker">Step 2</span><h3>Where should we contact you?</h3><p>Share the essentials and we can discuss the technical scope directly.</p></div>
      <div className="field-grid-v3">
        <label>Your name<input required value={form.name} onChange={e=>change('name',e.target.value)}/></label>
        <label>Company<input value={form.company} onChange={e=>change('company',e.target.value)}/></label>
        <label>Phone<input required value={form.phone} onChange={e=>change('phone',e.target.value)}/></label>
        <label>Email<input type="email" value={form.email} onChange={e=>change('email',e.target.value)}/></label>
      </div>
      <label>Project location<input value={form.location} onChange={e=>change('location',e.target.value)} placeholder="Dhaka, Gazipur, Chattogram…"/></label>
      <label>Additional requirement<textarea rows={4} value={form.message} onChange={e=>change('message',e.target.value)} placeholder="Timeline, current problem, preferred brand, backup runtime, building floors, etc."/></label>
      <div className="quote-buttons"><button type="button" className="btn btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn btn-primary" type="submit">Send Request <Icon name="arrow"/></button></div>
    </div>}
    {status&&<p className={`form-status ${status.startsWith('Thank')?'success':''}`}>{status}</p>}
  </form>;
}
