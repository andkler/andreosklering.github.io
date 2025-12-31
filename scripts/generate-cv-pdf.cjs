const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const cvHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thiago Charão - CV</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1a1a1a;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 15mm 18mm;
      background: white;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #0ea5e9;
    }
    
    .header-left h1 {
      font-size: 24pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    
    .header-left .title {
      font-size: 12pt;
      font-weight: 500;
      color: #0ea5e9;
      margin-bottom: 8px;
    }
    
    .header-left .tagline {
      font-size: 9pt;
      color: #64748b;
      max-width: 350px;
    }
    
    .header-right {
      text-align: right;
      font-size: 9pt;
      color: #475569;
    }
    
    .header-right a {
      color: #0ea5e9;
      text-decoration: none;
    }
    
    .header-right div {
      margin-bottom: 3px;
    }
    
    /* Key Metrics */
    .metrics {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      padding: 12px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 8px;
      border-left: 3px solid #0ea5e9;
    }
    
    .metric {
      flex: 1;
      text-align: center;
      padding: 8px;
    }
    
    .metric-value {
      font-size: 16pt;
      font-weight: 700;
      color: #0ea5e9;
    }
    
    .metric-label {
      font-size: 8pt;
      color: #64748b;
      margin-top: 2px;
    }
    
    /* Sections */
    .section {
      margin-bottom: 18px;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Experience */
    .job {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: #1e293b;
    }
    
    .job-date {
      font-size: 9pt;
      color: #64748b;
      font-weight: 500;
    }
    
    .job-company {
      font-size: 9pt;
      color: #0ea5e9;
      font-weight: 500;
      margin-bottom: 6px;
    }
    
    .job-achievements {
      list-style: none;
      padding-left: 0;
    }
    
    .job-achievements li {
      font-size: 9pt;
      color: #475569;
      margin-bottom: 3px;
      padding-left: 14px;
      position: relative;
    }
    
    .job-achievements li::before {
      content: "→";
      position: absolute;
      left: 0;
      color: #0ea5e9;
    }
    
    /* Skills */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .skill-tag {
      font-size: 8pt;
      padding: 4px 10px;
      background: #f1f5f9;
      color: #475569;
      border-radius: 4px;
    }
    
    /* Education */
    .edu-item {
      margin-bottom: 8px;
    }
    
    .edu-title {
      font-size: 9pt;
      font-weight: 600;
      color: #1e293b;
    }
    
    .edu-institution {
      font-size: 9pt;
      color: #64748b;
    }
    
    /* Two columns for bottom sections */
    .two-cols {
      display: flex;
      gap: 20px;
    }
    
    .two-cols .col {
      flex: 1;
    }
    
    /* Footer */
    .footer {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #94a3b8;
      text-align: center;
    }
    
    .footer a {
      color: #0ea5e9;
      text-decoration: none;
    }
    
    /* Page break helper */
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>Thiago Charão</h1>
        <div class="title">Director of Architecture</div>
        <div class="tagline">
          Technology leader driving measurable outcomes through platform architecture, 
          AI enablement, and engineering excellence. Strong convictions, loosely held. 
          Receipts over rhetoric.
        </div>
      </div>
      <div class="header-right">
        <div>📧 thiago@charao.dev</div>
        <div>🔗 <a href="https://linkedin.com/in/charao">linkedin.com/in/charao</a></div>
        <div>🌐 <a href="https://charao.dev">charao.dev</a></div>
        <div>📍 Porto, Portugal</div>
      </div>
    </div>
    
    <!-- Key Metrics -->
    <div class="metrics">
      <div class="metric">
        <div class="metric-value">20+</div>
        <div class="metric-label">Years Experience</div>
      </div>
      <div class="metric">
        <div class="metric-value">~300</div>
        <div class="metric-label">Engineers AI-enabled</div>
      </div>
      <div class="metric">
        <div class="metric-value">~20%</div>
        <div class="metric-label">Productivity Uplift</div>
      </div>
      <div class="metric">
        <div class="metric-value">60K+</div>
        <div class="metric-label">MAU Identity Platform</div>
      </div>
      <div class="metric">
        <div class="metric-value">50+</div>
        <div class="metric-label">Reviews/Year</div>
      </div>
    </div>
    
    <!-- Experience -->
    <div class="section">
      <div class="section-title">Experience</div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Director of Architecture</div>
          <div class="job-date">Apr 2025 – Present</div>
        </div>
        <div class="job-company">Planet · Porto, Portugal</div>
        <ul class="job-achievements">
          <li>Own architecture direction across platform, identity, and cross-cutting capabilities</li>
          <li>Led AI enablement for ~300 engineers → ~20% measured productivity uplift</li>
          <li>Drove enterprise identity consolidation at 60K+ MAU scale (Auth0)</li>
          <li>Established architecture forums, standards, and decision records</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Software Engineering Manager</div>
          <div class="job-date">Apr 2024 – Apr 2025</div>
        </div>
        <div class="job-company">Planet · Porto, Portugal</div>
        <ul class="job-achievements">
          <li>Led strategic architecture initiatives aligning platform evolution with growth goals</li>
          <li>Set technical roadmaps and improved cross-team execution</li>
          <li>Mentored engineers and raised quality standards</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Software Engineer</div>
          <div class="job-date">May 2021 – Apr 2024</div>
        </div>
        <div class="job-company">Planet · Porto, Portugal</div>
        <ul class="job-achievements">
          <li>Built high-throughput APIs and event-driven services on AWS (Java/Spring, .NET)</li>
          <li>Improved reliability through observability practices and resilient designs</li>
          <li>Automated CI/CD and containerised workloads</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Software Engineer</div>
          <div class="job-date">Mar 2020 – May 2021</div>
        </div>
        <div class="job-company">Basecone · Porto, Portugal</div>
        <ul class="job-achievements">
          <li>Improved document-processing workflows (OCR pipelines) for accounting platform</li>
          <li>Built serverless services with .NET + AWS Lambda</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Lead Technical Consultant</div>
          <div class="job-date">Dec 2018 – Mar 2020</div>
        </div>
        <div class="job-company">Farfetch · Porto, Portugal</div>
        <ul class="job-achievements">
          <li>Delivered mission-critical logistics/shipping services in .NET Core</li>
          <li>Worked with graph databases and distributed systems</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Development Consultant</div>
          <div class="job-date">Jul 2017 – Nov 2018</div>
        </div>
        <div class="job-company">ThoughtWorks · Porto Alegre, Brazil</div>
        <ul class="job-achievements">
          <li>Large-scale retail initiatives (credit card + loyalty programs)</li>
          <li>Agile delivery in highly collaborative environment</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Software Engineer</div>
          <div class="job-date">Jun 2016 – Jul 2017</div>
        </div>
        <div class="job-company">Azion Technologies · Porto Alegre, Brazil</div>
        <ul class="job-achievements">
          <li>Platform capabilities in R&D environment; REST APIs with Python/Django</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Co-founder & Technical Consultant</div>
          <div class="job-date">Aug 2014 – Jun 2016</div>
        </div>
        <div class="job-company">Independent · Brazil / Ireland</div>
        <ul class="job-achievements">
          <li>Full-stack web and mobile solutions (Xamarin/C#, Azure)</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Senior Consultant / Technical Lead</div>
          <div class="job-date">Dec 2007 – Jul 2014</div>
        </div>
        <div class="job-company">CWI Software · Porto Alegre, Brazil</div>
        <ul class="job-achievements">
          <li>Technical lead across multiple enterprise projects</li>
          <li>Delivery across .NET, Java, SQL Server, Oracle, and mobile</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Software Developer</div>
          <div class="job-date">Apr 2007 – Dec 2007</div>
        </div>
        <div class="job-company">Drogaria Mais Econômica · Canoas, Brazil</div>
        <ul class="job-achievements">
          <li>Built work-order system for retail maintenance; reporting and operations support</li>
        </ul>
      </div>
      
      <div class="job">
        <div class="job-header">
          <div class="job-title">Software Developer</div>
          <div class="job-date">Jul 2005 – Feb 2007</div>
        </div>
        <div class="job-company">Grupo Telecon Sistemas · Canoas, Brazil</div>
        <ul class="job-achievements">
          <li>POS solutions and database work for small retailers</li>
        </ul>
      </div>
    </div>
    
    <!-- Two column layout for bottom -->
    <div class="two-cols">
      <div class="col">
        <div class="section">
          <div class="section-title">Core Strengths</div>
          <div class="skills-grid">
            <span class="skill-tag">Architecture Leadership</span>
            <span class="skill-tag">Platform Engineering</span>
            <span class="skill-tag">AI Enablement</span>
            <span class="skill-tag">Identity (Auth0)</span>
            <span class="skill-tag">AWS / Kubernetes</span>
            <span class="skill-tag">Engineering Standards</span>
            <span class="skill-tag">Stakeholder Alignment</span>
            <span class="skill-tag">Technical Strategy</span>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Languages</div>
          <div class="skills-grid">
            <span class="skill-tag">Portuguese (Native)</span>
            <span class="skill-tag">English (Fluent)</span>
            <span class="skill-tag">Italian (Elementary)</span>
          </div>
        </div>
      </div>
      
      <div class="col">
        <div class="section">
          <div class="section-title">Education & Certifications</div>
          
          <div class="edu-item">
            <div class="edu-title">Technology Leadership Certificate</div>
            <div class="edu-institution">Cornell University</div>
          </div>
          
          <div class="edu-item">
            <div class="edu-title">Applied Mathematics (coursework)</div>
            <div class="edu-institution">UFRGS, Brazil · 2009–2010</div>
          </div>
          
          <div class="edu-item">
            <div class="edu-title">Computer Science (coursework)</div>
            <div class="edu-institution">Unilasalle, Brazil · 2011–2012</div>
          </div>
          
          <div class="edu-item">
            <div class="edu-title">Microsoft Certified Professional</div>
            <div class="edu-institution">Software Development</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      Full metrics methodology at <a href="https://charao.dev/proof-method">charao.dev/proof-method</a> · 
      Generated from <a href="https://charao.dev">charao.dev</a>
    </div>
  </div>
</body>
</html>
`;

async function generatePDF() {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setContent(cvHTML, { waitUntil: 'networkidle0' });
  
  const pdfPath = path.join(__dirname, '..', 'public', 'cv', 'thiago-charao-cv.pdf');
  
  // Ensure directory exists
  const dir = path.dirname(pdfPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });
  
  console.log(`✅ CV PDF generated: ${pdfPath}`);
  
  await browser.close();
}

generatePDF().catch(console.error);
