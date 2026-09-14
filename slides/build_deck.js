const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pptx.author = 'Ben Pascoe';
pptx.subject = 'Wild-bird AMR workshop: PubMLST, population genomics, source attribution and AMR';
pptx.title = 'From a wild-bird Campylobacter genome to an epidemiological story';
pptx.company = 'University of Oxford';
pptx.lang = 'en-GB';
pptx.theme = {
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  lang: 'en-GB'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F7F4' },
  objects: [
    { line: { x: 0.55, y: 7.12, w: 12.2, h: 0, line: { color: 'D7DDD9', width: 1 } } },
    { text: { text: 'Hungary workshop | Wild-bird AMR project', options: { x: 0.6, y: 7.18, w: 4.2, h: 0.18, fontFace: 'Arial', fontSize: 8, color: '65736F', margin: 0 } } },
  ],
  slideNumber: { x: 12.25, y: 7.14, w: 0.45, h: 0.2, color: '65736F', fontFace: 'Arial', fontSize: 8, align: 'right' }
});

const C = {
  ink: '152724',
  muted: '62716D',
  teal: '0F766E',
  teal2: 'DCEEEB',
  green: '4F7D5A',
  lime: 'DCE8C8',
  amber: 'C58A26',
  amber2: 'F4E8CC',
  red: 'B64C48',
  red2: 'F3DDDA',
  purple: '665A93',
  purple2: 'E6E1F0',
  white: 'FFFFFF',
  grey: 'E9ECE8',
  grey2: 'D7DDD9',
};

function addTitle(slide, title, kicker) {
  if (kicker) slide.addText(kicker.toUpperCase(), { x: 0.62, y: 0.42, w: 4.5, h: 0.22, fontFace: 'Arial', fontSize: 10, bold: true, color: C.teal, charSpacing: 1.5, margin: 0 });
  slide.addText(title, { x: 0.62, y: kicker ? 0.70 : 0.48, w: 12.0, h: 0.65, fontFace: 'Arial', fontSize: 27, bold: true, color: C.ink, margin: 0, breakLine: false, fit: 'shrink' });
}
function addSource(slide, text) {
  slide.addText(text, { x: 0.65, y: 6.86, w: 11.2, h: 0.18, fontFace: 'Arial', fontSize: 7.2, color: '7B8581', margin: 0, italic: true, fit: 'shrink' });
}
function addPill(slide, text, x, y, w, fill, color=C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.08, fill: {color: fill}, line: {color: fill} });
  slide.addText(text, { x: x+0.08, y: y+0.075, w: w-0.16, h: 0.17, fontFace:'Arial', fontSize: 10, bold:true, align:'center', color, margin:0, fit:'shrink' });
}
function addCard(slide, x, y, w, h, title, body, fill='FFFFFF', accent=C.teal) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: 'D9DEDB', width: 1 } });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.07, h, fill: { color: accent }, line: { color: accent } });
  slide.addText(title, { x: x+0.18, y: y+0.18, w: w-0.35, h: 0.34, fontFace:'Arial', fontSize: 15, bold:true, color:C.ink, margin:0, fit:'shrink' });
  slide.addText(body, { x: x+0.18, y: y+0.62, w: w-0.35, h: h-0.8, fontFace:'Arial', fontSize: 11.5, color:C.muted, margin:0, breakLine:false, fit:'shrink', valign:'top' });
}
function addArrow(slide, x, y, w, label, color=C.teal) {
  slide.addShape(pptx.ShapeType.chevron, { x, y, w, h: 0.52, fill:{color}, line:{color} });
  slide.addText(label, { x:x+0.05, y:y+0.15, w:w-0.18, h:0.18, fontFace:'Arial', fontSize:10.5, bold:true, color:C.white, align:'center', margin:0, fit:'shrink' });
}
function bulletText(slide, items, x, y, w, h, fs=16, color=C.ink) {
  const runs=[];
  items.forEach((t,i)=>{
    runs.push({text:t, options:{bullet:{indent:14}, hanging:3, breakLine:true}});
  });
  slide.addText(runs, { x,y,w,h, fontFace:'Arial', fontSize:fs, color, margin:0.03, paraSpaceAfterPt:8, breakLine:false, fit:'shrink', valign:'top' });
}

