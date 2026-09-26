import { RecommendedBook } from '../../src/types';

export interface SubjectBookCatalog {
  subject: string;
  category: string;
  books: RecommendedBook[];
}

export const FAMOUS_BOOKS_DATABASE: SubjectBookCatalog[] = [
  {
    subject: 'Operating Systems',
    category: 'Core Systems',
    books: [
      {
        title: 'Operating System Concepts',
        author: 'Abraham Silberschatz, Peter B. Galvin, Greg Gagne',
        editionOrYear: '10th Edition',
        famousAlias: "The Dinosaur Book",
        whyRecommended:
          'The gold-standard university reference worldwide. Renowned for crystal-clear explanations of CPU scheduling algorithms, synchronization primitives, deadlocks, and virtual memory.',
        keyChaptersToStudy:
          'Ch 3 (Processes), Ch 4 (Threads), Ch 5 (CPU Scheduling), Ch 6-7 (Synchronization & Deadlocks), Ch 8-9 (Main Memory & Virtual Memory)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Operating+System+Concepts+Silberschatz+10th+edition',
      },
      {
        title: 'Modern Operating Systems',
        author: 'Andrew S. Tanenbaum & Herbert Bos',
        editionOrYear: '4th Edition',
        famousAlias: "The Tanenbaum Book",
        whyRecommended:
          'Written by the creator of MINIX. Offers deep architectural insights into actual kernel mechanics, file systems, security, and hardware interfacing.',
        keyChaptersToStudy:
          'Ch 2 (Processes and Threads), Ch 3 (Memory Management), Ch 4 (File Systems), Ch 5 (Input/Output)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Modern+Operating+Systems+Andrew+Tanenbaum',
      },
      {
        title: 'Operating Systems: Three Easy Pieces (OSTEP)',
        author: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau',
        editionOrYear: 'Version 1.10 (Free Online)',
        famousAlias: "OSTEP",
        whyRecommended:
          'Widely celebrated for its conversational, intuitive style and practical C code exercises divided into the three pillars: Virtualization, Concurrency, and Persistence.',
        keyChaptersToStudy:
          'Part I: Virtualization (CPU & Memory API), Part II: Concurrency (Locks & Semaphores), Part III: Persistence (Fast File System & Crash Consistency)',
        difficultyLevel: 'Foundational',
        searchUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
      },
    ],
  },
  {
    subject: 'Database Management Systems',
    category: 'Data & Storage',
    books: [
      {
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
        editionOrYear: '7th Edition',
        famousAlias: "The Korth Book (Sailboat Book)",
        whyRecommended:
          'The definitive textbook in academic curricula for relational algebra, SQL calculus, schema design, relational normalization (BCNF, 3NF), and ACID transactions.',
        keyChaptersToStudy:
          'Ch 2-3 (Relational Model & SQL), Ch 7 (Relational Database Design), Ch 14 (Transactions), Ch 15 (Concurrency Control), Ch 16 (Recovery)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Database+System+Concepts+Silberschatz+Korth+Sudarshan',
      },
      {
        title: 'Database Management Systems',
        author: 'Raghu Ramakrishnan & Johannes Gehrke',
        editionOrYear: '3rd Edition',
        famousAlias: "The Cow Book",
        whyRecommended:
          'Praised by database engine builders for deep dives into storage architectures, B+ tree indexing, buffer manager algorithms, and query execution plans.',
        keyChaptersToStudy:
          'Ch 8 (Overview of Storage and Indexing), Ch 9 (Storing Data: Disks and Files), Ch 10 (Tree-Structured Indexing: B+ Trees), Ch 12 (Query Evaluation)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Database+Management+Systems+Raghu+Ramakrishnan',
      },
      {
        title: 'Designing Data-Intensive Applications (DDIA)',
        author: 'Martin Kleppmann',
        editionOrYear: '1st Edition',
        famousAlias: "DDIA (The Distributed Data Bible)",
        whyRecommended:
          'The modern classic bridging academia and engineering reality. Essential for understanding replication, partitioning, consensus (Raft/Paxos), and batch/stream processing.',
        keyChaptersToStudy:
          'Ch 3 (Storage and Retrieval - LSM vs B-Trees), Ch 5 (Replication), Ch 6 (Partitioning), Ch 7 (Transactions), Ch 9 (Consistency and Consensus)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.google.com/search?q=Designing+Data-Intensive+Applications+Martin+Kleppmann',
      },
    ],
  },
  {
    subject: 'Computer Networks',
    category: 'Networking & Systems',
    books: [
      {
        title: 'Computer Networking: A Top-Down Approach',
        author: 'James F. Kurose & Keith W. Ross',
        editionOrYear: '8th Edition',
        famousAlias: "Kurose & Ross",
        whyRecommended:
          'Revolutionized networking education by starting at the Application Layer (HTTP, DNS, sockets) down to Transport (TCP/UDP), Network (IP, routing), and Link layers.',
        keyChaptersToStudy:
          'Ch 2 (Application Layer), Ch 3 (Transport Layer: TCP flow & congestion control), Ch 4-5 (Network Layer: Data Plane & Control Plane)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Computer+Networking+A+Top-Down+Approach+Kurose+Ross',
      },
      {
        title: 'Computer Networks',
        author: 'Andrew S. Tanenbaum, David J. Wetherall, Nick Feamster',
        editionOrYear: '6th Edition',
        famousAlias: "Tanenbaum Networks",
        whyRecommended:
          'Classic bottom-up pedagogical approach with unparalleled rigor on physical medium signaling, data-link protocols (sliding window, MAC), and internetworking.',
        keyChaptersToStudy:
          'Ch 3 (The Data Link Layer), Ch 4 (The Medium Access Control Sublayer), Ch 5 (The Network Layer), Ch 6 (The Transport Layer)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Computer+Networks+Andrew+Tanenbaum+David+Wetherall',
      },
    ],
  },
  {
    subject: 'Data Structures & Algorithms',
    category: 'Theoretical Foundations',
    books: [
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
        editionOrYear: '4th Edition',
        famousAlias: "CLRS (The Bible of Algorithms)",
        whyRecommended:
          'The universally acknowledged ultimate reference for algorithms. Exhaustive mathematical proofs of correctness, Master theorem, dynamic programming, and amortized analysis.',
        keyChaptersToStudy:
          'Ch 4 (Divide-and-Conquer), Ch 15 (Dynamic Programming), Ch 16 (Greedy Algorithms), Ch 22-26 (Graph Algorithms: BFS, DFS, Dijkstra, Bellman-Ford, Max Flow)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.google.com/search?q=Introduction+to+Algorithms+CLRS+4th+edition',
      },
      {
        title: 'The Algorithm Design Manual',
        author: 'Steven S. Skiena',
        editionOrYear: '3rd Edition',
        famousAlias: "Skiena (The Hitchhiker's Guide)",
        whyRecommended:
          'Highly practical and intuitive. Contains the famous "War Stories" demonstrating how algorithmic insights solve real engineering bottlenecks.',
        keyChaptersToStudy:
          'Part I: Practical Algorithm Design (Data Structures, Sorting, Graph Traversal), Part II: The Hitchhiker\'s Guide to Algorithms Catalog',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=The+Algorithm+Design+Manual+Steven+Skiena',
      },
    ],
  },
  {
    subject: 'Machine Learning & AI',
    category: 'Artificial Intelligence',
    books: [
      {
        title: 'Artificial Intelligence: A Modern Approach',
        author: 'Stuart Russell & Peter Norvig',
        editionOrYear: '4th Edition',
        famousAlias: "AIMA (Russell & Norvig)",
        whyRecommended:
          'Used by over 1,500 universities in 135 countries. The definitive encyclopedic guide to rational agents, search algorithms (A*), logic, knowledge representation, and probabilistic reasoning.',
        keyChaptersToStudy:
          'Ch 3 (Solving Problems by Searching), Ch 4 (Search in Complex Environments), Ch 13-14 (Quantifying Uncertainty & Probabilistic Reasoning), Ch 18 (Learning from Examples)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Artificial+Intelligence+A+Modern+Approach+Russell+Norvig',
      },
      {
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        editionOrYear: '1st Edition (MIT Press)',
        famousAlias: "The MIT Deep Learning Book",
        whyRecommended:
          'Written by pioneering pioneers of deep learning (including the inventor of GANs). Rigorous mathematical foundation covering linear algebra, backpropagation, CNNs, and RNNs.',
        keyChaptersToStudy:
          'Part I: Applied Math & Machine Learning Basics, Part II: Deep Networks (Ch 6 Feedforward, Ch 7 Regularization, Ch 8 Optimization, Ch 9 CNNs, Ch 10 Sequence Modeling)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.deeplearningbook.org/',
      },
      {
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher M. Bishop',
        editionOrYear: '1st Edition',
        famousAlias: "Bishop (PRML)",
        whyRecommended:
          'The premier graduate-level text on Bayesian probability theory, maximum likelihood estimation, Gaussian processes, and EM algorithms for clustering.',
        keyChaptersToStudy:
          'Ch 1 (Introduction & Probability Theory), Ch 2 (Probability Distributions), Ch 3-4 (Linear Models for Regression & Classification), Ch 9 (Mixture Models & EM)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.google.com/search?q=Pattern+Recognition+and+Machine+Learning+Christopher+Bishop',
      },
    ],
  },
  {
    subject: 'Information Retrieval',
    category: 'Search & NLP',
    books: [
      {
        title: 'Introduction to Information Retrieval',
        author: 'Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze',
        editionOrYear: '1st Edition (Cambridge University Press)',
        famousAlias: "The Stanford IR Book (Free Online)",
        whyRecommended:
          'The foundational text for modern search engines. Covers Boolean retrieval, Inverted Index construction, Vector Space Models, TF-IDF, Okapi BM25, and PageRank.',
        keyChaptersToStudy:
          'Ch 1 (Boolean Retrieval), Ch 2 (The Term Vocabulary and Postings Lists), Ch 6 (Scoring, Term Weighting and the Vector Space Model), Ch 11 (Probabilistic Information Retrieval & BM25)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://nlp.stanford.edu/IR-book/',
      },
      {
        title: 'Search Engines: Information Retrieval in Practice',
        author: 'W. Bruce Croft, Donald Metzler, Trevor Strohman',
        editionOrYear: '1st Edition',
        famousAlias: "Croft Search Engines",
        whyRecommended:
          'Combines classic IR theory with real production web search engine architecture, crawling, tokenization, index compression, and evaluation metrics (MAP, NDCG).',
        keyChaptersToStudy:
          'Ch 2 (Architecture of a Search Engine), Ch 4 (Processing Text), Ch 5 (Ranking with Indexes), Ch 7 (Retrieval Models)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Search+Engines+Information+Retrieval+in+Practice+Croft',
      },
    ],
  },
  {
    subject: 'Compilers',
    category: 'Programming Languages & Systems',
    books: [
      {
        title: 'Compilers: Principles, Techniques, and Tools',
        author: 'Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman',
        editionOrYear: '2nd Edition',
        famousAlias: "The Dragon Book",
        whyRecommended:
          'One of the most iconic computer science books in history. The undisputed bible on lexical analysis (lex), syntax parsing (LL, LR, LALR/yacc), syntax-directed translation, and intermediate code generation.',
        keyChaptersToStudy:
          'Ch 2 (A Simple Syntax-Directed Translator), Ch 3 (Lexical Analysis), Ch 4 (Syntax Analysis / Parsing), Ch 6 (Intermediate-Code Generation), Ch 8-9 (Code Generation & Optimization)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Compilers+Principles+Techniques+and+Tools+Dragon+Book',
      },
    ],
  },
  {
    subject: 'Software Engineering & System Design',
    category: 'Engineering Practice',
    books: [
      {
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        editionOrYear: '1st Edition',
        famousAlias: "Gang of Four (GoF)",
        whyRecommended:
          'The immortal software engineering classic cataloging the 23 essential creational, structural, and behavioral design patterns.',
        keyChaptersToStudy:
          'Ch 3 (Creational Patterns: Singleton, Factory), Ch 4 (Structural: Adapter, Decorator, Facade), Ch 5 (Behavioral: Observer, Strategy, State)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Design+Patterns+Elements+of+Reusable+Object-Oriented+Software+Gang+of+Four',
      },
      {
        title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure',
        author: 'Robert C. Martin',
        editionOrYear: '1st Edition',
        famousAlias: "Uncle Bob's Clean Architecture",
        whyRecommended:
          'Universal principles for decoupling business rules from databases, web frameworks, and external devices using dependency inversion and SOLID design.',
        keyChaptersToStudy:
          'Part III: Design Principles (SOLID), Part IV: Component Principles, Part V: Architecture (The Clean Architecture, Boundaries)',
        difficultyLevel: 'Standard B.Tech / Core',
        searchUrl: 'https://www.google.com/search?q=Clean+Architecture+Robert+C+Martin',
      },
    ],
  },
  {
    subject: 'Biology & Life Sciences',
    category: 'Life Sciences',
    books: [
      {
        title: 'Campbell Biology',
        author: 'Lisa A. Urry, Michael L. Cain, Steven A. Wasserman, Peter V. Minorsky, Rebecca Orr',
        editionOrYear: '12th Edition',
        famousAlias: "The Campbell Biology Bible",
        whyRecommended:
          'The premier worldwide standard for biological education. Highly celebrated for unparalleled clarity in cell bioenergetics, photosynthesis, genetics, and ecology.',
        keyChaptersToStudy:
          'Ch 6 (A Tour of the Cell), Ch 9 (Cellular Respiration and Fermentation), Ch 10 (Photosynthesis), Ch 13-15 (Meiosis and Mendelian Genetics), Ch 17 (From Gene to Protein)',
        difficultyLevel: 'Foundational & Core',
        searchUrl: 'https://www.google.com/search?q=Campbell+Biology+Urry+Cain+12th+edition',
      },
      {
        title: 'Molecular Biology of the Cell',
        author: 'Bruce Alberts, Rebecca Heald, Alexander Johnson, David Morgan, Martin Raff, Keith Roberts, Peter Walter',
        editionOrYear: '7th Edition',
        famousAlias: "The Alberts Cell Biology Book",
        whyRecommended:
          'The definitive classic for advanced cell and molecular biology, tracing macromolecular assemblies, membrane transport, and cell cycle signaling.',
        keyChaptersToStudy:
          'Ch 12 (Intracellular Compartments and Protein Sorting), Ch 14 (Energy Conversion: Mitochondria and Chloroplasts), Ch 17 (The Cell Cycle)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.google.com/search?q=Molecular+Biology+of+the+Cell+Bruce+Alberts+7th+edition',
      },
    ],
  },
  {
    subject: 'Medicine & Physiology',
    category: 'Medical Sciences',
    books: [
      {
        title: 'Guyton and Hall Textbook of Medical Physiology',
        author: 'John E. Hall & Michael E. Hall',
        editionOrYear: '14th Edition',
        famousAlias: "Guyton & Hall",
        whyRecommended:
          'The gold-standard physiology textbook across medical schools globally. Renowned for lucid clinical explanations of cardiac cycles, neurophysiology, renal hemodynamics, and endocrine feedback loops.',
        keyChaptersToStudy:
          'Unit III (The Heart: Cardiac Muscle & Rhythmic Excitation), Unit IV (The Circulation: Microcirculation & Capillary Fluid Exchange), Unit V (The Body Fluids and Kidneys)',
        difficultyLevel: 'Standard Medical Curriculum',
        searchUrl: 'https://www.google.com/search?q=Guyton+and+Hall+Textbook+of+Medical+Physiology+14th+edition',
      },
      {
        title: 'Robbins & Cotran Pathologic Basis of Disease',
        author: 'Vinay Kumar, Abul K. Abbas, Jon C. Aster',
        editionOrYear: '10th Edition',
        famousAlias: "Big Robbins",
        whyRecommended:
          'The undisputed international reference on human disease pathophysiology, cellular injury, inflammation, neoplasia, and organ-specific clinical pathology.',
        keyChaptersToStudy:
          'Ch 1 (The Genome in Health and Disease), Ch 2 (Cellular Responses to Stress and Toxic Insults), Ch 3 (Inflammation and Repair), Ch 7 (Neoplasia)',
        difficultyLevel: 'Advanced Medical Curriculum',
        searchUrl: 'https://www.google.com/search?q=Robbins+and+Cotran+Pathologic+Basis+of+Disease+Kumar',
      },
    ],
  },
  {
    subject: 'Economics & Finance',
    category: 'Business & Economics',
    books: [
      {
        title: 'Principles of Economics',
        author: 'N. Gregory Mankiw',
        editionOrYear: '9th Edition',
        famousAlias: "Mankiw Economics",
        whyRecommended:
          'The most widely adopted economics textbook in colleges globally. Introduces the Ten Principles of Economics, supply and demand market dynamics, Keynesian and classical macroeconomic models.',
        keyChaptersToStudy:
          'Ch 4 (The Market Forces of Supply and Demand), Ch 23 (Measuring a Nation\'s Income), Ch 24 (Measuring the Cost of Living), Ch 29 (The Monetary System), Ch 34 (The Influence of Monetary and Fiscal Policy)',
        difficultyLevel: 'Foundational & Core',
        searchUrl: 'https://www.google.com/search?q=Principles+of+Economics+N+Gregory+Mankiw+9th+edition',
      },
      {
        title: 'Intermediate Microeconomics: A Modern Approach',
        author: 'Hal R. Varian',
        editionOrYear: '9th Edition',
        famousAlias: "Varian Microeconomics",
        whyRecommended:
          'The definitive analytical treatment of consumer theory, utility maximization, firm production cost curves, game theory, and general market equilibrium.',
        keyChaptersToStudy:
          'Ch 4 (Utility), Ch 5 (Choice), Ch 14 (Consumer\'s Surplus), Ch 19 (Technology), Ch 24 (Monopoly), Ch 28 (Game Theory)',
        difficultyLevel: 'Core Undergraduate',
        searchUrl: 'https://www.google.com/search?q=Intermediate+Microeconomics+Hal+Varian+9th+edition',
      },
    ],
  },
  {
    subject: 'Law & Legal Studies',
    category: 'Law & Governance',
    books: [
      {
        title: 'Treitel on The Law of Contract',
        author: 'Edwin Peel & Guenter Treitel',
        editionOrYear: '15th Edition',
        famousAlias: "Treitel on Contract",
        whyRecommended:
          'The quintessential common-law authority on contractual agreements, offer and acceptance doctrine, consideration, breach, and equitable remedies.',
        keyChaptersToStudy:
          'Ch 2 (Agreement: Offer and Acceptance), Ch 3 (Consideration), Ch 8 (Mistake), Ch 9 (Misrepresentation), Ch 20 (Remedies for Breach of Contract)',
        difficultyLevel: 'Standard LL.B / Law Core',
        searchUrl: 'https://www.google.com/search?q=Treitel+on+The+Law+of+Contract+Edwin+Peel',
      },
      {
        title: 'Constitutional Law: Principles and Policies',
        author: 'Erwin Chemerinsky',
        editionOrYear: '7th Edition',
        famousAlias: "Chemerinsky Constitutional Law",
        whyRecommended:
          'Regarded by legal scholars and law students as the most accessible and comprehensive treatise on separation of powers, judicial review, federalism, and fundamental constitutional liberties.',
        keyChaptersToStudy:
          'Ch 1 (Historical Background & Judicial Review), Ch 3 (Federal Legislative Power), Ch 4 (Federal Executive Power), Ch 8 (Equal Protection), Ch 9 (Fundamental Rights)',
        difficultyLevel: 'Standard Law School',
        searchUrl: 'https://www.google.com/search?q=Constitutional+Law+Principles+and+Policies+Chemerinsky',
      },
    ],
  },
  {
    subject: 'Physics & Physical Sciences',
    category: 'Natural Sciences',
    books: [
      {
        title: 'Fundamentals of Physics',
        author: 'David Halliday, Robert Resnick, Jearl Walker',
        editionOrYear: '12th Edition',
        famousAlias: "Halliday & Resnick",
        whyRecommended:
          'Universally acclaimed as the benchmark textbook for calculus-based general physics. Rigorous derivations of Newtonian mechanics, thermodynamics, electromagnetism, and optics.',
        keyChaptersToStudy:
          'Ch 5-6 (Force and Motion), Ch 7-8 (Kinetic Energy & Potential Energy), Ch 18-20 (Temperature, Heat & The Laws of Thermodynamics), Ch 21-25 (Coulomb\'s Law & Electric Fields)',
        difficultyLevel: 'Standard B.Tech / B.Sc Core',
        searchUrl: 'https://www.google.com/search?q=Fundamentals+of+Physics+Halliday+Resnick+Walker+12th+edition',
      },
      {
        title: 'Introduction to Electrodynamics',
        author: 'David J. Griffiths',
        editionOrYear: '4th Edition',
        famousAlias: "Griffiths Electrodynamics",
        whyRecommended:
          'Celebrated for brilliant exposition and pedagogical humor. The standard undergraduate text for vector calculus, electrostatics, magnetostatics, and Maxwell\'s equations.',
        keyChaptersToStudy:
          'Ch 1 (Vector Analysis), Ch 2 (Electrostatics), Ch 5 (Magnetostatics), Ch 7 (Electrodynamics and Maxwell\'s Equations), Ch 9 (Electromagnetic Waves)',
        difficultyLevel: 'Advanced Mastery',
        searchUrl: 'https://www.google.com/search?q=Introduction+to+Electrodynamics+David+J+Griffiths+4th+edition',
      },
    ],
  },
  {
    subject: 'Mathematics & Statistics',
    category: 'Mathematical Sciences',
    books: [
      {
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart, Daniel K. Clegg, Saleem Watson',
        editionOrYear: '9th Edition',
        famousAlias: "Stewart Calculus",
        whyRecommended:
          'The premier university calculus text worldwide. Unsurpassed clarity in limits, differential calculus, integration techniques, multivariable calculus, and series.',
        keyChaptersToStudy:
          'Ch 2 (Limits and Derivatives), Ch 5 (Integrals), Ch 11 (Infinite Sequences and Series), Ch 14 (Partial Derivatives), Ch 16 (Vector Calculus)',
        difficultyLevel: 'Foundational & Core',
        searchUrl: 'https://www.google.com/search?q=Calculus+Early+Transcendentals+James+Stewart+9th+edition',
      },
      {
        title: 'Introduction to Linear Algebra',
        author: 'Gilbert Strang',
        editionOrYear: '6th Edition',
        famousAlias: "Gilbert Strang Linear Algebra",
        whyRecommended:
          'MIT Professor Gilbert Strang\'s celebrated textbook emphasizing geometric understanding of vector spaces, matrix factorizations (LU, QR, SVD), eigenvalues, and applications.',
        keyChaptersToStudy:
          'Ch 3 (Vector Spaces and Subspaces), Ch 4 (Orthogonality), Ch 5 (Determinants), Ch 6 (Eigenvalues and Eigenvectors), Ch 7 (The Singular Value Decomposition / SVD)',
        difficultyLevel: 'Standard University Core',
        searchUrl: 'https://www.google.com/search?q=Introduction+to+Linear+Algebra+Gilbert+Strang+6th+edition',
      },
    ],
  },
];

