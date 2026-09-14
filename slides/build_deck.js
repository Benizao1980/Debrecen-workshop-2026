const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Ben Pascoe';
pptx.company = 'University of Oxford';
pptx.subject = 'Public-data Campylobacter workshop: PubMLST, population genomics, source attribution and wild-bird AMR';
pptx.title = 'From a Campylobacter genome to an ecological story';
pptx.lang = 'en-GB';
pptx.theme = { headFontFace: 'Arial', bodyFontFace: 'Arial', lang: 'en-GB' };
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F8F5' },
  objects: [
    { line: { x: 0.55, y: 7.11, w: 12.2, h: 0, line: { color: 'D8DEDA', width: 1 } } },
    { text: { text: 'Hungary workshop | public-data edition', options: { x: 0.62, y: 7.17, w: 4.2, h: 0.18, fontSize: 8, color: '6A7772', margin: 0 } } },
  ],
  slideNumber: { x: 12.25, y: 7.14, w: 0.45, h: 0.2, color: '6A7772', fontFace: 'Arial', fontSize: 8, align: 'right' }
});

const C = {
  ink: '172824', muted: '60716C', teal: '0E766E', teal2: 'DDEEEA',
  green: '4E7B57', green2: 'E3EEDC', amber: 'B97918', amber2: 'F5E8CC',
  red: 'B24C48', red2: 'F2DDDB', purple: '675B91', purple2: 'E8E3F2',
  blue: '386D8C', blue2: 'DDEAF2', grey: 'E8ECE8', grey2: 'D5DCD8', white: 'FFFFFF'
};

function title(s, t, kicker='') {
  if (kicker) s.addText(kicker.toUpperCase(), { x:0.62,y:0.38,w:4.5,h:0.22,fontSize:10,bold:true,color:C.teal,charSpacing:1.3,margin:0 });
  s.addText(t, { x:0.62,y:kicker?0.69:0.48,w:12.0,h:0.62,fontSize:27,bold:true,color:C.ink,margin:0,fit:'shrink' });
}
function source(s, text) {
  s.addText(text,{x:0.66,y:6.84,w:11.55,h:0.2,fontSize:7.3,italic:true,color:'7A8581',margin:0,fit:'shrink'});
}
function card(s,x,y,w,h,head,body,fill='FFFFFF',accent=C.teal) {
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:0.06,fill:{color:fill},line:{color:'D7DDD9',width:1}});
  s.addShape(pptx.ShapeType.rect,{x,y,w:0.07,h,fill:{color:accent},line:{color:accent}});
  s.addText(head,{x:x+0.18,y:y+0.17,w:w-0.32,h:0.42,fontSize:15,bold:true,color:C.ink,margin:0,fit:'shrink'});
  s.addText(body,{x:x+0.18,y:y+0.63,w:w-0.34,h:h-0.80,fontSize:11.6,color:C.muted,margin:0,fit:'shrink',valign:'top'});
}
function pill(s,text,x,y,w,fill,color=C.ink){
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h:0.34,rectRadius:0.08,fill:{color:fill},line:{color:fill}});
  s.addText(text,{x:x+0.07,y:y+0.08,w:w-0.14,h:0.16,fontSize:10,bold:true,align:'center',color,margin:0,fit:'shrink'});
}
function bullets(s, items, x,y,w,h,fs=15,color=C.ink){
  const runs=[]; items.forEach(t=>runs.push({text:t,options:{bullet:{indent:14},hanging:3,breakLine:true}}));
  s.addText(runs,{x,y,w,h,fontSize:fs,color,margin:0.03,paraSpaceAfterPt:7,fit:'shrink',valign:'top'});
}
function bigNumber(s,n,label,x,y,w,accent){
  s.addText(n,{x,y,w,h:0.58,fontSize:30,bold:true,color:accent,align:'center',margin:0});
  s.addText(label,{x,y:y+0.62,w,h:0.6,fontSize:12,bold:true,color:C.ink,align:'center',margin:0,fit:'shrink'});
}