// 1 Title
{
  const s=pptx.addSlide('MASTER');
  s.background={color:'102A27'};
  s.addShape(pptx.ShapeType.arc, { x:9.15,y:0.0,w:4.1,h:3.45,adjustPoint:0.25,rotate:8,fill:{color:'16433E',transparency:10},line:{color:'16433E',transparency:100} });
  s.addText('FROM A WILD-BIRD GENOME', {x:0.72,y:0.72,w:5.5,h:0.28,fontFace:'Arial',fontSize:12,bold:true,color:'83C9BE',charSpacing:2,margin:0});
  s.addText('to an epidemiological story', {x:0.72,y:1.2,w:7.4,h:0.75,fontFace:'Arial',fontSize:35,bold:true,color:C.white,margin:0,fit:'shrink'});
  s.addText('PubMLST • population structure • source attribution • AMR', {x:0.75,y:2.12,w:7.4,h:0.38,fontFace:'Arial',fontSize:18,color:'D7E7E3',margin:0});
  addPill(s,'120 minutes',0.75,3.05,1.45,'E6E1F0','3F3765');
  addPill(s,'hands-on',2.35,3.05,1.30,'F4E8CC','6C4B10');
  addPill(s,'4 mystery genomes',3.80,3.05,1.80,'DCEEEB','0B5C55');
  s.addText('Opening question', {x:0.75,y:4.35,w:2,h:0.25,fontSize:11,bold:true,color:'83C9BE',margin:0});
  s.addText('“We cultured C. jejuni from a wild bird.\nDoes that make it a wild-bird strain?”', {x:0.75,y:4.72,w:7.4,h:1.25,fontSize:24,bold:true,color:C.white,margin:0,fit:'shrink'});
  s.addText('Ben Pascoe | Hungary workshop | 2026', {x:0.75,y:6.45,w:5.5,h:0.3,fontSize:11,color:'B6CFCA',margin:0});
}

