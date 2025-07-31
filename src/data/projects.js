
export const projects = [
  {
    title: 'Security Incident & Assessment Report',
    description:
      'Investigated a web-based malware incident involving HTTP traffic. Used tcpdump to analyze redirection patterns and identify a malicious file disguised as a browser update.',
    pdf: '/pdf-viewer?src=/projects/security-incident-assessment-report.pdf',
    tags: ['security', 'incident', 'malware', 'network', 'analysis']
  },
  {
    title: 'Risk Register',
    description:
      'Conducted a risk assessment for a coastal bank with on-premise and remote employees. Evaluated key assets including funds, user databases, and financial records.',
    pdf: '/pdf-viewer?src=/projects/risk-register.pdf',
    tags: ['risk', 'assessment', 'security', 'bank', 'compliance']
  },
  {
    title: 'Scope, Goals, & Risk Assessment Report',
    description:
      'Conducted a comprehensive security audit of Botium Toys, reviewing assets, internal systems, and compliance practices.',
    pdf: '/pdf-viewer?src=/projects/cybersecurity-incident-report.pdf',
    tags: ['security', 'audit', 'compliance', 'risk', 'assessment']
  },
  {
    title: 'Incident Report Network Traffic Analysis',
    description:
      'Analyzed a network disruption caused by a SYN flood attack targeting a web server. Identified excessive TCP SYN requests overwhelming the server.',
    pdf: '/pdf-viewer?src=/projects/incident-report-network-analysis.pdf',
    tags: ['network', 'incident', 'syn-flood', 'ddos', 'analysis']
  },
  {
    title: 'Incident Report Analysis',
    description:
      'Responded to a simulated DDoS attack caused by an ICMP flood. Documented mitigation steps and mapped actions to the NIST Cybersecurity Framework.',
    pdf: '/pdf-viewer?src=/projects/cybersecurity-incident-analysis.pdf',
    tags: ['ddos', 'incident', 'icmp', 'mitigation', 'nist']
  },
  {
    title: 'Home Asset Inventory',
    description:
      'Created an asset inventory for home network devices, assessing ownership, sensitivity, and access designations.',
    pdf: '/pdf-viewer?src=/projects/home-asset-inventory.pdf',
    tags: ['inventory', 'network', 'assets', 'security']
  },
  {
    title: 'File Permissions in Linux',
    description:
      'Audited and adjusted file and directory permissions to align with team access requirements.',
    pdf: '/pdf-viewer?src=/projects/file-permissions-linux.pdf',
    tags: ['linux', 'permissions', 'security', 'access-control']
  },
  {
    title: 'Data Leak Worksheet',
    description:
      'Investigated a data leak tied to excessive access and recommended role-based restrictions.',
    pdf: '/pdf-viewer?src=/projects/data-leak-worksheet.pdf',
    tags: ['data-leak', 'security', 'access-control', 'audit']
  },
  {
    title: 'Apply Filters to SQL Queries',
    description:
      'Used SQL with filters to perform security tasks like identifying unauthorized access attempts.',
    pdf: '/pdf-viewer?src=/projects/apply-filter-SQL-queries.pdf',
    tags: ['sql', 'security', 'database', 'filters']
  },
  {
    title: 'Algorithm for File Updates in Python',
    description:
      'Python script that auto-updates an IP allow-list by removing addresses found in a deny-list.',
    pdf: '/pdf-viewer?src=/projects/algorithm-file-updates-python.pdf',
    tags: ['python', 'automation', 'security', 'scripting']
  },
  {
    title: 'TOTP Authenticator App',
    description:
      'A Flutter-based TOTP authenticator app with secure PIN protection, QR code support, and countdown timers.',
    pdf: '',
    tags: ['flutter', 'totp', 'authentication', 'security', 'mobile']
  },
  // Add showOnSite: true if you want to be explicit or leave it out (defaults to visible)
  {
    title: 'Chatbot & Database Integration',
    description: 'Built a Node.js backend with PostgreSQL to power a chatbot that answers questions about my portfolio projects. The chatbot syncs data automatically from shared project files.',
    pdf: '', // Optional: leave blank or link to docs
    tags: ['backend', 'nodejs', 'postgresql', 'chatbot', 'automation'],
    showOnSite: false,
  },
  {
    title: 'PostgreSQL Database Setup',
    description: 'Designed the PostgreSQL schema and automated data syncing with Node.js scripts to ensure up-to-date chatbot knowledge.',
    pdf: '',
    tags: ['database', 'postgresql', 'schema', 'automation', 'backend'],
    showOnSite: false
  },
  {
    title: 'Programming Languages & Scripting',
    description: 'Experienced in JavaScript, Python, Java, C++, Dart, SQL, Bash, PowerShell, and HTML, applied across web development, automation, and systems scripting.',
    pdf: '',
    tags: ['skills', 'programming', 'languages'],
    showOnSite: false
  },
  {
    title: 'JavaScript',
    description: 'Used extensively for frontend development with Astro and Node.js backend scripting.',
    pdf: '',
    tags: ['programming', 'javascript'],
    showOnSite: false
  },
  {
    title: 'Python',
    description: 'Used for scripting, data analysis, and automation tasks.',
    pdf: '',
    tags: ['programming', 'python'],
    showOnSite: false
  },
  {
    title: 'Java',
    description: 'Applied in various application developments including Android apps and backend services.',
    pdf: '',
    tags: ['programming', 'java'],
    showOnSite: false
  },
  {
    title: 'C++',
    description: 'Experience with C++ focusing on systems programming, memory management, and performance optimization.',
    pdf: '',
    tags: ['programming', 'c++'],
    showOnSite: false
  },
  {
    title: 'Dart',
    description: 'Used Dart extensively for Flutter app development, including building a billiard aim helper overlay tool with advanced line guidance and reflections.',
    pdf: '',
    tags: ['programming', 'dart', 'flutter'],
    showOnSite: false
  },
  {
    title: 'C',
    description: 'Experience programming in C for systems-level tasks and foundational understanding of memory management and performance optimization.',
    pdf: '',
    tags: ['programming', 'c'],
    showOnSite: false
  },
  {
    title: 'SQL',
    description: 'Skilled in SQL for database design, query optimization, and data management with PostgreSQL.',
    pdf: '',
    tags: ['programming', 'sql'],
    showOnSite: false
  },
  {
    title: 'Bash',
    description: 'Utilized Bash scripting for automation, system administration, and deployment tasks in Unix-like environments.',
    pdf: '',
    tags: ['programming', 'bash', 'scripting'],
    showOnSite: false
  },
  {
    title: 'PowerShell',
    description: 'Experienced with PowerShell scripting for Windows system automation and configuration management.',
    pdf: '',
    tags: ['programming', 'powershell', 'scripting'],
    showOnSite: false
  },
  {
    title: 'HTML',
    description: 'Proficient in HTML for structuring web content and creating accessible, semantic markup in frontend projects.',
    pdf: '',
    tags: ['programming', 'html', 'frontend'],
    showOnSite: false
  }
];