// 1
{
  const s=pptx.addSlide('MASTER'); s.background={color:'102B27'};
  s.addText('PUBLIC-DATA EDITION',{x:0.75,y:0.68,w:4.2,h:0.28,fontSize:12,bold:true,color:'8ED0C5',charSpacing:2,margin:0});
  s.addText('From a Campylobacter genome\nto an ecological story',{x:0.75,y:1.18,w:7.8,h:1.35,fontSize:35,bold:true,color:C.white,margin:0,fit:'shrink'});
  s.addText('PubMLST • population structure • source attribution • wild-bird AMR',{x:0.78,y:2.72,w:8.6,h:0.38,fontSize:18,color:'D4E7E2',margin:0});
  pill(s,'120 minutes',0.78,3.45,1.45,C.purple2,'423768');
  pill(s,'hands-on',2.38,3.45,1.25,C.amber2,'68480E');
  pill(s,'public genomes only',3.80,3.45,1.95,C.teal2,'0A5D56');
  s.addText('Opening question',{x:0.78,y:4.48,w:2.2,h:0.23,fontSize:11,bold:true,color:'8ED0C5',margin:0});
  s.addText('“You have four Campylobacter genomes.\nHow far can sequence take you toward saying where they came from?”',{x:0.78,y:4.82,w:8.1,h:1.28,fontSize:23,bold:true,color:C.white,margin:0,fit:'shrink'});
  s.addText('Ben Pascoe | Hungary workshop | 2026',{x:0.78,y:6.48,w:5.5,h:0.25,fontSize:11,color:'B6CFCA',margin:0});
  // decorative population circles
  [[9.5,1.1,C.amber],[10.65,1.55,C.teal],[11.8,1.0,C.purple],[9.8,2.6,C.red],[11.1,2.9,C.blue],[12.05,2.35,C.green]].forEach((d,i)=>{
    s.addShape(pptx.ShapeType.ellipse,{x:d[0],y:d[1],w:0.78,h:0.78,fill:{color:d[2],transparency:12},line:{color:d[2],transparency:100}});
  });
}

