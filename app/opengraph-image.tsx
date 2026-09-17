import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Greenex Power Engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',background:'#0D1F1A',color:'white',padding:'72px',fontFamily:'Arial, sans-serif',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:-120,top:-160,width:520,height:520,borderRadius:'50%',background:'#18A957',opacity:.3}}/>
      <div style={{position:'absolute',right:100,bottom:-210,width:440,height:440,borderRadius:'50%',border:'2px solid rgba(53,201,107,.28)'}}/>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',zIndex:2,width:'100%'}}>
        <div style={{display:'flex',alignItems:'center',fontSize:38,fontWeight:800,letterSpacing:'-1px'}}>GREENEX</div>
        <div style={{maxWidth:900}}>
          <div style={{fontSize:18,textTransform:'uppercase',letterSpacing:5,color:'#35C96B',marginBottom:24}}>Power • Energy • Infrastructure</div>
          <div style={{fontSize:74,lineHeight:1.02,fontWeight:800,letterSpacing:'-3px'}}>Sustainable & Innovative Engineering Solutions</div>
        </div>
        <div style={{fontSize:20,color:'#cbd5e1'}}>Greenex Power Engineering • Bangladesh</div>
      </div>
    </div>,
    size
  );
}
