import { jsPDF } from 'jspdf';

export function generateKasiramResumePdf(): void {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // ~210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // ~297mm
  const margin = 15;
  const contentWidth = pageWidth - margin * 2; // ~180mm

  let currentY = 12;

  // Helper function to draw top header block
  const drawPageHeader = (pageNumber: number, totalPages: number) => {
    // Header container border / box
    doc.setDrawColor(30, 30, 60);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, 10, contentWidth, 18, 'F');
    
    // Left Box - Name
    doc.setFillColor(245, 247, 250);
    doc.rect(margin, 10, contentWidth * 0.55, 12, 'F');
    doc.setDrawColor(80, 80, 120);
    doc.rect(margin, 10, contentWidth * 0.55, 12, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(20, 35, 75);
    doc.text('KASIRAM P', margin + 4, 18);

    // Right Box - Engineer (Dark Blue/Purple)
    doc.setFillColor(85, 95, 155);
    doc.rect(margin + contentWidth * 0.55, 10, contentWidth * 0.45, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text('Engineer', margin + contentWidth - 4, 18, { align: 'right' });

    // Bottom banner - Aspire Systems India Private Limited
    doc.setFillColor(45, 35, 75);
    doc.rect(margin, 22, contentWidth * 0.55, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Aspire Systems India Private Limited', margin + 4, 26);

    doc.setFillColor(35, 25, 65);
    doc.rect(margin + contentWidth * 0.55, 22, contentWidth * 0.45, 6, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('www.aspiresys.com', margin + contentWidth - 4, 26, { align: 'right' });

    // Footer
    const footerY = pageHeight - 12;
    doc.setFillColor(45, 35, 75);
    doc.rect(margin, footerY, contentWidth * 0.55, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Attention. Always.', margin + 4, footerY + 4);

    doc.setFillColor(35, 25, 65);
    doc.rect(margin + contentWidth * 0.55, footerY, contentWidth * 0.45, 6, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Page ${pageNumber} of ${totalPages}`, margin + contentWidth - 4, footerY + 4, { align: 'right' });
  };

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 35;
      return true;
    }
    return false;
  };

  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(20, 50, 110);
    doc.text(title, margin, currentY);
    currentY += 2;
    doc.setDrawColor(180, 190, 210);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, margin + contentWidth, currentY);
    currentY += 6;
  };

  const addBulletPoint = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);

    const splitText = doc.splitTextToSize(text, contentWidth - 8);
    checkPageBreak(splitText.length * 4.5 + 2);

    doc.text('•', margin + 2, currentY);
    doc.text(splitText, margin + 7, currentY);
    currentY += splitText.length * 4.5 + 1.5;
  };

  const addKeyValue = (key: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    
    const keyWidth = 48;
    const splitVal = doc.splitTextToSize(value, contentWidth - keyWidth - 5);
    checkPageBreak(splitVal.length * 4.5 + 1.5);

    doc.text(`${key}`, margin + 2, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(`:  ${splitVal[0]}`, margin + keyWidth, currentY);

    if (splitVal.length > 1) {
      for (let i = 1; i < splitVal.length; i++) {
        currentY += 4.5;
        doc.text(splitVal[i], margin + keyWidth + 3, currentY);
      }
    }
    currentY += 5;
  };

  // --- START BUILDING PAGE CONTENT ---
  currentY = 35;

  // 1. Summary Section
  addSectionTitle('Summary');
  const summaryBullets = [
    '1.3 years of experience in software development',
    'Knowledge and experience in JAVA, Spring Boot, MySQL',
    'Knowledge and experience in Swagger',
    'Experience of working in unit testing frameworks like Junit',
    'Experience in Agile SDLC',
    'Experience of working in web API development life cycle involving development, testing',
    'Experience of working in Microservices',
    'Experience in using Jira for task tracking, bug tracking, manage user stories',
    'Experience in using Git and Bitbucket for version control and codebase management',
    'Experience in working on client-based projects, involving development',
    'Worked with Angular for basic bug fixing and gained knowledge in connecting the front end with RESTful back-end APIs, including implementing client-side validations',
    'Experience working in Codespell.ai prompting methods.',
  ];
  summaryBullets.forEach(bullet => addBulletPoint(bullet));

  currentY += 4;

  // 2. Education Section
  addSectionTitle('Education');
  addBulletPoint('B.E - Electronics and Communication Engineering (passed out – 2023)');

  currentY += 4;

  // 3. Technical Skills Section
  addSectionTitle('Technical Skills');
  addKeyValue('Frameworks', 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA');
  addKeyValue('Tools', 'Visual Studio IDE, Postman, IntelliJ IDEA, Eclipse');
  addKeyValue('Programming Languages', 'Java, SQL');
  addKeyValue('Microservices', 'Design and development using Spring Cloud, Eureka, API Gateway');
  addKeyValue('Unit testing', 'JUnit, Mockito, Jasmine');
  addKeyValue('Messaging & Streaming', 'Kafka');
  addKeyValue('Operating Systems', 'Windows Family');
  addKeyValue('Versioning Tool', 'GitHub, Bitbucket');

  currentY += 4;

  // 4. Projects Section
  addSectionTitle('Projects');

  // Project 1
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 50, 110);
  doc.text('1. Pricing management', margin + 2, currentY);
  currentY += 6;

  addKeyValue('Role', 'Software Engineer');
  addKeyValue('Technology', 'JAVA, Spring Boot, SQL, Angular');
  addKeyValue('Tracking Tools', 'JIRA');
  addKeyValue('Duration', '5 Months');

  currentY += 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Project Description:', margin + 2, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p1Desc = 'CRST, a transportation company, initiated a modernization project to upgrade its legacy software system for High-Value Products (HVP) within the Specialized Solutions division. The goal was to enhance operational efficiency, improve functionality, and stay competitive in the modern digital landscape by integrating the HVP service into the existing Order Central platform through a complete system modernization.';
  const splitP1 = doc.splitTextToSize(p1Desc, contentWidth - 8);
  checkPageBreak(splitP1.length * 4.5);
  doc.text(splitP1, margin + 4, currentY);
  currentY += splitP1.length * 4.5 + 3;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Responsibilities:', margin + 2, currentY);
  currentY += 5;

  const p1Resp = [
    'Contributed to user story development and implemented logic in both the UI and backend.',
    'Fixed Angular bugs and improved UI responsiveness',
    'Wrote unit test cases for both Angular and Java modules to ensure code quality.',
    'Actively participated in requirement gathering and feasibility analysis to ensure a clear understanding of project goals.'
  ];
  p1Resp.forEach(r => addBulletPoint(r));

  currentY += 6;

  // Project 2
  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 50, 110);
  doc.text('2. ROSS POC', margin + 2, currentY);
  currentY += 6;

  addKeyValue('Role', 'Engineer');
  addKeyValue('Technology', 'JAVA, Spring Boot, sql, codespell, ADF(Basic)');
  addKeyValue('Duration', '2 Months');

  currentY += 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Project Description:', margin + 2, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p2Desc = 'Worked on a Proof of Concept (POC) to modernize a 19-year-old Oracle ADF application. Analyzed the existing codebase and created a working prototype to convert the application into a Spring Boot–based architecture. Utilized CodeSpell to assist in understanding and transforming the legacy code, ensuring the feasibility of migrating the old system to a modern Java framework.';
  const splitP2 = doc.splitTextToSize(p2Desc, contentWidth - 8);
  checkPageBreak(splitP2.length * 4.5);
  doc.text(splitP2, margin + 4, currentY);
  currentY += splitP2.length * 4.5 + 3;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Responsibilities:', margin + 2, currentY);
  currentY += 5;

  const p2Resp = [
    'Analyzed the legacy Oracle ADF codebase to understand the existing application workflow and business logic.',
    'Designed and developed a Spring Boot POC to demonstrate the migration feasibility from Oracle ADF.',
    'Converted selected modules from the legacy system into REST-based Spring Boot services.',
    'Worked with SQL queries and database schema to replicate existing data operations.',
    'Used CodeSpell to analyze and interpret legacy code for faster migration.',
    'Tested and validated the POC to ensure the converted functionality matched the original application behavior.'
  ];
  p2Resp.forEach(r => addBulletPoint(r));

  // Loop through all generated pages and draw headers and footers
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    drawPageHeader(page, totalPages);
  }

  // Save the PDF
  doc.save('Kasiram_P_Resume.pdf');
}