// 2
{
  const s=pptx.addSlide('MASTER'); title(s,'The session is one connected investigation','THE STORY');
  const labels=[['1','What is it?','MLST'],['2','What lineage?','ST / CC'],['3','Related to what?','cgMLST'],['4','What source?','Attribution'],['5','What AMR/ecology?','Wild birds'],['6','How sure?','Inference']];
  labels.forEach((d,i)=>{
    const x=0.47+i*2.08;
    const col=[C.teal,C.blue,C.purple,C.amber,C.red,C.green][i];
    s.addShape(pptx.ShapeType.ellipse,{x:x+0.55,y:2.0,w:0.72,h:0.72,fill:{color:col,transparency:78},line:{color:col,width:1.5}});
    s.addText(d[0],{x:x+0.55,y:2.19,w:0.72,h:0.22,fontSize:18,bold:true,align:'center',color:C.ink,margin:0});
    if(i<5) s.addShape(pptx.ShapeType.line,{x:x+1.28,y:2.36,w:0.74,h:0,line:{color:'AAB5B0',width:1.8,endArrowType:'triangle'}});
    s.addText(d[1],{x,y:2.97,w:1.82,h:0.35,fontSize:14.5,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
    s.addText(d[2],{x,y:3.40,w:1.82,h:0.25,fontSize:10.8,align:'center',color:C.muted,margin:0});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:1.25,y:4.75,w:10.8,h:1.15,rectRadius:0.08,fill:{color:C.white},line:{color:C.grey2}});
  s.addText('The aim is not to memorise tools.',{x:1.65,y:5.05,w:4.6,h:0.3,fontSize:18,bold:true,color:C.ink,margin:0});
  s.addText('It is to match the strength of the claim to the strength of the genomic evidence.',{x:5.8,y:4.97,w:5.8,h:0.48,fontSize:18,bold:true,color:C.teal,margin:0,fit:'shrink'});
}

// 3
{
  const s=pptx.addSlide('MASTER'); title(s,'Why switch to a fully public teaching dataset?','DESIGN CHOICE');
  card(s,0.78,1.55,3.75,3.35,'Safe to share','No unpublished project assemblies or sensitive metadata in the repository. Participants can keep the materials indefinitely.',C.teal2,C.teal);
  card(s,4.78,1.55,3.75,3.35,'Reproducible','Mystery records are selected from an immutable published supplement using explicit rules — not by memory or manual cherry-picking.',C.blue2,C.blue);
  card(s,8.78,1.55,3.75,3.35,'Better pedagogy','We can deliberately contrast host specialists with a generalist that is genuinely difficult to source-attribute.',C.purple2,C.purple);
  s.addShape(pptx.ShapeType.roundRect,{x:1.35,y:5.40,w:10.65,h:0.72,rectRadius:0.06,fill:{color:C.amber2},line:{color:'E2C68D'}});
  s.addText('Public data does not mean “static database”: pin the published S1 snapshot, then use live PubMLST for exploration.',{x:1.65,y:5.62,w:10.05,h:0.28,fontSize:16,bold:true,color:'62470F',align:'center',margin:0,fit:'shrink'});
  source(s,'Core teaching data: Arning et al., PLoS Genetics 2021, doi:10.1371/journal.pgen.1009436; S1 doi:10.1371/journal.pgen.1009436.s001.');
}

// 4
{
  const s=pptx.addSlide('MASTER'); title(s,'Dataset 1 — a published source-attribution benchmark','ARNING ET AL. 2021');
  bigNumber(s,'5,799','public genomes',0.70,1.42,2.0,C.teal);
  bigNumber(s,'5','source classes',2.65,1.42,1.65,C.purple);
  bigNumber(s,'1,343','cgMLST loci',4.30,1.42,1.9,C.blue);
  bigNumber(s,'ST-wise','train/test split',6.25,1.42,2.0,C.amber);
  const groups=[['Chicken',4147,C.amber],['Cattle',716,C.teal],['Sheep',584,C.green],['Wild bird',212,C.purple],['Environment',140,C.blue]];
  const max=4147;
  groups.forEach((g,i)=>{
    const y=3.18+i*0.58;
    s.addText(g[0],{x:0.85,y,w:1.25,h:0.23,fontSize:12,bold:true,color:C.ink,margin:0});
    const bar=8.5*(g[1]/max);
    s.addShape(pptx.ShapeType.roundRect,{x:2.15,y:y+0.02,w:Math.max(0.30,bar),h:0.26,rectRadius:0.03,fill:{color:g[2]},line:{color:g[2]}});
    s.addText(g[1].toLocaleString(),{x:10.88,y:y-0.01,w:1.0,h:0.25,fontSize:12,bold:true,color:g[2],align:'right',margin:0});
  });
  s.addText('Crucial design detail: all members of an ST were assigned entirely to training or testing.',{x:8.6,y:1.53,w:3.9,h:1.0,fontSize:15,bold:true,color:C.ink,margin:0,fit:'shrink'});
  s.addText('That makes the test less vulnerable to lineage leakage than randomly splitting near-identical records.',{x:8.6,y:2.52,w:3.9,h:0.78,fontSize:12.5,color:C.muted,margin:0,fit:'shrink'});
  source(s,'Arning et al. 2021: chicken 4,147; cattle 716; sheep 584; wild bird 212; environment 140.');
}

// 5
{
  const s=pptx.addSlide('MASTER'); title(s,'Four mysteries are selected for four different biological lessons','MYSTERY DESIGN');
  const cards=[
    ['A','Wild-bird specialist','Generalist index = 1','A clean host-associated signal.',C.purple,C.purple2],
    ['B','Chicken specialist','Generalist index = 1','A clean poultry contrast.',C.amber,C.amber2],
    ['C','Ruminant specialist','Cattle or sheep','Useful — but those gene pools overlap.',C.green,C.green2],
    ['D','Ecological generalist','Prefer CC21 / CC45','Prefer a published misclassification.',C.red,C.red2]
  ];
  cards.forEach((d,i)=>{
    const x=0.67+i*3.10;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.52,w:2.72,h:4.15,rectRadius:0.08,fill:{color:d[5]},line:{color:d[4],width:1.1}});
    s.addShape(pptx.ShapeType.ellipse,{x:x+0.90,y:1.83,w:0.9,h:0.9,fill:{color:d[4]},line:{color:d[4]}});
    s.addText(d[0],{x:x+0.90,y:2.10,w:0.9,h:0.22,fontSize:20,bold:true,align:'center',color:C.white,margin:0});
    s.addText(d[1],{x:x+0.22,y:3.03,w:2.28,h:0.50,fontSize:16,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
    s.addText(d[2],{x:x+0.25,y:3.77,w:2.22,h:0.30,fontSize:11.5,bold:true,align:'center',color:d[4],margin:0,fit:'shrink'});
    s.addText(d[3],{x:x+0.28,y:4.45,w:2.16,h:0.70,fontSize:12.5,align:'center',color:C.muted,margin:0,fit:'shrink'});
  });
  s.addText('Exact PubMLST IDs are generated from the pinned S1 table — the teaching logic stays fixed.',{x:1.9,y:6.02,w:9.5,h:0.32,fontSize:16,bold:true,color:C.teal,align:'center',margin:0,fit:'shrink'});
}

// 6
{
  const s=pptx.addSlide('MASTER'); title(s,'PubMLST is two linked resources','PUBMLST');
  card(s,0.85,1.65,5.2,3.75,'1. Definitions / nomenclature','Allele definitions\nMLST profiles\nSequence types\nClonal complexes\nDefined cg/wgMLST schemes\n\nA shared language for bacterial variation.',C.teal2,C.teal);
  card(s,7.25,1.65,5.2,3.75,'2. Isolates / genomes','Assemblies\nHost/source metadata\nCountry and date\nStudy/project membership\nPhenotype/provenance fields\n\nContext for those lineage names.',C.purple2,C.purple);
  s.addShape(pptx.ShapeType.chevron,{x:6.27,y:2.80,w:0.68,h:1.28,fill:{color:C.amber},line:{color:C.amber}});
  s.addText('link',{x:6.22,y:3.27,w:0.72,h:0.20,fontSize:10,bold:true,align:'center',color:C.white,margin:0});
  s.addText('Definitions make typing portable; metadata makes typing epidemiologically useful.',{x:1.95,y:5.85,w:9.5,h:0.35,fontSize:17,bold:true,color:C.ink,align:'center',margin:0});
  source(s,'PubMLST / BIGSdb: https://pubmlst.org/organisms/campylobacter-jejunicoli');
}

// 7
{
  const s=pptx.addSlide('MASTER'); title(s,'MLST compresses a genome into a portable lineage name','7-LOCUS MLST');
  const genes=['aspA','glnA','gltA','glyA','pgm','tkt','uncA'];
  genes.forEach((g,i)=>{
    const x=0.72+i*1.22;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.75,w:1.0,h:0.62,rectRadius:0.04,fill:{color:i%2?C.blue2:C.teal2},line:{color:i%2?C.blue:C.teal,width:1}});
    s.addText(g,{x:x+0.08,y:1.96,w:0.84,h:0.20,fontSize:12,bold:true,align:'center',color:C.ink,margin:0});
    s.addShape(pptx.ShapeType.line,{x:x+0.5,y:2.40,w:0,h:0.60,line:{color:'AAB5B0',width:1.4,endArrowType:'triangle'}});
    s.addText('allele',{x:x+0.12,y:3.10,w:0.76,h:0.20,fontSize:9.5,align:'center',color:C.muted,margin:0});
  });
  s.addShape(pptx.ShapeType.line,{x:1.15,y:3.75,w:7.9,h:0,line:{color:'93A09B',width:2,endArrowType:'triangle'}});
  s.addShape(pptx.ShapeType.roundRect,{x:9.35,y:3.27,w:1.35,h:0.95,rectRadius:0.06,fill:{color:C.amber2},line:{color:C.amber,width:1.2}});
  s.addText('ST',{x:9.55,y:3.53,w:0.95,h:0.32,fontSize:22,bold:true,align:'center',color:C.amber,margin:0});
  s.addShape(pptx.ShapeType.line,{x:10.75,y:3.75,w:0.62,h:0,line:{color:'93A09B',width:2,endArrowType:'triangle'}});
  s.addShape(pptx.ShapeType.roundRect,{x:11.47,y:3.27,w:1.25,h:0.95,rectRadius:0.06,fill:{color:C.purple2},line:{color:C.purple,width:1.2}});
  s.addText('CC',{x:11.63,y:3.53,w:0.92,h:0.32,fontSize:22,bold:true,align:'center',color:C.purple,margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:1.45,y:5.12,w:10.5,h:0.78,rectRadius:0.06,fill:{color:C.red2},line:{color:'E2BBB8'}});
  s.addText('Seven loci are a name — not the whole genome. Same ST does not equal direct transmission.',{x:1.77,y:5.38,w:9.9,h:0.28,fontSize:17,bold:true,color:'7F3733',align:'center',margin:0});
}

