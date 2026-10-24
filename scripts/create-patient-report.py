from pathlib import Path
from shutil import copy2
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/patient_report.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Brand',fontName='Helvetica-Bold',fontSize=25,leading=30,textColor=colors.HexColor('#235d4e')))
styles.add(ParagraphStyle(name='Lead',fontName='Helvetica',fontSize=12,leading=19,textColor=colors.HexColor('#536758')))
styles.add(ParagraphStyle(name='SectionLabel',fontName='Helvetica-Bold',fontSize=11,leading=17,textColor=colors.HexColor('#235d4e'),spaceBefore=13,spaceAfter=8))
styles.add(ParagraphStyle(name='Cell',fontName='Helvetica',fontSize=10,leading=16,textColor=colors.HexColor('#344d3f')))
styles.add(ParagraphStyle(name='Foot',fontName='Helvetica',fontSize=9,leading=14,textColor=colors.HexColor('#687967')))
P = lambda s: Paragraph(s, styles['Cell'])
story=[Paragraph('StayHealthy.',styles['Brand']),Spacer(1,9),Paragraph('Patient visit &amp; prescription report',styles['Title']),Paragraph('FICTIONAL SAMPLE - EDUCATIONAL PROJECT ONLY',styles['Lead']),Spacer(1,17)]
def table(rows,widths):
    t=Table([[P(str(c)) for c in row] for row in rows],colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e7eedf')),('LINEBELOW',(0,0),(-1,0),.5,colors.HexColor('#c9d8c1')),('LINEBELOW',(0,1),(-1,-1),.4,colors.HexColor('#e0e6da')),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12)]))
    return t
story += [table([['Report ID','Visit date','Consultation type'],['SH-DEMO-2026-001','24 October 2026','Simulated online visit']],[166,166,167])]
story += [Paragraph('01  PATIENT INFORMATION',styles['SectionLabel']),table([['Field','Fictional information'],['Name','Amina Demo'],['Age / patient ID','32 / PAT-DEMO-001'],['Contact','amina.demo@example.com / +252 61 000 0000'],['Clinician','Dr. Sara Hassan - General medicine (fictional)']],[150,349])]
story += [Paragraph('02  VISIT SUMMARY',styles['SectionLabel']),Paragraph('Reason for visit: a fictional routine wellbeing check. This sample demonstrates the layout of a patient report. No examination, diagnosis, or clinical assessment took place.',styles['Cell'])]
story += [Paragraph('03  PRESCRIPTION DETAILS',styles['SectionLabel']),table([['Item','Illustrative entry'],['Prescription ID','RX-DEMO-001'],['Medication','Example medication A - non-clinical placeholder'],['Strength / dose','Example strength / example dose - not for use'],['Frequency / duration','Example schedule / example duration - not for use'],['Instructions','Training placeholder only. Do not dispense or take any medication based on this document.']],[150,349])]
story += [Spacer(1,19),Paragraph('This report contains invented patient and prescription information. It is not a medical record, valid prescription, clinical recommendation, or proof of a real consultation.',styles['Foot'])]
def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#d7e0cf'));canvas.line(48,43,547,43)
    canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#687967'));canvas.drawString(48,29,'StayHealthy | Care within reach | Fictional course project');canvas.drawRightString(547,29,f'Page {doc.page}')
SimpleDocTemplate(str(OUT),pagesize=A4,leftMargin=48,rightMargin=48,topMargin=35,bottomMargin=53,title='StayHealthy - Fictional Patient Report',author='StayHealthy course project').build(story,onFirstPage=footer,onLaterPages=footer)
copy2(OUT,ROOT/'public/patient_report.pdf')
copy2(OUT,ROOT/'evidence/patient_report.pdf')
print(OUT)
