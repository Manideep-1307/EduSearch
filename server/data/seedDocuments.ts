import { DocumentItem } from '../../src/types';

export const SEED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-os-01',
    title: 'Operating Systems: Process Management, Scheduling and Deadlocks',
    subject: 'Operating Systems',
    filename: 'cs301_operating_systems_lecture_notes.txt',
    uploadDate: '2026-08-15',
    wordCount: 840,
    isSeed: true,
    text: `Operating Systems Concepts and Core Architecture.
An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs. 

1. Process Management and CPU Scheduling:
A process is a program in execution consisting of program counter, stack, data section, and heap. The process state transition model comprises New, Ready, Running, Waiting, and Terminated states. The Process Control Block (PCB) contains process ID (PID), process state, registers, memory limits, and list of open files.
CPU scheduling algorithms determine which process in the ready queue is allocated the CPU core:
- First-Come, First-Served (FCFS): Non-preemptive scheduling with convoy effect.
- Shortest Job First (SJF): Provably optimal average turnaround time; preemptive variant known as Shortest Remaining Time First (SRTF).
- Round Robin (RR): Preemptive scheduling using fixed time quantum (q). Balances responsiveness and context-switch overhead.
- Priority Scheduling: Suffers from starvation / indefinite blocking, resolved using aging.
- Multilevel Feedback Queue (MLFQ): Dynamically adjusts process priorities based on burst behavior.

2. Process Synchronization and Concurrency:
The Critical Section Problem requires mutual exclusion, progress, and bounded waiting. Synchronization mechanisms include:
- Peterson's Algorithm: Software solution for two processes.
- Semaphores: Integer variables accessed through atomic wait() (P) and signal() (V) operations. Counting semaphores control resource pools; binary semaphores act as mutex locks.
- Monitors: High-level language construct with conditional variables (wait and signal).
- Classical synchronization problems: Dining Philosophers, Producer-Consumer (Bounded Buffer), Readers-Writers.

3. Deadlocks:
A deadlock occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.
Four Coffman conditions must hold simultaneously:
1. Mutual Exclusion: At least one unshareable resource.
2. Hold and Wait: A process holds resources while requesting more.
3. No Preemption: Resources cannot be forcibly taken.
4. Circular Wait: A closed chain of processes each waiting for resource held by next.
Deadlock handling strategies:
- Prevention: Invalidate at least one Coffman condition.
- Avoidance: Banker's Algorithm uses resource-allocation state to ensure safe state.
- Detection and Recovery: Resource Allocation Graph (RAG) cycle detection; process termination or resource preemption.

4. Memory Management and Virtual Memory:
Virtual memory decouples user logical memory from physical memory using paging and segmentation. 
Paging divides physical memory into fixed-size frames and logical memory into pages mapped via a Page Table. Translation Lookaside Buffer (TLB) acts as a high-speed cache for page table lookups.
Page replacement algorithms handle page faults when physical memory is saturated:
- First-In, First-Out (FIFO) (susceptible to Belady's Anomaly)
- Optimal Page Replacement (OPT / MIN)
- Least Recently Used (LRU) using counters or stack
- Clock algorithm (second-chance FIFO approximation)
Thrashing occurs when the system spends more time paging than executing processes due to over-allocation of degree of multiprogramming.`
  },
  {
    id: 'doc-dbms-02',
    title: 'Database Management Systems: Relational Algebra, Normalization and Transactions',
    subject: 'DBMS',
    filename: 'cs302_dbms_comprehensive_handbook.txt',
    uploadDate: '2026-08-18',
    wordCount: 790,
    isSeed: true,
    text: `Database Management Systems (DBMS) and Relational Theory.
A DBMS is software designed to store, manage, retrieve, and analyze structured and unstructured data while ensuring consistency, integrity, and security.

1. Relational Model and Relational Algebra:
Data is organized into tables (relations) of rows (tuples) and columns (attributes). 
Fundamental relational algebra operators include:
- Selection (σ): Selects tuples that satisfy a predicate.
- Projection (π): Selects specified attributes, eliminating duplicates.
- Cartesian Product (×): Combines tuples from two relations.
- Set Difference (−) and Union (∪).
- Join operations: Natural join (⋈), Theta join, Equi-join, Outer joins (Left, Right, Full).
SQL (Structured Query Language) is the declarative standard implemented via DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), and DCL (GRANT, REVOKE).

2. Integrity Constraints and Keys:
- Super Key: Set of attributes that uniquely identifies a tuple.
- Candidate Key: Minimal super key with no redundant attributes.
- Primary Key: Chosen candidate key with non-null constraint.
- Foreign Key: Attribute referencing a primary key in another relation, enforcing Referential Integrity.

3. Functional Dependencies and Normalization:
Functional Dependency (X → Y) asserts that attribute set X uniquely determines attribute set Y.
Armstrong's Axioms: Reflexivity, Augmentation, Transitivity.
Normalization eliminates data redundancy and update/insertion/deletion anomalies:
- First Normal Form (1NF): Atomicity of attribute values; no repeating groups.
- Second Normal Form (2NF): In 1NF and no partial dependencies (every non-prime attribute fully functionally dependent on every candidate key).
- Third Normal Form (3NF): In 2NF and no transitive dependencies (no non-prime attribute determines another non-prime attribute).
- Boyce-Codd Normal Form (BCNF): For every non-trivial functional dependency X → Y, X must be a super key.
- Fourth Normal Form (4NF): Eliminates multi-valued dependencies.

4. Transaction Management and ACID Properties:
A transaction is a logical unit of database processing consisting of read and write operations.
ACID guarantees:
- Atomicity: All operations succeed or all are rolled back (All-or-Nothing). Handled by Write-Ahead Logging (WAL).
- Consistency: Execution preserves database invariants and constraints.
- Isolation: Concurrent transactions do not interfere with each other.
- Durability: Committed modifications persist across crashes and power failures.

5. Concurrency Control:
Schedules can be serial, conflict serializable, or view serializable.
Testing conflict serializability requires constructing a Precedence Graph (Serialization Graph); an acyclic graph proves conflict serializability.
Two-Phase Locking (2PL): Growing phase (acquires locks) and Shrinking phase (releases locks). Strict 2PL prevents cascading rollbacks by holding exclusive locks until commit.`
  },
  {
    id: 'doc-ml-03',
    title: 'Machine Learning: Algorithms, Neural Networks and Statistical Learning',
    subject: 'Machine Learning',
    filename: 'cs405_machine_learning_foundations.txt',
    uploadDate: '2026-08-20',
    wordCount: 820,
    isSeed: true,
    text: `Foundations of Machine Learning and Statistical Modeling.
Machine learning focuses on developing algorithms capable of learning patterns from empirical training data without being explicitly programmed for rule execution.

1. Paradigms of Machine Learning:
- Supervised Learning: Given labeled pairs (x_i, y_i), learn a mapping function f(x) -> y.
  * Classification: Discrete outputs (Logistic Regression, Support Vector Machines, Decision Trees, Random Forests, Naive Bayes).
  * Regression: Continuous outputs (Linear Regression, Ridge/Lasso Regularization).
- Unsupervised Learning: Discover latent structure from unlabeled data x_i.
  * Clustering: K-Means, Hierarchical Agglomerative, DBSCAN density clustering.
  * Dimensionality Reduction: Principal Component Analysis (PCA), t-SNE, Autoencoders.
- Reinforcement Learning: Agent learns optimal policy π(a|s) to maximize cumulative rewards in Markov Decision Processes (MDP).

2. Model Training, Cost Functions, and Optimization:
Optimization revolves around minimizing empirical risk over model parameters θ:
L(θ) = 1/N ∑ loss(f(x_i; θ), y_i) + λ R(θ).
Gradient Descent algorithms:
- Batch Gradient Descent: Computes gradient across entire dataset.
- Stochastic Gradient Descent (SGD): Updates per single instance, high variance.
- Mini-Batch SGD: Balances vectorization and convergence stability.
- Adaptive Optimizers: Adam (Adaptive Moment Estimation), RMSprop, Adagrad utilizing first and second momentum tracking.

3. Bias-Variance Tradeoff and Generalization:
- Bias Error: Erroneous assumptions in the learning algorithm (Underfitting). Model is too rigid.
- Variance Error: Sensitivity to small fluctuations in training set (Overfitting). Model memorizes noise.
Regularization methods to curb overfitting:
- L1 Regularization (Lasso): Promotes parameter sparsity through diamond L1 ball projection.
- L2 Regularization (Ridge / Weight Decay): Penalizes large weights smoothly.
- Dropout: Randomly zeros out hidden units during forward pass in deep networks.
- Early Stopping: Halts training when validation loss stops improving.
- Cross-Validation: K-Fold cross-validation provides unbiased performance estimation.

4. Deep Neural Networks and Backpropagation:
Multi-Layer Perceptrons (MLP) compose linear transformations with non-linear activation functions (ReLU, GELU, Sigmoid, Softmax).
The Backpropagation algorithm calculates analytical gradients of loss with respect to all layer weights using the Chain Rule of calculus.
Modern architectures:
- Convolutional Neural Networks (CNN): Exploit spatial translation invariance via weight sharing and pooling.
- Recurrent Neural Networks (RNN & LSTM / GRU): Process sequential data with gating mechanisms mitigating vanishing gradients.
- Transformer Architecture: Replaces recurrence entirely with Multi-Head Scaled Dot-Product Self-Attention mechanisms: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) V.`
  },
  {
    id: 'doc-ir-04',
    title: 'Information Retrieval: Inverted Indexes, Vector Space Models and BM25 Ranking',
    subject: 'Information Retrieval',
    filename: 'cs410_information_retrieval_systems.txt',
    uploadDate: '2026-08-22',
    wordCount: 860,
    isSeed: true,
    text: `Information Retrieval (IR) Architecture and Ranking Models.
Information retrieval is the science of searching for relevant documents or information within collections of unstructured text data against user information needs.

1. The Classic IR Pipeline:
The standard text processing pipeline transforms raw textual corpora into indexed structures:
1. Document Collection and Format Parsing (PDF, TXT, HTML).
2. Tokenization: Lexical analysis breaking character streams into tokens, stripping punctuation.
3. Stop-Word Removal: Eliminating extremely frequent functional terms (the, is, at, which).
4. Stemming and Lemmatization: Collapsing morphological inflections to canonical stems (Porter Stemmer, Krovetz, WordNet Lemmatizer).
5. Inverted Index Construction: Building mapping from dictionary terms to posting lists containing document IDs, term frequencies (TF), and positional offsets.

2. Boolean Retrieval vs Ranked Retrieval:
- Boolean Model: Exact set-theoretic matching using AND, OR, NOT operations. Fails to provide ranked ordering; suffers from either feast or famine problem.
- Ranked Retrieval: Computes continuous relevance scores allowing top-k result ranking.

3. Vector Space Model (VSM) and TF-IDF:
Represents documents and queries as high-dimensional vectors in a shared vocabulary space.
- Term Frequency (TF): Measures the local importance of term t in document d:
  TF(t, d) = count(t, d) / |d|   or   1 + log(1 + count(t, d)).
- Inverse Document Frequency (IDF): Penalizes terms appearing broadly across the collection:
  IDF(t) = log(1 + N / n_t), where N is total documents and n_t is document frequency.
- TF-IDF Weight: w(t, d) = TF(t, d) * IDF(t).
- Cosine Similarity: Evaluates directional cosine of angle between query vector q and document vector d:
  Cosine(q, d) = (q · d) / (||q|| * ||d||) = ∑ [w(t, q) * w(t, d)] / [sqrt(∑ w(t, q)^2) * sqrt(∑ w(t, d)^2)].

4. Probabilistic Retrieval and Okapi BM25:
BM25 (Best Matching 25) is an industry-standard non-linear term saturation ranking function derived from the probabilistic 2-Poisson model.
Formula:
Score_BM25(D, Q) = ∑ [IDF(q_i) * (f(q_i, D) * (k1 + 1)) / (f(q_i, D) + k1 * (1 - b + b * (|D| / avgdl)))].
Parameters:
- k1: Controls term frequency saturation (typically 1.2 to 2.0). Higher values increase sensitivity to additional occurrences of a term.
- b: Controls document length normalization (typically 0.75). When b = 1, fully normalizes by document length; when b = 0, no length penalty.
- avgdl: Average document length across the entire indexed corpus.

5. Evaluation Metrics in Information Retrieval:
- Precision: Fraction of retrieved documents that are relevant = |Relevant ∩ Retrieved| / |Retrieved|.
- Recall: Fraction of relevant documents that are retrieved = |Relevant ∩ Retrieved| / |Relevant|.
- F1-Measure: Harmonic mean of precision and recall = 2 * (P * R) / (P + R).
- Mean Average Precision (MAP): Evaluates rank quality across multiple queries.
- Normalized Discounted Cumulative Gain (NDCG): Accounts for graded relevance with logarithmic rank discount.`
  },
  {
    id: 'doc-cn-05',
    title: 'Computer Networks: OSI Architecture, TCP/IP Suite, Routing and Transport Protocols',
    subject: 'Computer Networks',
    filename: 'cs303_computer_networks_lecture_compendium.txt',
    uploadDate: '2026-08-25',
    wordCount: 810,
    isSeed: true,
    text: `Computer Networks Architecture and Communication Protocols.
A computer network connects autonomous computing systems to facilitate distributed data exchange, resource sharing, and reliable communication.

1. Layered Network Models:
- OSI 7-Layer Reference Model:
  1. Physical Layer: Bit transmission over physical media (voltages, optical pulses).
  2. Data Link Layer: Framing, MAC physical addressing, error detection (CRC), flow control (CSMA/CD, CSMA/CA).
  3. Network Layer: Logical IP addressing, packet forwarding, host-to-host routing.
  4. Transport Layer: Process-to-process communication, port multiplexing, reliability.
  5. Session Layer: Dialog control and session checkpoints.
  6. Presentation Layer: Data formatting, serialization, encryption (TLS).
  7. Application Layer: Network applications (HTTP, DNS, SSH, SMTP).
- TCP/IP 4-Layer Suite: Link Layer, Internet Layer (IP, ICMP, ARP), Transport Layer (TCP, UDP), Application Layer.

2. Network Layer, Addressing and Routing:
- IPv4 vs IPv6: IPv4 provides 32-bit addresses (Classless Inter-Domain Routing / CIDR, subnet masks); IPv6 provides 128-bit addresses eliminating NAT necessity.
- Routing Algorithms:
  * Distance Vector Routing: Based on Bellman-Ford equation; susceptible to Count-to-Infinity problem, solved via Split Horizon and Poison Reverse (RIP).
  * Link State Routing: Based on Dijkstra's shortest path algorithm; routers flood Link State Advertisements (LSA) to build identical topology database (OSPF).
  * Path Vector: Inter-domain routing protocol governing the global Internet backbone (BGP).

3. Transport Layer: TCP vs UDP:
- User Datagram Protocol (UDP): Connectionless, lightweight, unreliable best-effort datagram service with minimal 8-byte header overhead. Ideal for real-time media streaming, DNS, VoIP.
- Transmission Control Protocol (TCP): Connection-oriented, reliable byte-stream protocol:
  * Three-Way Handshake: SYN -> SYN-ACK -> ACK.
  * Connection Teardown: FIN -> ACK -> FIN -> ACK (TIME_WAIT state).
  * Flow Control: Sliding window mechanism advertising Receiver Window (rwnd).
  * Error Control: Cumulative ACKs, Selective Acknowledgment (SACK), retransmission timers with Karn's algorithm.

4. TCP Congestion Control:
Maintains Congestion Window (cwnd) to avoid saturating network switches and buffers:
- Slow Start: cwnd doubles every RTT exponentially until reaching slow start threshold (ssthresh).
- Congestion Avoidance: cwnd grows linearly (+1 MSS per RTT) (Additive Increase).
- Fast Retransmit: Detects packet loss upon receiving 3 duplicate ACKs without waiting for RTO timer.
- Fast Recovery: Halves ssthresh and avoids dropping back to 1 MSS (Multiplicative Decrease / AIMD). Modern variants include TCP Reno, Cubic, and BBR (Bottleneck Bandwidth and RTT).`
  },
  {
    id: 'doc-dsa-06',
    title: 'Data Structures and Algorithms: Trees, Graphs, Sorting and Asymptotic Analysis',
    subject: 'Data Structures',
    filename: 'cs201_data_structures_and_algorithms_guide.txt',
    uploadDate: '2026-08-28',
    wordCount: 830,
    isSeed: true,
    text: `Data Structures and Algorithmic Complexity.
Data structures organize data in memory efficiently, while algorithms specify precise sequences of computational steps solving specific tasks.

1. Asymptotic Notations:
- Big-O (O): Asymptotic upper bound (worst-case performance).
- Big-Omega (Ω): Asymptotic lower bound (best-case performance).
- Big-Theta (Θ): Asymptotically tight bound.
Master Theorem for Divide-and-Conquer: T(n) = a T(n/b) + f(n).

2. Linear Data Structures:
- Arrays: Contiguous memory allocation, O(1) random access by index, O(n) insertion/deletion.
- Linked Lists: Singly, doubly, and circular linked nodes with pointer references. O(1) insertion given pointer, O(n) sequential search.
- Stacks: LIFO (Last In First Out) principle, push/pop in O(1). Applications: Recursion call stack, expression evaluation, backtracking.
- Queues: FIFO (First In First Out) principle, enqueue/dequeue in O(1). Variants: Circular Queue, Double-Ended Queue (Deque), Priority Queue (implemented via Binary Heaps).

3. Hierarchical Structures: Trees:
- Binary Search Tree (BST): Left subtree values < root < right subtree values. Average search O(log n), worst-case O(n) for degenerate trees.
- Self-Balancing Trees:
  * AVL Tree: Enforces strict balance factor ∈ {-1, 0, 1} through LL, RR, LR, RL tree rotations. Guarantees O(log n) worst-case height.
  * Red-Black Tree: Guarantees no path is more than twice as long as any other path via node coloring rules (root black, red node cannot have red child, black-height uniformity).
  * B-Trees and B+ Trees: Self-balancing multi-way search trees optimized for secondary disk storage and database indexing.
- Tree Traversals: Inorder (produces sorted order in BST), Preorder, Postorder, and Breadth-First Level Order.

4. Graph Theory and Algorithms:
Representations: Adjacency Matrix (O(V^2) space) and Adjacency List (O(V + E) space).
- Graph Traversals:
  * Breadth-First Search (BFS): Uses queue, finds shortest paths in unweighted graphs, O(V + E).
  * Depth-First Search (DFS): Uses stack / recursion, topological sorting, cycle detection, strongly connected components (Kosaraju, Tarjan).
- Shortest Path Algorithms:
  * Dijkstra's Algorithm: Greedy algorithm for non-negative edge weights using Min-Heap, O((V + E) log V).
  * Bellman-Ford Algorithm: Dynamic programming algorithm handling negative edge weights and detecting negative cycles, O(V * E).
  * Floyd-Warshall: All-pairs shortest paths using adjacency matrix, O(V^3).
- Minimum Spanning Trees (MST): Kruskal's algorithm (Union-Find disjoint sets) and Prim's algorithm (greedy vertex cut).

5. Sorting Algorithms:
- Quicksort: Divide-and-conquer using pivot partition. Average O(n log n), worst-case O(n^2), in-place.
- Mergesort: Stable divide-and-conquer, guaranteed O(n log n), requires O(n) auxiliary space.
- Heapsort: In-place, O(n log n) worst-case using binary max-heap.`
  },
  {
    id: 'doc-ai-07',
    title: 'Artificial Intelligence: Search Heuristics, Knowledge Representation and Expert Systems',
    subject: 'Artificial Intelligence',
    filename: 'cs401_artificial_intelligence_principles.txt',
    uploadDate: '2026-08-30',
    wordCount: 770,
    isSeed: true,
    text: `Principles of Artificial Intelligence and Problem Solving.
Artificial Intelligence involves engineering computational agents that perceive their environment and take actions that maximize their probability of achieving goals.

1. Intelligent Agents and Environments:
The PEAS framework formalizes agent designs: Performance measure, Environment, Actuators, Sensors.
Environment characteristics: Fully vs Partially Observable, Deterministic vs Stochastic, Episodic vs Sequential, Static vs Dynamic, Discrete vs Continuous.

2. State-Space Search Strategies:
- Uninformed (Blind) Search:
  * Breadth-First Search (BFS): Complete and optimal for unit step costs; exponential memory O(b^d).
  * Depth-First Search (DFS): Space efficient O(b * m), but neither complete nor optimal.
  * Iterative Deepening Search (IDS): Combines BFS optimality and completeness with DFS linear memory efficiency.
- Informed (Heuristic) Search:
  * Greedy Best-First Search: Evaluates f(n) = h(n) where h(n) estimates cost from node n to goal.
  * A* Search: Evaluates f(n) = g(n) + h(n), where g(n) is known path cost from start to n, and h(n) is admissible heuristic cost to goal.
    Admissibility: h(n) never overestimates the actual cost to reach goal (h(n) <= h*(n)).
    Consistency (Monotonicity): h(n) <= c(n, a, n') + h(n'). Consistent heuristics guarantee A* is optimal using Graph-Search without reopening closed nodes.

3. Adversarial Search and Game Playing:
- Minimax Algorithm: Determines optimal moves in zero-sum, perfect-information two-player games.
- Alpha-Beta Pruning: Prunes branches that cannot influence final decision, reducing effective branching factor from b to sqrt(b) in optimal move ordering.
- Modern approaches: Monte Carlo Tree Search (MCTS) utilizing Upper Confidence Bounds for Trees (UCT) as used in AlphaGo.

4. Knowledge Representation and Logic:
- Propositional Logic: Truth-functional semantics, Resolution refutation proofs, Horn clauses.
- First-Order Logic (FOL): Predicates, functions, universal (∀) and existential (∃) quantifiers. Forward chaining and backward chaining in deductive knowledge bases.
- Semantic Networks and Ontologies: Structured representation of concepts and relationships (is-a, part-of).

5. Classical Expert Systems:
Architecture comprises Knowledge Base (domain rules), Inference Engine (reasoning algorithms), and Working Memory. Utilizes certainty factors to handle probabilistic reasoning.`
  },
  {
    id: 'doc-se-08',
    title: 'Software Engineering: SDLC Methodologies, Architecture Patterns and Quality Assurance',
    subject: 'Software Engineering',
    filename: 'cs305_software_engineering_handbook.txt',
    uploadDate: '2026-09-02',
    wordCount: 760,
    isSeed: true,
    text: `Software Engineering Methodologies and Architecture Design.
Software engineering applies systematic, disciplined, and quantifiable approaches to the development, operation, and maintenance of software systems.

1. Software Development Life Cycle (SDLC):
Phases: Requirements Engineering (elicitation, specification, SRS), Architectural Design, Implementation, Verification & Validation, Deployment, Maintenance.
Process Models:
- Waterfall Model: Linear sequential phases with rigid gates; high cost of late requirement changes.
- Spiral Model: Risk-driven iterative process combining prototyping with systematic milestones.
- Agile & Scrum Methodology: Iterative development organized into 1-4 week Sprints. Roles include Product Owner, Scrum Master, and Development Team. Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective. Artifacts: Product Backlog, Sprint Backlog, Burndown Charts.

2. Software Architecture and Design Patterns:
- Architectural Styles: Layered (n-tier), Event-Driven, Microservices, Hexagonal (Ports & Adapters), Service-Oriented Architecture (SOA).
- Gang of Four (GoF) Design Patterns:
  * Creational: Singleton, Factory Method, Abstract Factory, Builder, Prototype.
  * Structural: Adapter, Decorator, Facade, Composite, Proxy.
  * Behavioral: Observer (Publish-Subscribe), Strategy, Command, Iterator, State.
- SOLID Principles:
  * Single Responsibility Principle (SRP)
  * Open/Closed Principle (OCP)
  * Liskov Substitution Principle (LSP)
  * Interface Segregation Principle (ISP)
  * Dependency Inversion Principle (DIP)

3. Software Quality Assurance and Testing:
Verification asks "Are we building the product right?", Validation asks "Are we building the right product?".
Testing Levels: Unit Testing (isolated functions, mocking), Integration Testing (component interaction), System Testing (end-to-end functionality), Acceptance Testing (UAT).
- White-Box Testing: Code coverage analysis, Cyclomatic Complexity M = E - N + 2P (McCabe metric), basis path testing.
- Black-Box Testing: Equivalence Class Partitioning, Boundary Value Analysis (BVA), State Transition Testing.
- Continuous Integration & Continuous Deployment (CI/CD): Automated build pipelines, regression test suites, containerized deployments.`
  },
  {
    id: 'doc-bio-09',
    title: 'Cellular Biology: Photosynthesis, Cellular Respiration and Genetics',
    subject: 'Biology & Life Sciences',
    filename: 'bio101_cellular_biology_and_genetics.txt',
    uploadDate: '2026-09-04',
    wordCount: 820,
    isSeed: true,
    text: `Foundations of Cellular Biology, Bioenergetics, and Genetics.
Cell biology studies the structural and functional units of living organisms, cellular metabolism, and hereditary transmission of genetic information.

1. Photosynthesis and Chloroplast Bioenergetics:
Photosynthesis converts solar electromagnetic radiation into chemical energy stored in carbohydrates:
Chemical Formula: 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2
- Light-Dependent Reactions (Thylakoid Membranes):
  * Photons excite electrons in Photosystem II (P680) and Photosystem I (P700).
  * Photolysis of water splits H2O -> 2H+ + 2e- + 1/2 O2, replenishing reaction center electrons.
  * Electron Transport Chain generates a proton gradient across the thylakoid lumen, powering ATP Synthase (Photophosphorylation) and reducing NADP+ to NADPH.
- Light-Independent Reactions / Calvin-Benson Cycle (Stroma):
  * Carbon Fixation: Enzyme RuBisCO (ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes CO2 addition to RuBP (5-carbon), producing 3-PGA.
  * Reduction Phase: 3-PGA is phosphorylated and reduced by ATP and NADPH to glyceraldehyde 3-phosphate (G3P).
  * Regeneration of RuBP: Multi-step enzymatic rearrangement consuming ATP enables continuous cycle function. Six turns yield one glucose molecule.

2. Cellular Respiration and Mitochondria:
Catabolic breakdown of glucose to synthesize adenosine triphosphate (ATP):
C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~30-32 ATP
- Glycolysis (Cytoplasm): Anaerobic breakdown of 1 glucose into 2 pyruvate, yielding net 2 ATP and 2 NADH.
- Pyruvate Oxidation and Krebs / Citric Acid Cycle (Mitochondrial Matrix): Generates NADH, FADH2, GTP, and releases CO2.
- Oxidative Phosphorylation and Chemiosmosis (Inner Mitochondrial Membrane): NADH and FADH2 donate electrons down complexes I-IV, pumping protons into the intermembrane space; proton-motive force drives ATP synthesis via ATP synthase (Peter Mitchell Chemiosmotic Hypothesis).

3. Mendelian Genetics and Molecular Biology:
- Central Dogma: DNA replication -> Transcription (mRNA synthesis via RNA Polymerase II) -> Translation (Ribosome polypeptide synthesis with tRNA anticodons).
- Mendel's Laws: Law of Segregation, Law of Independent Assortment.
- Gene Regulation: Operons in prokaryotes (Lac Operon negative/positive control); epigenetics, histone acetylation, and transcription factors in eukaryotes.`
  },
  {
    id: 'doc-econ-10',
    title: 'Principles of Macroeconomics: Inflation, Fiscal Policy and Market Equilibrium',
    subject: 'Economics & Finance',
    filename: 'econ201_macroeconomic_principles.txt',
    uploadDate: '2026-09-05',
    wordCount: 790,
    isSeed: true,
    text: `Macroeconomic Foundations, Aggregate Demand, and Monetary Policy.
Macroeconomics analyzes national economies, price level determination, employment fluctuations, and long-term economic growth.

1. Gross Domestic Product (GDP) and National Accounts:
GDP measures the market value of all final goods and services produced within a country over a specific time period.
Expenditure Equation: Y = C + I + G + (X - M)
- C: Household Consumption expenditures.
- I: Gross Private Domestic Investment in capital and inventories.
- G: Government Purchases on infrastructure, services, and administration.
- (X - M): Net Exports (Exports minus Imports).
- Real GDP adjusts nominal output using the GDP Deflator: Real GDP = (Nominal GDP / GDP Deflator) * 100.

2. Inflation, Deflation and Price Indices:
Inflation represents a sustained, general increase in price levels across the economy, diminishing purchasing power.
- Consumer Price Index (CPI): Weighted basket of consumer goods tracking urban cost of living:
  CPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) * 100.
  Inflation Rate = ((CPI_t - CPI_t-1) / CPI_t-1) * 100.
- Types of Inflation:
  * Demand-Pull Inflation: Aggregate demand exceeds economy's productive capacity (AD shifts right).
  * Cost-Push Inflation: Supply shock increases production costs (AS shifts left), causing stagflation.
- Quantity Theory of Money: M * V = P * Y (Fisher Equation), where M is money supply, V is velocity, P is price level, Y is real output.

3. Monetary Policy and Central Banking:
Central banks (e.g. Federal Reserve, ECB) control liquidity and credit conditions:
- Policy Instruments: Policy interest rate (Fed Funds Rate), Reserve Requirements, Open Market Operations (buying/selling government securities), Quantitative Easing.
- Transmission Mechanism: Lower interest rates reduce borrowing costs, stimulating capital investment and consumer expenditure, boosting aggregate demand.

4. Fiscal Policy and Keynesian Multiplier:
Government adjustments to taxation and public expenditures:
- Fiscal Multiplier: k = 1 / (1 - MPC), where MPC is the Marginal Propensity to Consume.
- Crowding-Out Effect: Elevated government deficit financing increases real interest rates, reducing private sector capital investment.`
  },
  {
    id: 'doc-law-11',
    title: 'Foundations of Law: Contract Law, Torts and Constitutional Principles',
    subject: 'Law & Legal Studies',
    filename: 'law101_foundations_of_legal_systems.txt',
    uploadDate: '2026-09-06',
    wordCount: 810,
    isSeed: true,
    text: `Principles of Jurisprudence, Contractual Obligations, and Tort Liability.
The legal discipline establishes enforceable rules, rights, duties, and institutional frameworks governing civil society and commerce.

1. Essential Elements of Enforceable Contracts:
A legally binding contract requires mutual assent and meeting of the minds (consensus ad idem):
1. Offer: Clear, definite communication of willingness to be bound by specific terms upon acceptance.
2. Acceptance: Unconditional and unequivocal agreement to all terms of the offer (Mirror Image Rule). Qualified responses constitute counter-offers terminating original offer.
3. Consideration: The price bargained for and given in exchange for a promise (quid pro quo). Must be legally sufficient, though courts do not assess economic adequacy.
4. Intention to Create Legal Relations: Presumed in commercial transactions; rebuttably presumed absent in purely domestic or social agreements.
5. Capacity and Legality: Parties must possess legal competence (sound mind, majority age), and the subject matter must not violate statutory prohibitions or public policy.
- Remedies for Breach: Expectation damages (putting plaintiff in position had contract been performed), Specific Performance (equitable relief for unique subject matter like real estate), Rescission, and Injunctions.

2. Law of Torts and Negligence:
Tort law remedies civil wrongs causing harm or loss to individuals:
Four elements of Negligence:
1. Duty of Care: Established via the neighbor principle (Donoghue v Stevenson) or foreseeability and proximity (Caparo test).
2. Breach of Duty: Failure to conform to the standard of conduct expected of a reasonable person (Learned Hand formula: B < PL).
3. Causation: Factual causation proved via the "but-for" test; proximate legal causation ensuring damage is not too remote (Wagon Mound).
4. Actual Damages: Recognizable physical, pecuniary, or psychiatric injury.
- Strict Liability: Liability imposed without fault for abnormally dangerous activities (Rylands v Fletcher) or defective consumer products.

3. Constitutional Law and Separation of Powers:
- Separation of Powers: Tripartite division among Legislative (law-making), Executive (administration), and Judicial (constitutional review) branches.
- Rule of Law: All citizens and state organs are equally subject to publicly promulgated, non-arbitrary legal standards.
- Doctrine of Stare Decisis: Judicial precedent mandates lower courts adhere to binding rulings of superior appellate jurisdictions.`
  },
  {
    id: 'doc-phy-12',
    title: 'General Physics: Classical Mechanics, Thermodynamics and Wave Optics',
    subject: 'Physics & Physical Sciences',
    filename: 'phy101_general_physics_handbook.txt',
    uploadDate: '2026-09-07',
    wordCount: 840,
    isSeed: true,
    text: `Core Principles of Classical Physics, Energy Conservation, and Thermal Physics.
Physics formulates fundamental mathematical laws describing matter, motion, energy, and fundamental forces in the natural universe.

1. Classical Mechanics and Newton's Laws of Motion:
- First Law (Inertia): An object remains at rest or in uniform linear motion unless acted upon by a net external force.
- Second Law: F_net = dp/dt = m * a (for constant inertial mass m).
- Third Law: For every action force, there exists an equal and opposite reaction force (F_AB = -F_BA).
- Conservation Laws:
  * Conservation of Linear Momentum: When net external force is zero, total momentum is conserved.
  * Conservation of Mechanical Energy: In conservative force fields, Total Mechanical Energy E = Kinetic Energy (1/2 m v^2) + Potential Energy U(x) remains constant.
  * Work-Energy Theorem: Net work done on a body equals change in its kinetic energy: W_net = ΔK.

2. Laws of Thermodynamics:
- Zeroth Law: If bodies A and B are each in thermal equilibrium with body C, then A and B are in thermal equilibrium with each other (defines Temperature).
- First Law (Conservation of Energy): ΔU = Q - W, where ΔU is change in internal energy, Q is heat added to system, and W is work done by system.
- Second Law: Heat flows spontaneously from higher to lower temperature bodies; in an isolated system, entropy never decreases (ΔS_isolated >= 0).
  * Carnot Efficiency: Maximum theoretical efficiency for heat engine operating between reservoirs at temperatures T_H and T_C: η_Carnot = 1 - (T_C / T_H).
- Third Law: As thermodynamic temperature approaches absolute zero (0 Kelvin), system entropy approaches a minimum constant value.

3. Wave Motion, Electromagnetism and Optics:
- Wave Equation: v = f * λ (velocity = frequency * wavelength).
- Interference and Superposition: Wave amplitudes sum constructively or destructively depending on phase difference Δφ = (2π/λ) * Δx.
- Maxwell's Equations: Unify electricity, magnetism, and optics into wave propagation at speed of light c = 1 / sqrt(μ0 * ε0):
  1. Gauss's Law for Electricity: ∇ · E = ρ / ε0.
  2. Gauss's Law for Magnetism: ∇ · B = 0 (no magnetic monopoles).
  3. Faraday's Law of Induction: ∇ × E = -∂B/∂t.
  4. Ampère-Maxwell Law: ∇ × B = μ0 * J + μ0 * ε0 * (∂E/∂t).`
  }
];