// 2 arc
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'The session is one connected investigation','THE STORY');
  const labels=[['1','What is it?','MLST'],['2','What lineage?','ST / CC'],['3','Related to what?','Genome Comparator'],['4','What source?','Attribution'],['5','What AMR?','Resistance'],['6','How sure?','Uncertainty']];
  labels.forEach((d,i)=>{
    const x=0.6+i*2.05;
    s.addShape(pptx.ShapeType.ellipse,{x:x+0.5,y:2.0,w:0.72,h:0.72,fill:{color:i<3?C.teal2:(i<5?C.amber2:C.purple2)},line:{color:i<3?C.teal:(i<5?C.amber:C.purple),width:1.3}});
    s.addText(d[0],{x:x+0.5,y:2.19,w:0.72,h:0.22,fontSize:18,bold:true,align:'center',color:C.ink,margin:0});
    if(i<5) s.addShape(pptx.ShapeType.line,{x:x+1.23,y:2.36,w:0.78,h:0,line:{color:'AAB5B0',width:2,beginArrowType:'none',endArrowType:'triangle'}});
    s.addText(d[1],{x,y:2.95,w:1.75,h:0.32,fontSize:15,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
    s.addText(d[2],{x,y:3.38,w:1.75,h:0.25,fontSize:11,align:'center',color:C.muted,margin:0});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:1.2,y:4.65,w:10.8,h:1.2,rectRadius:0.08,fill:{color:'FFFFFF'},line:{color:C.grey2,width:1}});
  s.addText('The aim is not to learn which buttons to click.',{x:1.5,y:4.92,w:4.8,h:0.28,fontSize:18,bold:true,color:C.ink,margin:0});
  s.addText('It is to decide what level of inference the genome actually supports.',{x:6.0,y:4.90,w:5.5,h:0.42,fontSize:18,bold:true,color:C.teal,margin:0,fit:'shrink'});
}

// 3 case study
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Case study: the livestock–wildlife interface in Sweden','DATASET');
  s.addText('561 C. jejuni genomes', {x:0.75,y:1.47,w:3.1,h:0.48,fontSize:25,bold:true,color:C.ink,margin:0});
  s.addText('Five ecological groups give us a built-in comparison between agriculture and a non-agricultural wild-bird population.',{x:0.75,y:2.05,w:3.6,h:1.15,fontSize:15,color:C.muted,margin:0,fit:'shrink'});
  const groups=[['Conventional\nchicken',68,C.amber2,C.amber],['Organic\nchicken',126,'EAD7B5',C.amber],['Ruminant',15,C.teal2,C.teal],['Wild bird\nnear farm',87,C.red2,C.red],['Wild bird\nOttenby',265,C.purple2,C.purple]];
  const max=265;
  groups.forEach((g,i)=>{
    const x=4.7+i*1.55; const bh=2.75*g[1]/max;
    s.addShape(pptx.ShapeType.roundRect,{x:x,y:4.85-bh,w:0.78,h:bh,rectRadius:0.04,fill:{color:g[2]},line:{color:g[3],width:1.2}});
    s.addText(String(g[1]),{x:x,y:4.58-bh,w:0.78,h:0.22,fontSize:13,bold:true,align:'center',color:g[3],margin:0});
    s.addText(g[0],{x:x-0.2,y:5.05,w:1.18,h:0.55,fontSize:10.5,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
  });
  s.addText('Why this dataset works for teaching', {x:0.75,y:4.15,w:3.1,h:0.3,fontSize:15,bold:true,color:C.teal,margin:0});
  bulletText(s,['host-sharing STs','close cross-host genome pairs','farm-proximity AMR signal'],0.75,4.58,3.4,1.45,13,C.ink);
  addSource(s,'Project metadata and manuscript: 561 genomes; BioProject PRJNA1450089.');
}

// 4 mysteries
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Four mystery genomes — all recovered from wild birds','YOUR CASES');
  const cards=[['A','Where does it sit?','Do not assume “wild bird isolate” = “wild-bird lineage”.',C.purple],['B','Generalist or specialist?','Can we recognise a lineage that moves among hosts?',C.red],['C','Near a farm ≠ farm lineage','Ecology and bacterial ancestry are different variables.',C.teal],['D','Shared type, shared transmission?','How far can seven-locus MLST take us?',C.amber]];
  cards.forEach((d,i)=> addCard(s,0.72+i*3.08,1.55,2.72,3.0,`Mystery ${d[0]}\n${d[1]}`,d[2],i%2===0?'FFFFFF':'FAFAF7',d[3]));
  s.addShape(pptx.ShapeType.roundRect,{x:1.65,y:5.12,w:10.0,h:0.92,rectRadius:0.08,fill:{color:C.teal2},line:{color:'B8DAD4',width:1}});
  s.addText('Rule for the next 90 minutes: predict first, reveal second.',{x:2.05,y:5.42,w:9.2,h:0.28,fontSize:20,bold:true,color:'0B5C55',align:'center',margin:0});
}

// 5 pubmlst
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'PubMLST is two linked ideas, not just a website','PUBMLST');
  addCard(s,0.8,1.6,5.25,3.8,'1. Definitions / nomenclature','Allele definitions\nMLST profiles\nSequence types (STs)\nClonal complexes / schemes\n\nA stable language for describing variation.',C.teal2,C.teal);
  addCard(s,7.15,1.6,5.25,3.8,'2. Isolates / genomes','Genome assemblies\nHost and source metadata\nCountry and date\nPhenotypes\n\nBiological context for those lineage names.',C.purple2,C.purple);
  s.addShape(pptx.ShapeType.chevron,{x:6.25,y:2.8,w:0.62,h:1.25,fill:{color:C.amber},line:{color:C.amber}});
  s.addText('link',{x:6.2,y:3.26,w:0.66,h:0.2,fontSize:10,bold:true,color:C.white,align:'center',margin:0});
  s.addText('As of Sep 2026: >158k C. jejuni/coli isolate records and >107k genomes',{x:1.9,y:5.82,w:9.5,h:0.35,fontSize:14,bold:true,color:C.ink,align:'center',margin:0});
  addSource(s,'PubMLST Campylobacter jejuni/coli page, accessed Sep 2026.');
}