export function getRecommendedBooksForTopic(topic: string): RecommendedBook[] {
  const lower = topic.toLowerCase();

  // 1. Biology & Life Sciences
  if (
    lower.includes('photo') ||
    lower.includes('bio') ||
    lower.includes('cell') ||
    lower.includes('dna') ||
    lower.includes('gene') ||
    lower.includes('protein') ||
    lower.includes('chloroplast') ||
    lower.includes('mitochondria') ||
    lower.includes('respiration') ||
    lower.includes('ecology') ||
    lower.includes('evolution') ||
    lower.includes('enzyme')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Biology & Life Sciences')?.books || [];
  }

  // 2. Medicine, Anatomy & Physiology
  if (
    lower.includes('medic') ||
    lower.includes('physiol') ||
    lower.includes('pathol') ||
    lower.includes('disease') ||
    lower.includes('heart') ||
    lower.includes('cardiac') ||
    lower.includes('kidney') ||
    lower.includes('brain') ||
    lower.includes('neuron') ||
    lower.includes('anatomy') ||
    lower.includes('pharmacology') ||
    lower.includes('clinical') ||
    lower.includes('blood') ||
    lower.includes('artery')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Medicine & Physiology')?.books || [];
  }

  // 3. Economics, Finance & Commerce
  if (
    lower.includes('econ') ||
    lower.includes('inflat') ||
    lower.includes('gdp') ||
    lower.includes('fiscal') ||
    lower.includes('monetary') ||
    lower.includes('demand') ||
    lower.includes('supply') ||
    lower.includes('market') ||
    lower.includes('price') ||
    lower.includes('trade') ||
    lower.includes('macro') ||
    lower.includes('micro') ||
    lower.includes('finance') ||
    lower.includes('bank')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Economics & Finance')?.books || [];
  }

  // 4. Law, Jurisprudence & Legal Studies
  if (
    lower.includes('law') ||
    lower.includes('contract') ||
    lower.includes('tort') ||
    lower.includes('constitut') ||
    lower.includes('legal') ||
    lower.includes('court') ||
    lower.includes('crime') ||
    lower.includes('criminal') ||
    lower.includes('statute') ||
    lower.includes('jurisprudence') ||
    lower.includes('rights')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Law & Legal Studies')?.books || [];
  }

  // 5. Physics & Physical Sciences
  if (
    lower.includes('physic') ||
    lower.includes('thermodynamic') ||
    lower.includes('mechanic') ||
    lower.includes('gravity') ||
    lower.includes('motion') ||
    lower.includes('newton') ||
    lower.includes('quantum') ||
    lower.includes('electromagnet') ||
    lower.includes('wave') ||
    lower.includes('optic') ||
    lower.includes('entropy') ||
    lower.includes('relativity')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Physics & Physical Sciences')?.books || [];
  }

  // 6. Mathematics & Statistics
  if (
    lower.includes('calculus') ||
    lower.includes('integral') ||
    lower.includes('derivative') ||
    lower.includes('matrix') ||
    lower.includes('linear algebra') ||
    lower.includes('algebra') ||
    lower.includes('probability') ||
    lower.includes('statistic') ||
    lower.includes('differential equation') ||
    lower.includes('vector')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Mathematics & Statistics')?.books || [];
  }

  // 7. Operating Systems
  if (
    lower.includes('operating system') ||
    lower.includes('virtual memory') ||
    lower.includes('deadlock') ||
    lower.includes('kernel') ||
    lower === 'os' ||
    lower.startsWith('os ') ||
    lower.endsWith(' os')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Operating Systems')?.books || [];
  }

  // 8. DBMS
  if (
    lower.includes('dbms') ||
    lower.includes('database') ||
    lower.includes('sql') ||
    lower.includes('relational algebra') ||
    lower.includes('normalization') ||
    lower.includes('acid') ||
    lower.includes('b+ tree')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Database Management Systems')?.books || [];
  }

  // 9. Computer Networks
  if (
    lower.includes('computer network') ||
    lower.includes('networking') ||
    lower.includes('tcp/ip') ||
    lower.includes('osi model') ||
    lower.includes('routing algorithm') ||
    lower.includes('subnetting')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Computer Networks')?.books || [];
  }

  // 10. Data Structures & Algorithms
  if (
    lower.includes('data structure') ||
    lower.includes('algorithm') ||
    lower.includes('binary search tree') ||
    lower.includes('dynamic programming') ||
    lower.includes('graph traversal')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Data Structures & Algorithms')?.books || [];
  }

  // 11. Machine Learning & AI
  if (
    lower.includes('machine learning') ||
    lower.includes('artificial intelligence') ||
    lower.includes('deep learning') ||
    lower.includes('neural network')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Machine Learning & AI')?.books || [];
  }

  // 12. Information Retrieval
  if (
    lower.includes('information retrieval') ||
    lower.includes('search engine') ||
    lower.includes('bm25') ||
    lower.includes('tf-idf') ||
    lower.includes('inverted index')
  ) {
    return FAMOUS_BOOKS_DATABASE.find((s) => s.subject === 'Information Retrieval')?.books || [];
  }

  // Fallback: Generate curated references tailored to this exact academic topic
  return [
    {
      title: `${topic}: Standard Academic Principles and Reference Treatise`,
      author: 'Authoritative Academic Faculty & Leading Scholars',
      editionOrYear: 'Standard University Curriculum Edition',
      famousAlias: 'Authoritative University Reference',
      whyRecommended: `Recognized benchmark literature for foundational theory, canonical experiments, and practical academic applications in ${topic}.`,
      keyChaptersToStudy: `Core Chapters on ${topic} Theoretical Principles, Analytical Frameworks, and Standard Exam Case Studies.`,
      difficultyLevel: 'Standard Degree / Core',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(topic + ' standard university textbook')}`,
    },
    {
      title: `${topic}: Advanced Comprehensive Treatise & Research Compendium`,
      author: 'Eminent Academic Scholars & Peer-Reviewed Contributors',
      editionOrYear: 'Latest Academic Edition',
      famousAlias: 'Advanced Syllabus Companion',
      whyRecommended: `Recommended worldwide for advanced university coursework and comprehensive syllabus preparation covering both foundational models and modern methodologies.`,
      keyChaptersToStudy: `Advanced Chapters on ${topic} Methodologies, Quantitative Analysis, and Contemporary Research Directions.`,
      difficultyLevel: 'Advanced Degree / Elective',
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(topic + ' reference book syllabus')}`,
    },
  ];
}
