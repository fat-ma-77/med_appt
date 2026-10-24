from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'design'
OUT.mkdir(exist_ok=True)
def rect(x,y,w,h,fill='#fffefa',radius=8,stroke='none'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>'
def text(x,y,s,size=16,color='#203e35',weight=400,family='Arial'):
 return f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(s)}</text>'
def button(x,y,w,label):
 return rect(x,y,w,50,'#235d4e',7)+text(x+20,y+31,label,15,'#fffefa',600)
def navbar():
 return rect(0,0,1440,96,'#faf9f3',0)+rect(80,27,42,42,'#235d4e',12)+text(91,56,'+',29,'#fffefa',600)+text(134,57,'StayHealthy.',27,'#235d4e',700)+text(770,55,'Home',15,weight=600)+text(860,55,'Appointments',15,weight=600)+text(1015,55,'Reviews',15,weight=600)+text(1130,55,'Login',15,weight=600)+button(1230,23,130,'Sign Up ↗')+'<path d="M0 96H1440" stroke="#dfe4d9"/>'
def field(x,y,w,label,placeholder):
 return text(x,y,label,14,weight=600)+rect(x,y+13,w,50,stroke='#d5ddcf')+text(x+15,y+45,placeholder,14,'#82907b')
def frame(content,height):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="{height}" viewBox="0 0 1440 {height}"><title>StayHealthy editable interface design</title>'+rect(0,0,1440,height,'#faf9f3',0)+content+'</svg>'
nav=navbar()+text(80,160,'NAVIGATION / SIGNED-OUT STATE',12,'#657d59',700)+text(80,203,'A clear path to your next step.',32,family='Georgia')+text(80,244,'Home · Appointments · Reviews · Login · Sign Up',16,'#66756c')
(OUT/'navbar_design.svg').write_text(frame(nav,295),encoding='utf-8')
for signup in [True,False]:
 h=1040 if signup else 900
 body=navbar()+rect(80,133,530,h-173,'#eaf0e1',18)+text(115,180,'← Back to home',14,'#5e7256')+text(115,273,'Care that meets',48,family='Georgia')+text(115,332,'you where you are.',48,'#65815c',family='Georgia')+text(115,391,'A thoughtful space to connect with doctors',16,'#62775b')+text(115,418,'and keep your wellbeing within reach.',16,'#62775b')
 body+='<circle cx="345" cy="650" r="150" fill="#d7e5cf"/>'+rect(218,665,253,160,'#fffefa',70)+'<circle cx="345" cy="586" r="61" fill="#d6a582"/><path d="M283 587c-30-110 154-105 120 4-15-49-70-9-104-65Z" fill="#263f38"/>'
 body+=text(115,h-90,'✓ Easy appointment booking',15,'#4f6846')+text(115,h-60,'✓ Your care in one place',15,'#4f6846')
 x=710;w=610
 body+=text(x,175,'LET’S GET YOU STARTED' if signup else 'YOUR CARE, ALL TOGETHER',12,'#657d59',700)+text(x,230,'Create your account' if signup else 'Good to see you again.',42,family='Georgia')+text(x,268,'Already part of StayHealthy? Log in' if signup else 'Log in to pick up where you left off.',15,'#66756c')
 if signup:
  body+=field(x,315,w,'Role','Patient                                      ⌄')+field(x,407,w,'Name','Your full name')+field(x,499,295,'Email','you@example.com')+field(x+315,499,295,'Phone Number','+252 61 000 0000')+field(x,591,w,'Password','At least 10 characters')+text(x,675,'Use a unique password of 10–128 characters.',12,'#66756c')+field(x,716,w,'Confirm Password','Re-enter your password')
  body+=rect(x,807,17,17,stroke='#9bad90')+text(x+28,821,'I understand this is a learning demo and will use fictional details.',13,'#62705b')+button(x,859,w,'Create account                                                   →')+text(x+145,947,'Your next chapter of care starts here.',13,'#66756c')
 else:
  body+=field(x,340,w,'Email','you@example.com')+field(x,448,w,'Password','Enter your password')+button(x,556,w,'Login                                                              →')+text(x+132,652,'New to StayHealthy? Create an account',14,'#66756c')+rect(x,706,w,58,'#edf2e5')+text(x+22,741,'Educational demo · Please use fictional information.',14,'#66756c')
 (OUT/('signup_form_design.svg' if signup else 'login_form_design.svg')).write_text(frame(body,h),encoding='utf-8')
print('Prepared 3 editable SVG frames for Figma import.')