// 6 MLST schematic
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'MLST compresses sequence into a portable lineage name','MLST IN 60 SECONDS');
  const genes=['aspA','glnA','gltA','glyA','pgm','tkt','uncA'];
  genes.forEach((g,i)=>{
    const x=0.72+i*1.32;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.85,w:1.05,h:0.62,rectRadius:0.06,fill:{color:i%2?C.teal2:'EDF1ED'},line:{color:i%2?C.teal:'B7C2BD'}});
    s.addText(g,{x,y:2.03,w:1.05,h:0.2,fontSize:13,bold:true,align:'center',color:C.ink,margin:0});
    s.addText(String([7,17,2,4,10,3,6][i]),{x,y:2.75,w:1.05,h:0.25,fontSize:18,bold:true,align:'center',color:C.teal,margin:0});
  });
  s.addText('allele numbers',{x:0.72,y:3.15,w:9.0,h:0.28,fontSize:11,color:C.muted,align:'center',margin:0});
  addArrow(s,9.95,2.1,1.25,'profile');
  s.addShape(pptx.ShapeType.roundRect,{x:11.4,y:1.8,w:1.25,h:0.95,rectRadius:0.06,fill:{color:C.amber2},line:{color:C.amber,width:1.2}});
  s.addText('ST', {x:11.4,y:2.00,w:1.25,h:0.2,fontSize:12,bold:true,align:'center',color:C.muted,margin:0});
  s.addText('45',{x:11.4,y:2.28,w:1.25,h:0.32,fontSize:24,bold:true,align:'center',color:C.ink,margin:0});
  s.addShape(pptx.ShapeType.line,{x:12.0,y:2.78,w:0,h:0.72,line:{color:C.amber,width:1.5,endArrowType:'triangle'}});
  s.addText('CC45',{x:11.45,y:3.65,w:1.15,h:0.38,fontSize:20,bold:true,align:'center',color:C.amber,margin:0});
  s.addText('Useful — but seven loci are a tiny summary of a whole genome.',{x:1.35,y:4.55,w:10.7,h:0.52,fontSize:22,bold:true,color:C.ink,align:'center',margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:2.0,y:5.38,w:9.3,h:0.63,rectRadius:0.06,fill:{color:C.red2},line:{color:'E2BAB6'}});
  s.addText('Same ST/CC ≠ same outbreak ≠ direct transmission',{x:2.2,y:5.57,w:8.9,h:0.22,fontSize:17,bold:true,color:'823833',align:'center',margin:0});
}

// 7 practical 1
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Practical 1 — type a whole genome in PubMLST','25–45 MIN');
  const steps=[['1','Open sequence-definition DB'],['2','Single sequence'],['3','Upload FASTA'],['4','Choose MLST scheme'],['5','Submit'],['6','Record ST + CC']];
  steps.forEach((d,i)=>{
    const x=0.65+i*2.08;
    s.addShape(pptx.ShapeType.ellipse,{x:x+0.55,y:1.72,w:0.72,h:0.72,fill:{color:C.teal2},line:{color:C.teal,width:1.2}});
    s.addText(d[0],{x:x+0.55,y:1.92,w:0.72,h:0.23,fontSize:16,bold:true,align:'center',color:C.teal,margin:0});
    if(i<5) s.addShape(pptx.ShapeType.line,{x:x+1.28,y:2.08,w:0.75,h:0,line:{color:'A9B5B0',width:1.5,endArrowType:'triangle'}});
    s.addText(d[1],{x:x+0.05,y:2.72,w:1.75,h:0.58,fontSize:12.5,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:1.35,y:3.75,w:10.65,h:1.75,rectRadius:0.08,fill:{color:'FFFFFF'},line:{color:C.grey2,width:1}});
  s.addText('Record for A–D',{x:1.68,y:4.02,w:2.0,h:0.28,fontSize:16,bold:true,color:C.teal,margin:0});
  s.addText('7 allele numbers   •   ST   •   clonal complex   •   anything unexpected',{x:1.68,y:4.50,w:9.8,h:0.42,fontSize:19,bold:true,color:C.ink,margin:0,fit:'shrink'});
  s.addText('Whole-genome uploads can be multi-contig FASTA files.',{x:1.68,y:5.06,w:7.8,h:0.26,fontSize:12.5,color:C.muted,margin:0});
  addSource(s,'BIGSdb 1.54 sequence-query documentation: whole genomes can be uploaded and checked against all loci in a selected scheme.');
}

// 8 typing reveal
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'First reveal: the lineage labels','EXPECTED TYPING');
  const rows=[['A','ST1347','CC1347','Contrasting wild-bird lineage'],['B','ST45','CC45','Generalist warning'],['C','ST686','CC682','Different near-farm lineage'],['D','ST1525','Unassigned','Shared ST across host groups']];
  const y0=1.55;
  rows.forEach((r,i)=>{
    const y=y0+i*1.08;
    s.addShape(pptx.ShapeType.roundRect,{x:0.8,y,w:11.7,h:0.82,rectRadius:0.05,fill:{color:i%2?'FFFFFF':'F1F4F1'},line:{color:'E0E5E1'}});
    s.addShape(pptx.ShapeType.ellipse,{x:1.05,y:y+0.13,w:0.55,h:0.55,fill:{color:[C.purple,C.red,C.teal,C.amber][i]},line:{color:[C.purple,C.red,C.teal,C.amber][i]}});
    s.addText(r[0],{x:1.05,y:y+0.28,w:0.55,h:0.18,fontSize:13,bold:true,color:C.white,align:'center',margin:0});
    s.addText(r[1],{x:1.9,y:y+0.22,w:1.55,h:0.28,fontSize:18,bold:true,color:C.ink,margin:0});
    s.addText(r[2],{x:3.65,y:y+0.22,w:1.7,h:0.28,fontSize:18,bold:true,color:C.teal,margin:0});
    s.addText(r[3],{x:5.55,y:y+0.23,w:6.3,h:0.26,fontSize:15,color:C.muted,margin:0,fit:'shrink'});
  });
  s.addText('Question: what extra evidence do we need before turning these labels into ecological claims?',{x:1.35,y:6.05,w:10.65,h:0.4,fontSize:19,bold:true,color:C.ink,align:'center',margin:0});
}