// 8
{
  const s=pptx.addSlide('MASTER'); title(s,'Practical 1 — type A–D from whole-genome FASTA','25–45 MIN');
  card(s,0.80,1.55,3.65,3.85,'1. Sequence query','Upload `mystery_A.fasta`.\n\nChoose the C. jejuni/C. coli MLST scheme.\n\nRecord seven alleles, ST and CC.',C.teal2,C.teal);
  card(s,4.82,1.55,3.65,3.85,'2. Repeat B–D','Work in pairs if the network is limited.\n\nCompare results rather than everyone waiting for the same page.',C.blue2,C.blue);
  card(s,8.84,1.55,3.65,3.85,'3. Predict early','Before source metadata: which lineage *sounds* most source-specific?\n\nWrite a confidence level.',C.amber2,C.amber);
  s.addText('Do not reveal the original source labels yet.',{x:2.75,y:5.92,w:7.8,h:0.32,fontSize:18,bold:true,color:C.red,align:'center',margin:0});
}

// 9
{
  const s=pptx.addSlide('MASTER'); title(s,'The isolate collection turns a lineage name into an ecological hypothesis','METADATA CONTEXT');
  const sourceBoxes=[['Chicken',C.amber],['Cattle',C.teal],['Sheep',C.green],['Wild bird',C.purple],['Environment',C.blue]];
  sourceBoxes.forEach((d,i)=>{
    const x=0.70+i*2.42;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.75,w:2.05,h:0.72,rectRadius:0.05,fill:{color:d[1],transparency:78},line:{color:d[1],width:1.2}});
    s.addText(d[0],{x:x+0.14,y:1.99,w:1.77,h:0.22,fontSize:14,bold:true,align:'center',color:C.ink,margin:0});
  });
  s.addText('For each ST/CC ask:',{x:0.85,y:3.10,w:2.5,h:0.3,fontSize:17,bold:true,color:C.ink,margin:0});
  bullets(s,['Is one source overwhelmingly represented?','Are several host groups represented?','Is the lineage geographically broad?','Could study/submission bias explain the pattern?'],0.90,3.55,5.45,2.05,14.5,C.ink);
  card(s,7.10,3.10,5.25,2.55,'Sampling caveat','PubMLST is a curated collection of studies and submissions — not a random ecological survey.\n\nUse it to generate and contextualise hypotheses, not to treat raw source counts as prevalence.',C.red2,C.red);
}