// 9 project population structure
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'The project tree already hints at specialists and generalists','POPULATION STRUCTURE');
  s.addImage({path:path.join(__dirname,'../assets/project_population_structure.png'),x:0.7,y:1.35,w:8.2,h:5.2});
  addCard(s,9.25,1.55,3.25,1.35,'Look for mixing','Do colours from different ecological groups occupy the same lineage?',C.teal2,C.teal);
  addCard(s,9.25,3.15,3.25,1.35,'Look for separation','Are some wild-bird lineages largely outside poultry-associated clusters?',C.purple2,C.purple);
  addCard(s,9.25,4.75,3.25,1.35,'Then ask why','Host adaptation, exposure, movement, sampling — or some combination?',C.amber2,C.amber);
  addSource(s,'Project Figure 1 (user-provided manuscript materials).');
}

// 10 practical 2
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Practical 2 — move from seven loci to the genome','45–70 MIN');
  addCard(s,0.75,1.5,3.65,3.65,'A. Search the isolate collection','For each ST:\n\n• which hosts/sources appear?\n• is the lineage narrow or broad?\n• how complete is the metadata?\n\nDo not mistake submission frequency for prevalence.',C.purple2,C.purple);
  addCard(s,4.85,1.5,3.65,3.65,'B. Genome Comparator','Upload A–D as a ZIP.\n\nSelect a high-resolution defined-locus scheme.\n\nInspect variable loci, allelic distances and NeighborNet.',C.teal2,C.teal);
  addCard(s,8.95,1.5,3.65,3.65,'C. Interpret — carefully','Does whole-genome structure agree with MLST?\n\nWhich is the outlier?\n\nDoes “close” establish direction or route of transmission? No.',C.amber2,C.amber);
  s.addShape(pptx.ShapeType.roundRect,{x:2.35,y:5.62,w:8.7,h:0.60,rectRadius:0.05,fill:{color:C.red2},line:{color:'E2B9B5'}});
  s.addText('Distance = allelic differences. It is not a universal “number of transmission events”.',{x:2.62,y:5.80,w:8.2,h:0.22,fontSize:15.5,bold:true,color:'813832',align:'center',margin:0,fit:'shrink'});
  addSource(s,'BIGSdb Genome Comparator documentation: accepts one FASTA or a ZIP containing multiple FASTA genomes.');
}

// 11 relatedness caveat
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'A close genomic pair is powerful evidence — but not the whole causal story','RELATEDNESS ≠ TRANSMISSION');
  const nodes=[['Chicken','farm A',2.2,2.15,C.amber],['Wild bird','farm A',5.2,1.55,C.red],['Wild bird','farm B',8.0,2.55,C.red],['Environment','unsampled',5.35,4.55,C.teal],['Other host','unsampled',9.45,4.5,C.purple]];
  nodes.forEach(n=>{s.addShape(pptx.ShapeType.ellipse,{x:n[2],y:n[3],w:1.45,h:1.0,fill:{color:n[4],transparency:70},line:{color:n[4],width:2}});s.addText(`${n[0]}\n${n[1]}`,{x:n[2]+0.12,y:n[3]+0.23,w:1.2,h:0.45,fontSize:12,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});});
  const edges=[[3.55,2.55,1.55,-0.35],[6.5,2.0,1.5,0.6],[5.95,3.0,0.1,1.5],[6.8,4.8,2.5,0]];
  edges.forEach(e=>s.addShape(pptx.ShapeType.line,{x:e[0],y:e[1],w:e[2],h:e[3],line:{color:'A8B2AE',width:2,dash:'dash',endArrowType:'triangle'}}));
  s.addText('Same or very similar genome',{x:0.8,y:1.55,w:1.3,h:0.55,fontSize:15,bold:true,color:C.teal,align:'center',margin:0,fit:'shrink'});
  s.addText('Possible explanations',{x:0.8,y:3.45,w:1.45,h:0.35,fontSize:13,bold:true,color:C.ink,margin:0});
  bulletText(s,['direct transfer','common source','unsampled intermediate','lineage persistence'],0.8,3.92,1.5,1.65,11.5,C.muted);
  s.addShape(pptx.ShapeType.roundRect,{x:2.1,y:5.88,w:9.7,h:0.48,rectRadius:0.04,fill:{color:C.teal2},line:{color:'B8D8D2'}});
  s.addText('Genome data sharpen the transmission hypothesis; epidemiology tests it.',{x:2.35,y:6.02,w:9.2,h:0.2,fontSize:16,bold:true,color:'0B5C55',align:'center',margin:0});
}

// 12 source attribution concept
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Source attribution turns population structure into probabilities','SOURCE ATTRIBUTION');
  const sources=[['Poultry',C.amber,1.0],['Ruminant',C.teal,1.0],['Wild bird',C.purple,1.0]];
  sources.forEach((d,i)=>{
    const y=1.75+i*1.3;
    s.addShape(pptx.ShapeType.roundRect,{x:0.85,y,w:2.1,h:0.8,rectRadius:0.06,fill:{color:d[1],transparency:75},line:{color:d[1],width:1.4}});
    s.addText(d[0],{x:1.05,y:y+0.25,w:1.7,h:0.25,fontSize:16,bold:true,align:'center',color:C.ink,margin:0});
    s.addShape(pptx.ShapeType.line,{x:3.0,y:y+0.4,w:1.6,h:(3.25-(y+0.4)),line:{color:'AAB5B0',width:1.2}});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:4.7,y:2.55,w:2.1,h:1.4,rectRadius:0.08,fill:{color:C.teal2},line:{color:C.teal,width:1.5}});
  s.addText('TRAIN\nclassifier',{x:5.0,y:2.92,w:1.5,h:0.55,fontSize:20,bold:true,align:'center',color:C.teal,margin:0});
  s.addShape(pptx.ShapeType.line,{x:6.85,y:3.25,w:1.25,h:0,line:{color:'889792',width:2,endArrowType:'triangle'}});
  s.addShape(pptx.ShapeType.roundRect,{x:8.15,y:2.55,w:1.85,h:1.4,rectRadius:0.08,fill:{color:C.red2},line:{color:C.red,width:1.4}});
  s.addText('Mystery\ngenome',{x:8.42,y:2.94,w:1.3,h:0.52,fontSize:18,bold:true,align:'center',color:C.ink,margin:0});
  s.addShape(pptx.ShapeType.line,{x:10.08,y:3.25,w:0.85,h:0,line:{color:'889792',width:2,endArrowType:'triangle'}});
  s.addShape(pptx.ShapeType.roundRect,{x:11.0,y:1.72,w:1.45,h:3.05,rectRadius:0.06,fill:{color:'FFFFFF'},line:{color:C.grey2}});
  [['Poultry',0.48,C.amber],['Ruminant',0.12,C.teal],['Wild bird',0.40,C.purple]].forEach((r,i)=>{
    const y=2.0+i*0.86;
    s.addText(r[0],{x:11.16,y,w:1.05,h:0.2,fontSize:9.5,bold:true,color:C.ink,margin:0});
    s.addShape(pptx.ShapeType.rect,{x:11.16,y:y+0.26,w:1.02*r[1],h:0.18,fill:{color:r[2]},line:{color:r[2]}});
    s.addText(`${Math.round(r[1]*100)}%`,{x:11.16,y:y+0.49,w:1.02,h:0.18,fontSize:9,color:C.muted,align:'right',margin:0});
  });
  s.addText('Illustrative probabilities only',{x:10.95,y:4.92,w:1.6,h:0.2,fontSize:7.5,italic:true,color:C.muted,align:'center',margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:1.7,y:5.55,w:9.85,h:0.72,rectRadius:0.05,fill:{color:C.amber2},line:{color:'E3C990'}});
  s.addText('The model answers: “Which sampled source population does this genome resemble?”\nIt does not observe the actual transmission event.',{x:2.0,y:5.71,w:9.25,h:0.38,fontSize:14.5,bold:true,color:'65480F',align:'center',margin:0,fit:'shrink'});
}