// 10
{
  const s=pptx.addSlide('MASTER'); title(s,'Genome Comparator asks a higher-resolution question','GENOME-WIDE RELATEDNESS');
  const nodes=[['A',1.0,2.1,C.purple],['B',2.7,1.6,C.amber],['C',4.2,2.4,C.green],['D',6.0,1.9,C.red],['ref',8.2,1.5,C.teal],['ref',9.5,2.8,C.blue],['ref',11.0,1.9,C.purple]];
  const edges=[[1.55,2.45,1.2,-0.45],[3.25,2.05,0.95,0.58],[4.75,2.70,1.25,-0.45],[6.55,2.22,1.65,-0.55],[8.75,1.90,0.8,0.9],[10.05,2.85,0.95,-0.6]];
  edges.forEach(e=>s.addShape(pptx.ShapeType.line,{x:e[0],y:e[1],w:e[2],h:e[3],line:{color:'9BA7A3',width:2}}));
  nodes.forEach(n=>{
    s.addShape(pptx.ShapeType.ellipse,{x:n[1],y:n[2],w:0.80,h:0.80,fill:{color:n[3],transparency:15},line:{color:n[3],width:1.5}});
    s.addText(n[0],{x:n[1],y:n[2]+0.26,w:0.80,h:0.20,fontSize:12,bold:true,align:'center',color:C.white,margin:0});
  });
  card(s,0.85,4.25,3.7,1.45,'Question 1','Does genome-wide grouping agree with ST/CC?',C.white,C.teal);
  card(s,4.82,4.25,3.7,1.45,'Question 2','Does a “generalist” sit among several source groups?',C.white,C.red);
  card(s,8.79,4.25,3.7,1.45,'Question 3','Would any distance alone prove transmission direction?',C.white,C.purple);
  source(s,'BIGSdb Genome Comparator can compare uploaded FASTA/ZIP files using defined locus schemes and return distance/network outputs.');
}

// 11
{
  const s=pptx.addSlide('MASTER'); title(s,'Specialists are easier; generalists blur the source signal','THE BIOLOGICAL LIMIT');
  // specialist left
  s.addShape(pptx.ShapeType.ellipse,{x:0.9,y:1.7,w:3.0,h:3.0,fill:{color:C.purple2,transparency:20},line:{color:C.purple,width:2}});
  for (let i=0;i<7;i++) s.addShape(pptx.ShapeType.ellipse,{x:1.45+(i%3)*0.62,y:2.25+Math.floor(i/3)*0.62,w:0.34,h:0.34,fill:{color:C.purple},line:{color:C.purple}});
  s.addText('SPECIALIST',{x:1.35,y:4.95,w:2.1,h:0.3,fontSize:16,bold:true,align:'center',color:C.purple,margin:0});
  s.addText('One source class carries most of the lineage signal.',{x:0.95,y:5.38,w:3.0,h:0.58,fontSize:12.5,align:'center',color:C.muted,margin:0,fit:'shrink'});
  // generalist right venn
  s.addShape(pptx.ShapeType.ellipse,{x:5.25,y:1.55,w:3.2,h:3.2,fill:{color:C.amber2,transparency:35},line:{color:C.amber,width:1.5}});
  s.addShape(pptx.ShapeType.ellipse,{x:7.05,y:1.55,w:3.2,h:3.2,fill:{color:C.purple2,transparency:35},line:{color:C.purple,width:1.5}});
  s.addShape(pptx.ShapeType.ellipse,{x:8.85,y:1.55,w:3.2,h:3.2,fill:{color:C.teal2,transparency:35},line:{color:C.teal,width:1.5}});
  s.addText('chicken',{x:5.7,y:2.0,w:1.2,h:0.24,fontSize:12,bold:true,color:'70500D',align:'center',margin:0});
  s.addText('wild bird',{x:7.85,y:2.0,w:1.2,h:0.24,fontSize:12,bold:true,color:'493F70',align:'center',margin:0});
  s.addText('ruminant',{x:9.8,y:2.0,w:1.3,h:0.24,fontSize:12,bold:true,color:'0A5D56',align:'center',margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:7.75,y:3.1,w:1.7,h:0.78,rectRadius:0.06,fill:{color:C.white},line:{color:C.red,width:2}});
  s.addText('CC21 / CC45',{x:7.92,y:3.36,w:1.36,h:0.22,fontSize:14,bold:true,align:'center',color:C.red,margin:0});
  s.addText('GENERALIST',{x:7.42,y:4.95,w:2.45,h:0.30,fontSize:16,bold:true,align:'center',color:C.red,margin:0});
  s.addText('Host switching/shared gene pools reduce the clean source-specific signal.',{x:5.55,y:5.38,w:6.0,h:0.58,fontSize:12.5,align:'center',color:C.muted,margin:0,fit:'shrink'});
  source(s,'Arning et al.: increasing “generalist index” (number of source classes occupied by an ST) was associated with lower source-attribution accuracy.');
}