// 13 practical 3
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Practical 3 — predict before the model does','70–90 MIN');
  s.addText('For each mystery genome, write down:',{x:0.85,y:1.5,w:3.2,h:0.3,fontSize:17,bold:true,color:C.ink,margin:0});
  const prompts=[['SOURCE','poultry / ruminant / wild bird'],['CONFIDENCE','low / medium / high'],['EVIDENCE','ST, CC, tree, metadata'],['FAILURE MODE','what could fool you?']];
  prompts.forEach((d,i)=> addCard(s,0.85+i*3.05,2.05,2.65,2.15,d[0],d[1],i%2?C.teal2:'FFFFFF',[C.purple,C.teal,C.amber,C.red][i]));
  s.addShape(pptx.ShapeType.roundRect,{x:1.5,y:4.7,w:10.4,h:1.22,rectRadius:0.08,fill:{color:C.purple2},line:{color:'C9BFDE'}});
  s.addText('Then reveal the precomputed SourceRunner-ML output.',{x:1.85,y:4.97,w:5.5,h:0.3,fontSize:19,bold:true,color:'493F70',margin:0});
  s.addText('The interesting question is not “did the model get it right?” — it is “why was it confident or uncertain?”',{x:1.85,y:5.42,w:9.45,h:0.3,fontSize:14.5,color:C.ink,margin:0,fit:'shrink'});
}

// 14 generalist
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'The hard cases are the biology, not a nuisance','GENERALISTS');
  s.addShape(pptx.ShapeType.ellipse,{x:1.2,y:1.7,w:4.25,h:4.25,fill:{color:C.amber2,transparency:28},line:{color:C.amber,width:2}});
  s.addShape(pptx.ShapeType.ellipse,{x:4.0,y:1.7,w:4.25,h:4.25,fill:{color:C.purple2,transparency:28},line:{color:C.purple,width:2}});
  s.addShape(pptx.ShapeType.ellipse,{x:6.8,y:1.7,w:4.25,h:4.25,fill:{color:C.teal2,transparency:28},line:{color:C.teal,width:2}});
  s.addText('POULTRY',{x:2.1,y:2.05,w:2.1,h:0.3,fontSize:16,bold:true,align:'center',color:'755312',margin:0});
  s.addText('WILD BIRDS',{x:5.05,y:2.05,w:2.1,h:0.3,fontSize:16,bold:true,align:'center',color:'4A4173',margin:0});
  s.addText('RUMINANTS',{x:7.95,y:2.05,w:2.1,h:0.3,fontSize:16,bold:true,align:'center',color:'0B5C55',margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:5.15,y:3.25,w:1.95,h:0.86,rectRadius:0.08,fill:{color:C.white},line:{color:C.red,width:2}});
  s.addText('ST45 / CC45',{x:5.28,y:3.53,w:1.7,h:0.24,fontSize:17,bold:true,align:'center',color:C.red,margin:0});
  s.addText('Rapid host switching can erode the genomic signal that source-attribution methods rely on.',{x:2.05,y:5.95,w:9.3,h:0.42,fontSize:19,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
  addSource(s,'Concept supported by Campylobacter generalist-lineage literature and the project’s shared ST45 observations.');
}

// 15 amr figure
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'AMR makes the same point: lineage + ecology + mobile DNA','AMR');
  s.addImage({path:path.join(__dirname,'../assets/project_amr_tree.png'),x:0.65,y:1.25,w:7.7,h:5.25});
  addCard(s,8.75,1.55,3.65,1.25,'Near-farm signal','Selected resistance determinants: 18.4% near farms vs 10.9% at the non-agricultural site.',C.red2,C.red);
  addCard(s,8.75,3.1,3.65,1.25,'Concrete markers','tetO shows a farm-proximity association; gyrA_T86I occurs in livestock and near-farm birds.',C.amber2,C.amber);
  addCard(s,8.75,4.65,3.65,1.25,'Do not overclaim','Association can reflect clonal movement, gene movement, shared exposure or sampling.',C.teal2,C.teal);
  addSource(s,'Project Figure 4 and manuscript results (user-provided materials).');
}

// 16 practical 4
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Practical 4 — resistance is a genomic result and an ecological question','90–110 MIN');
  const qs=[['1','What determinant?','Identify the gene/mutation and expected drug class.'],['2','Which background?','Is it concentrated in one lineage or many?'],['3','Which ecology?','Near farm, livestock, non-agricultural birds?'],['4','What mechanism?','Clonal spread, mobile element, repeated selection?']];
  qs.forEach((q,i)=>{
    addCard(s,0.75+(i%2)*6.15,1.55+Math.floor(i/2)*2.18,5.7,1.75,`${q[0]}. ${q[1]}`,q[2],i%2?C.teal2:'FFFFFF',[C.red,C.teal,C.amber,C.purple][i]);
  });
  s.addShape(pptx.ShapeType.roundRect,{x:2.05,y:5.95,w:9.2,h:0.48,rectRadius:0.04,fill:{color:C.purple2},line:{color:'C9BFDD'}});
  s.addText('Best extension: long reads + denser temporal/ecological sampling',{x:2.28,y:6.09,w:8.75,h:0.19,fontSize:15.5,bold:true,color:'493F70',align:'center',margin:0});
}

// 17 final reveal
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Final reveal: four genomes, four different lessons','SYNTHESIS');
  const data=[['A','Cj_2849','Songthrush • Ottenby','ST1347 / CC1347','Wild-bird population contrast',C.purple],['B','Cj_10787','Crow • near farm 2','ST45 / CC45','Generalist: expect attribution ambiguity',C.red],['C','Cj_10726','Crow • near farm 6','ST686 / CC682','Farm proximity ≠ CC45',C.teal],['D','Cj_10753','Barn swallow • near farm 5','ST1525 / unassigned','Shared ST ≠ demonstrated transfer',C.amber]];
  data.forEach((d,i)=>{
    const x=0.68+i*3.08;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.45,w:2.72,h:4.6,rectRadius:0.07,fill:{color:'FFFFFF'},line:{color:'D7DDD9',width:1}});
    s.addShape(pptx.ShapeType.ellipse,{x:x+0.95,y:1.72,w:0.82,h:0.82,fill:{color:d[5]},line:{color:d[5]}});
    s.addText(d[0],{x:x+0.95,y:1.95,w:0.82,h:0.22,fontSize:18,bold:true,color:C.white,align:'center',margin:0});
    s.addText(d[1],{x:x+0.22,y:2.82,w:2.28,h:0.3,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
    s.addText(d[2],{x:x+0.22,y:3.28,w:2.28,h:0.55,fontSize:12.5,color:C.muted,align:'center',margin:0,fit:'shrink'});
    s.addText(d[3],{x:x+0.22,y:4.05,w:2.28,h:0.28,fontSize:15,bold:true,color:d[5],align:'center',margin:0});
    s.addText(d[4],{x:x+0.25,y:4.72,w:2.22,h:0.72,fontSize:13.5,bold:true,color:C.ink,align:'center',margin:0,fit:'shrink'});
  });
  s.addText('Ask one group to give the 60-second story for one genome — including the uncertainty.',{x:1.25,y:6.28,w:10.8,h:0.3,fontSize:16,bold:true,color:C.teal,align:'center',margin:0});
}

// 18 take home
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'What I want people to remember','TAKE-HOME');
  const take=[['MLST names lineages','It does not use the whole genome.'],['Genome comparison adds resolution','Relatedness is not transmission direction.'],['Source attribution is conditional','It depends on the sampled reference populations.'],['Generalists are informative','Uncertainty can be a biological signal.'],['AMR needs context','Lineage, ecology and mobile DNA all matter.'],['Metadata are part of genomics','Bad labels produce bad inference.']];
  take.forEach((d,i)=>{
    const col=i%2,row=Math.floor(i/2); const x=0.85+col*6.15,y=1.42+row*1.62;
    s.addText(String(i+1).padStart(2,'0'),{x,y,w:0.55,h:0.3,fontSize:14,bold:true,color:[C.teal,C.purple,C.amber,C.red,C.teal,C.purple][i],margin:0});
    s.addText(d[0],{x:x+0.62,y,w:4.95,h:0.3,fontSize:17,bold:true,color:C.ink,margin:0,fit:'shrink'});
    s.addText(d[1],{x:x+0.62,y:y+0.42,w:4.95,h:0.42,fontSize:12.5,color:C.muted,margin:0,fit:'shrink'});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:1.15,y:6.12,w:11.0,h:0.48,rectRadius:0.04,fill:{color:'102A27'},line:{color:'102A27'}});
  s.addText('GitHub package: participant workbook • instructor key • data templates • backup outputs • optional SourceRunner-ML follow-up',{x:1.42,y:6.26,w:10.45,h:0.20,fontSize:12.5,bold:true,color:C.white,align:'center',margin:0,fit:'shrink'});
}

pptx.writeFile({ fileName: path.join(__dirname,'wild-bird-amr-workshop-slides.pptx') });