// 12
{
  const s=pptx.addSlide('MASTER'); title(s,'Practical 2 — turn relatedness into an ecological prediction','45–70 MIN');
  const qs=[['1','Search ST / CC','What source metadata are represented?'],['2','Label the lineage','specialist / biased / generalist / unclear'],['3','Run Genome Comparator','A–D + the small public reference panel'],['4','Make a prediction','source + confidence + one caveat']];
  qs.forEach((q,i)=>card(s,0.75+(i%2)*6.2,1.52+Math.floor(i/2)*2.15,5.72,1.72,`${q[0]}. ${q[1]}`,q[2],i%2?C.blue2:C.white,[C.teal,C.blue,C.purple,C.amber][i]));
  s.addShape(pptx.ShapeType.roundRect,{x:1.75,y:5.95,w:9.85,h:0.44,rectRadius:0.04,fill:{color:C.teal2},line:{color:'B8D8D2'}});
  s.addText('Predict first. Do not open the true source/model reveal yet.',{x:2.05,y:6.08,w:9.25,h:0.18,fontSize:15.5,bold:true,color:'0A5D56',align:'center',margin:0});
}

// 13
{
  const s=pptx.addSlide('MASTER'); title(s,'More genomic resolution improved attribution — but did not make it perfect','SOURCE ATTRIBUTION');
  const methods=[['iSource\nbenchmark',64,C.grey2],['ML on\nMLST',71,C.amber],['XGBoost\ncgMLST',85,C.teal],['k-mer\nWGS',78,C.purple]];
  methods.forEach((m,i)=>{
    const x=1.1+i*2.9;
    const h=3.1*(m[1]/100);
    s.addShape(pptx.ShapeType.roundRect,{x,y:5.05-h,w:1.25,h,rectRadius:0.05,fill:{color:m[2]},line:{color:m[2]}});
    s.addText(`${m[1]}%`,{x:x-0.05,y:4.67-h,w:1.35,h:0.28,fontSize:18,bold:true,align:'center',color:m[2]===C.grey2?C.ink:m[2],margin:0});
    s.addText(m[0],{x:x-0.35,y:5.22,w:1.95,h:0.62,fontSize:12,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
  });
  s.addShape(pptx.ShapeType.line,{x:0.8,y:5.05,w:11.8,h:0,line:{color:'ABB5B1',width:1.2}});
  card(s,9.35,1.43,3.1,1.63,'Why cgMLST?','1,343 loci capture much more host-associated variation than seven-locus MLST while retaining a portable gene-by-gene representation.',C.teal2,C.teal);
  card(s,9.35,3.33,3.1,1.63,'Why not 100%?','Source populations overlap biologically. Host switching and generalist lineages erase some source-specific signal.',C.red2,C.red);
  source(s,'Arning et al. 2021 abstract/results: ~64% standard benchmark, ~71% MLST, ~85% cgMLST, ~78% k-merised WGS top-line values.');
}

// 14
{
  const s=pptx.addSlide('MASTER'); title(s,'A model error can be a useful biological result','GENERALIST INDEX');
  const axesY=5.25;
  s.addShape(pptx.ShapeType.line,{x:1.4,y:1.65,w:0,h:3.6,line:{color:'7F8D88',width:1.4}});
  s.addShape(pptx.ShapeType.line,{x:1.4,y:axesY,w:6.0,h:0,line:{color:'7F8D88',width:1.4}});
  const pts=[[1,0.90],[1,0.84],[2,0.78],[2,0.72],[3,0.67],[3,0.59],[4,0.55],[4,0.48],[5,0.40]];
  pts.forEach((p,i)=>{
    const x=1.6+(p[0]-1)*1.35 + (i%2)*0.14;
    const y=5.0-(p[1]-0.35)*5.2;
    s.addShape(pptx.ShapeType.ellipse,{x,y,w:0.20,h:0.20,fill:{color:C.red},line:{color:C.red}});
  });
  s.addShape(pptx.ShapeType.line,{x:1.72,y:2.05,w:5.25,h:2.35,line:{color:C.red,width:2,dash:'dash'}});
  s.addText('higher accuracy',{x:0.26,y:1.58,w:1.0,h:0.28,fontSize:10.5,bold:true,color:C.muted,rotate:270,margin:0});
  [1,2,3,4,5].forEach((v,i)=>s.addText(String(v),{x:1.43+i*1.35,y:5.38,w:0.35,h:0.2,fontSize:10.5,color:C.muted,align:'center',margin:0}));
  s.addText('generalist index = number of source classes occupied by the ST',{x:1.65,y:5.78,w:5.7,h:0.28,fontSize:11.5,bold:true,color:C.ink,align:'center',margin:0,fit:'shrink'});
  card(s,8.05,1.60,4.1,1.55,'Mystery D','The setup script prefers a high-generalist-index record and, when possible, one the published model got wrong.',C.red2,C.red);
  card(s,8.05,3.45,4.1,1.55,'Discussion question','Is the “wrong” prediction telling us about a bad classifier — or about genuine overlap between host-associated gene pools?',C.amber2,C.amber);
  s.addText('58% of wild-bird isolates in the published dataset belonged to STs found only in that niche.',{x:7.95,y:5.55,w:4.3,h:0.55,fontSize:13.5,bold:true,color:C.purple,align:'center',margin:0,fit:'shrink'});
  source(s,'Conceptual trend only (points are illustrative). Published findings: higher generalist index reduced accuracy; 58% of wild-bird isolates were in niche-only STs.');
}

// 15
{
  const s=pptx.addSlide('MASTER'); title(s,'Practical 3 — predict first, then reveal the published labels','70–95 MIN');
  const prompts=[['SOURCE','chicken / cattle / sheep / wild bird / environment'],['CONFIDENCE','low / medium / high'],['EVIDENCE','ST, CC, metadata, genome-wide context'],['FAILURE MODE','what could make this inference wrong?']];
  prompts.forEach((d,i)=>card(s,0.78+i*3.06,1.60,2.68,2.12,d[0],d[1],i%2?C.blue2:C.white,[C.purple,C.teal,C.amber,C.red][i]));
  s.addShape(pptx.ShapeType.roundRect,{x:1.35,y:4.32,w:10.6,h:1.42,rectRadius:0.08,fill:{color:C.purple2},line:{color:'C8BDDF'}});
  s.addText('Then open  data/generated/source_attribution_reveal.tsv',{x:1.70,y:4.62,w:9.9,h:0.28,fontSize:19,bold:true,color:'493F70',align:'center',margin:0});
  s.addText('Compare your source call with the true label, the published model prediction and the generalist index.',{x:1.68,y:5.10,w:9.9,h:0.32,fontSize:14.5,color:C.ink,align:'center',margin:0,fit:'shrink'});
  s.addText('The interesting question is WHY the easy and hard cases differ.',{x:2.35,y:6.05,w:8.65,h:0.28,fontSize:17,bold:true,color:C.teal,align:'center',margin:0});
}

// 16
{
  const s=pptx.addSlide('MASTER'); title(s,'Dataset 2 — now apply the logic to real wild-bird AMR','MOURKAS ET AL. 2024');
  bigNumber(s,'700','C. jejuni genomes',0.80,1.45,2.25,C.teal);
  bigNumber(s,'30','bird species',3.05,1.45,1.85,C.purple);
  bigNumber(s,'8','countries',4.90,1.45,1.55,C.blue);
  bigNumber(s,'~3×','genotypes + AMR genes\nin urban-associated birds',6.50,1.45,3.0,C.red);
  s.addText('Public assemblies',{x:9.95,y:1.52,w:2.25,h:0.25,fontSize:12,bold:true,color:C.muted,align:'center',margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:9.75,y:1.93,w:2.65,h:1.05,rectRadius:0.06,fill:{color:C.green2},line:{color:C.green,width:1.2}});
  s.addText('Figshare\n23631495',{x:10.05,y:2.18,w:2.05,h:0.52,fontSize:18,bold:true,color:C.green,align:'center',margin:0});
  // ecology gradient
  s.addText('Rural',{x:1.02,y:4.02,w:1.2,h:0.25,fontSize:14,bold:true,color:C.green,align:'center',margin:0});
  s.addText('Transitional',{x:5.72,y:4.02,w:1.6,h:0.25,fontSize:14,bold:true,color:C.amber,align:'center',margin:0});
  s.addText('Urban',{x:10.82,y:4.02,w:1.2,h:0.25,fontSize:14,bold:true,color:C.red,align:'center',margin:0});
  s.addShape(pptx.ShapeType.line,{x:1.55,y:4.65,w:10.0,h:0,line:{color:'94A09B',width:5,beginArrowType:'none',endArrowType:'triangle'}});
  [2.1,3.0,4.0,5.2,6.5,7.8,9.2,10.4].forEach((x,i)=>{
    const col=i<3?C.green:(i<6?C.amber:C.red);
    s.addShape(pptx.ShapeType.ellipse,{x,y:4.46-(i%2)*0.42,w:0.38,h:0.38,fill:{color:col},line:{color:col}});
  });
  s.addText('The key result is ecological association, not a claim that “wild birds cause AMR”.',{x:1.75,y:5.58,w:9.9,h:0.42,fontSize:18,bold:true,color:C.ink,align:'center',margin:0,fit:'shrink'});
  source(s,'Mourkas et al. Current Biology 2024, doi:10.1016/j.cub.2024.07.059; public assemblies doi:10.6084/m9.figshare.23631495.');
}

// 17
{
  const s=pptx.addSlide('MASTER'); title(s,'Practical 4 — what pattern would distinguish strain movement from gene movement?','95–112 MIN');
  card(s,0.72,1.55,3.82,3.65,'1. Resistant strain moves','Same/very close genomic background carries the determinant across hosts or locations.\n\nLook for genome-wide relatedness + shared AMR context.',C.red2,C.red);
  card(s,4.78,1.55,3.82,3.65,'2. Resistance gene moves','Same determinant/mobile element appears in unrelated genomic backgrounds.\n\nLong reads and plasmid/genetic context become critical.',C.purple2,C.purple);
  card(s,8.84,1.55,3.82,3.65,'3. Repeated selection/exposure','Different lineages independently acquire/select resistance under similar ecological pressures.\n\nNeeds exposure + temporal/ecological data.',C.amber2,C.amber);
  s.addText('Choose three extra datasets that would most cleanly separate these explanations.',{x:1.55,y:5.68,w:10.25,h:0.32,fontSize:17,bold:true,color:C.teal,align:'center',margin:0});
  pill(s,'long reads',2.10,6.18,1.45,C.teal2,'0A5D56');
  pill(s,'water / sewage',3.77,6.18,1.65,C.blue2,'345F78');
  pill(s,'livestock',5.65,6.18,1.30,C.amber2,'68480E');
  pill(s,'time series',7.18,6.18,1.40,C.purple2,'493F70');
  pill(s,'movement ecology',8.82,6.18,1.85,C.green2,'315D3A');
}

// 18
{
  const s=pptx.addSlide('MASTER'); title(s,'Finish with the strength of the inference, not the name of the software','TAKE-HOME');
  const stages=[['IDENTITY','What is it?',C.teal],['RELATEDNESS','What is it close to?',C.blue],['ASSOCIATION','Which ecology/source does it resemble?',C.purple],['HYPOTHESIS','What transmission process could explain it?',C.amber]];
  stages.forEach((d,i)=>{
    const x=0.65+i*3.12;
    s.addShape(pptx.ShapeType.roundRect,{x,y:1.62,w:2.7,h:1.25,rectRadius:0.06,fill:{color:d[2],transparency:80},line:{color:d[2],width:1.4}});
    s.addText(d[0],{x:x+0.18,y:1.86,w:2.34,h:0.25,fontSize:13,bold:true,align:'center',color:d[2],margin:0});
    s.addText(d[1],{x:x+0.18,y:2.25,w:2.34,h:0.30,fontSize:15,bold:true,align:'center',color:C.ink,margin:0,fit:'shrink'});
    if(i<3) s.addShape(pptx.ShapeType.line,{x:x+2.72,y:2.25,w:0.38,h:0,line:{color:'98A49F',width:2,endArrowType:'triangle'}});
  });
  s.addShape(pptx.ShapeType.roundRect,{x:1.25,y:3.55,w:10.85,h:1.55,rectRadius:0.08,fill:{color:C.white},line:{color:C.grey2}});
  s.addText('A good answer sounds like:',{x:1.62,y:3.85,w:2.6,h:0.28,fontSize:15,bold:true,color:C.muted,margin:0});
  s.addText('“This genome is most consistent with ___, with ___ confidence, because ___.\nIt supports ___, but it does not demonstrate ___.”',{x:3.85,y:3.76,w:7.70,h:0.75,fontSize:20,bold:true,color:C.ink,margin:0,fit:'shrink'});
  s.addText('Genomes sharpen hypotheses. Ecology, metadata and sampling design decide how far we can trust them.',{x:1.55,y:5.70,w:10.3,h:0.45,fontSize:20,bold:true,color:C.teal,align:'center',margin:0,fit:'shrink'});
}

const out = path.join(__dirname, 'wild-bird-amr-workshop-public.pptx');
pptx.writeFile({ fileName: out });
console.log(out);
