let locallyStored = localStorage.getItem("written"); // to verify if notes exist
let counter = 0; // to count number of loading iteration before interrupt
let perfectScore = 95;

let devMode = false;

class Branch{
    constructor(activity, name, max, root, desc=""){
        this.name = name;
        this.activity = activity.split('-');
        this.max = max;
        this.level = this.activity.length
        this.notes = [];
        this.highest = -1;
        this.avg = -1;
        this.total = -1;
        this.root = root;
        this.desc = desc;
    }

    getAllNotes(){
        if(this.level>1){ return this.notes; }
        else{ return this.notes.concat(root.getAllNotes()); }
    }

    calcNotes(){
        let notes = this.getAllNotes();
        if(notes.length!=0){
            this.highest = Math.max(...notes);
            this.avg = notes.reduce((a, b) => (a + b)) / notes.length;
            this.total = (this.highest/2) + (this.avg/2);
        }
    }
}

function getBranchesEmpty(setting){
    // branches
    A1= new Branch("A1", "Analyse", 11500, undefined, "Analyse et spécification fonctionnelle du projet de création logicielle");
    A2= new Branch("A2", "Conception", 9100, undefined, "Conception de l’architecture logicielle");
    A3= new Branch("A3", "Developpement", 21000, undefined, "Développement de la solution logicielle");
    A4= new Branch("A4", "Test", 7000, undefined, "Test et mise en production de la solution logicielle");
    A5= new Branch("A5", "Maintenance", 3000, undefined, "Maintenance et évolution de la solution logicielle");
    A6= new Branch("A6", "Management", 8400, undefined, "Pilotage du projet en création logicielle et management des équipes");
    A7= new Branch("A7", "English", 20000, undefined, "English");
    A8= new Branch("A8", "Soft skills", 20020, undefined, "Soft Skills");


    A1_1= new Branch("A1-1", "Marche", 3500, A1, "Analyse des besoins d’un marché");
    A1_2= new Branch("A1-2", "Client", 3500, A1, "Analyse des besoins spécifiques d’un client");
    A1_3= new Branch("A1-3", "Cadrage", 4500, A1, "Cadrage du projet auprès des parties prenantes");

    A2_1= new Branch("A2-1", "Achitecture", 2450, A2, "Conception de l’architecture logicielle");
    A2_2= new Branch("A2-2", "Ressources", 2450, A2, "Identification des ressources utiles à la conception du logiciel");
    A2_3= new Branch("A2-3", "Securite", 2625, A2, "Anticipation des risques et gestion de la sécurité");
    A2_4= new Branch("A2-4", "Arbitrage", 1575, A2, "Arbitrage technologique");

    A3_1= new Branch("A3-1", "Tests", 2000, A3, "Développement des tests et des indicateurs de production");
    A3_2= new Branch("A3-2", "Code", 11500, A3, "Développement du code source");
    A3_2_C2= new Branch("A3-2-C2", "Mise en oeuvre", 4500, A3_2, "Mettre en œuvre le développement de tous types de logiciels sur tous types de matériels et supports, tout en faisant preuve d’une capacité d’anticipation face aux évolutions technologiques, pour obtenir une solution optimale de mise en œuvre en réponse au besoin défini.");
    A3_3= new Branch("A3-3", "UI", 5000, A3, "Développement de l’interface utilisateur");
    A3_4= new Branch("A3-4", "Securite", 2500, A3, "Mise en œuvre des bonnes pratiques de sécurité");

    A4_1= new Branch("A4-1", "Test", 4375, A4, "Test de la solution logicielle");
    A4_2= new Branch("A4-2", "Mise en production", 2625, A4, "Mise en production du logiciel");

    A5_1= new Branch("A5-1", "Corrective", 1000, A5, "Maintenance corrective du logiciel ");
    A5_2= new Branch("A5-2", "Evolutive", 1000, A5, "Maintenance évolutive du logiciel ");
    A5_3= new Branch("A5-3", "Suivi", 1000, A5, "Suivi de la conformité réglementaire");

    A6_1= new Branch("A6-1", "Pilotage", 1800, A6, "Pilotage du projet de création logicielle");
    A6_2= new Branch("A6-2", "Veille", 800, A6, "Veille technologique");
    A6_3= new Branch("A6-3", "Management", 4800, A6, "Management d’une équipe pluridisciplinaire autour d’un projet de création logicielle");
    A6_4= new Branch("A6-4", "Communication", 1000, A6, "Communication avec les parties prenantes");

    A7_1= new Branch("A7-1", "Speaking", 6000, A7, "English speaking");
    A7_2= new Branch("A7-2", "Listening", 4000, A7, "English listening");
    A7_3= new Branch("A7-3", "Writing", 6000, A7, "English writing");
    A7_4= new Branch("A7-4", "Reading", 6000, A7, "English reading");

    A8_1= new Branch("A8-1", "Positure", 7150, A8, "Posture");
    A8_1_2= new Branch("A8-1-2", "Apprendre", 1430, A8_1, "Apprendre à apprendre");
    A8_2= new Branch("A8-2", "Communication", 5720, A8, "Communication");
    A8_3= new Branch("A8-3", "Resolution de problemes", 7150, A8, "Résolution de problèmes");


    // leaves
    A1_1_C1= new Branch("A1-1-C1", "Besoins", 2250, A1_1, "Analyser les besoins exprimés et problématiques rencontrées par le marché pouvant faire l’objet de la création d’un logiciel en s’appuyant sur une démarche scientifique et méthodique (collecte de faits, hypothèses, identification des parties prenantes et futurs utilisateurs, tests et résultats) et en faisant preuve d’esprit d’analyse et de synthèse afin de faire remonter l’expérience utilisateurs et ainsi définir les objectifs à atteindre.");
    A1_1_C2= new Branch("A1-1-C2", "Valider", 1250, A1_1, "Valider le besoin identifié sur un marché, en prenant en compte les influences des différentes composantes de l’environnement (technologique -économique – politique – juridique – sociologique – écologique – démographique …) afin de s’assurer de sa véracité, sa faisabilité technique et sa viabilité économique.");

    A1_2_C1= new Branch("A1-2-C1", "Client", 1250, A1_2, "Analyser la demande du client, en l’interrogeant sur son contexte, ses problématiques liées à son activité, ses enjeux, ses contraintes et ses objectifs afin d’appréhender le périmètre de sa demande et obtenir un premier cadrage du futur logiciel.");
    A1_2_C2= new Branch("A1-2-C2", "Besoins", 2250, A1_2, "Analyser les besoins opérationnels du client en l’accompagnant dans l’identification des usages et des bénéfices attendus afin de faire émerger les idées de fonctionnalités.");

    A1_3_C1= new Branch("A1-3-C1", "Accompagner", 2250, A1_3, "Accompagner les entités dirigeantes et parties prenantes du logiciel dans le choix des solutions à développer en relevant les avantages et inconvénients de chacune, en faisant preuve de vulgarisation du langage employé sur les technologies, en confirmant la bonne compréhension des enjeux et des attendus liés au projet de création logicielle pour définir plus précisément les usages qui en seront faits.");
    A1_3_C2= new Branch("A1-3-C2", "Dossier", 2250, A1_3, "Réaliser un dossier de conception et de développement du logiciel souhaité, en prenant en compte les objectifs définis, les fonctionnalités et spécifications à mettre en œuvre, les coûts inhérents au développement et à l’exploitation du logiciel, tout en restant force de proposition de nouvelles solutions issues d’une veille réalisée sur les innovations du marché afin de formaliser de façon optimale le cahier des charges du projet.");

    A2_1_C1= new Branch("A2-1-C1", "Concevoir", 1575, A2_1, "Concevoir l’architecture du logiciel souhaité en collaboration avec les équipes de développeurs, en divisant et isolant ses différentes couches (de l’interface utilisateur jusqu’au cœur des règles métier) afin de faciliter le développement, l’évolution, le déploiement et la maintenance de celui-ci.");
    A2_1_C2= new Branch("A2-1-C2", "Modeliser", 875, A2_1, "Modéliser les interactions homme-machine nécessaires à l’utilisation efficace du logiciel, en hiérarchisant les informations affichées et définissant l’enchainement des tâches, afin de concevoir une interface utilisateur ergonomique garantissant une expérience utilisateur optimale.");

    A2_2_C1= new Branch("A2-2-C1", "Definir", 875, A2_2, "Définir l’approche de programmation optimale en choisissant les plateformes, les langages, les algorithmes, les matériels et technologies les plus adaptés en fonction des demandes et des solutions identifiées afin de préparer au mieux le développement du logiciel.");
    A2_2_C2= new Branch("A2-2-C2", "Choisir", 875, A2_2, "Identifier et choisir l’ensemble des outils, logiciels et ressources (matérielles, budgétaires…) nécessaires au développement du logiciel afin d’organiser de façon optimale l’ensemble des étapes du projet de création et de développement du logiciel.");
    A2_2_C3= new Branch("A2-2-C3", "Selectionner", 350, A2_2, "Identifier et sélectionner les compétences complémentaires nécessaires à la réalisation du projet (graphistes, traducteurs, experts métiers…) afin de couvrir, avec une approche pluridisciplinaire, tous les besoins liés au projet de création logicielle.");
    A2_2_C4= new Branch("A2-2-C4", "Verifier", 350, A2_2, "Vérifier les conséquences juridiques liées à l’utilisation de logiciels existants, notamment open source, dans la solution finale afin de s’assurer de sa compatibilité avec la politique de licences de l’entreprise.");

    A2_3_C1= new Branch("A2-3-C1", "Anticiper", 875, A2_3, "Détecter en les anticipant, les risques liés à des inconnues technologiques (maturité, obsolescence, pérennité…) et réglementaires (RGPD, certifications, traçabilité, vie privée) pouvant intervenir lors des différentes phases du projet afin de les éliminer.");
    A2_3_C2= new Branch("A2-3-C2", "Prototyper", 875, A2_3, "Réaliser les prototypes ou preuves de concept (POC) de nature à dissiper les inconnues technologiques afin de confirmer ou d’infirmer le travail de conception.");
    A2_3_C3= new Branch("A2-3-C3", "Modeliser", 875, A2_3, "Modéliser l’ensemble des données de l’application afin de faciliter leur manipulation et d’assurer leur persistance ainsi que leur sécurité (intrusion, utilisation malveillante, surface d’attaque…).");

    A2_4_C1= new Branch("A2-4-C1", "Choisir", 1575, A2_4, "Identifier et choisir les briques technologiques les plus adaptées au projet, en sélectionnant celles à créer et celles à utiliser (librairies, open source…), afin d’optimiser le développement (coûts, délais…).");

    A3_1_C1= new Branch("A3-1-C1", "Rediger", 1000, A3_1, "Rédiger les plans de test du projet de développement du logiciel en identifiant l’ensemble des tests nécessaires à la vérification du bon fonctionnement du code afin de les exécuter de façon automatisée et systématique et ainsi garantir l’absence de régression.");
    A3_1_C2= new Branch("A3-1-C2", "Indicateurs", 1000, A3_1, "Elaborer des indicateurs de suivi de production permettant de contrôler le bon fonctionnement du logiciel à grande échelle afin d’anticiper ou de détecter au plus tôt la survenue d’une panne.");

    A3_2_C1= new Branch("A3-2-C1", "Rediger", 4500, A3_2, "Sélectionner ou concevoir les algorithmes les plus pertinents afin de satisfaire les tests unitaires et garantir la stabilité et la performance du système.");
    A3_2_C2_1= new Branch("A3-2-C2-1", "Functional", 1125, A3_2_C2, "Functional programming (F#, LINQ, ...)");
    A3_2_C2_2= new Branch("A3-2-C2-2", "Imperative", 1125, A3_2_C2, "Imperative programming (C#, Go, Rust, ...)");
    A3_2_C2_3= new Branch("A3-2-C2-3", "Dynamic", 1125, A3_2_C2, "Dynamically typed programming languages (JavaScript, HTML, CSS, ...)");
    A3_2_C2_4= new Branch("A3-2-C2-4", "AI", 1125, A3_2_C2, "DeepLearning");
    A3_2_C3= new Branch("A3-2-C3", "Rediger", 2500, A3_2, "Optimiser le code source du logiciel en réalisant des opérations de « réusinage » et en exploitant les résultats des différents tests réalisés lors de son développement afin d’augmenter la lisibilité et maintenabilité du code et de réduire la consommation des diverses ressources (mémoire, disque, processeur, énergie…) et ainsi garantir sa performance (temps de réponse…).");

    A3_3_C1= new Branch("A3-3-C1", "Interractions", 2500, A3_3, "Programmer les interactions entre les différents composants visuels de l’interface décrites dans la spécification afin de présenter à l’utilisateur l’information pertinente de façon intuitive.");
    A3_3_C2= new Branch("A3-3-C2", "Responsivite", 2500, A3_3, "Assurer l’interactivité et la responsivité du logiciel par l’utilisation de frameworks et langages de programmation adaptés afin de le rendre dynamique et navigable sur les différentes plateformes visées (PC, Mac, mobiles, tablettes …) quelles que soient la taille et l’orientation de l’écran.");

    A3_4_C1= new Branch("A3-4-C1", "Deployer", 2500, A3_4, "Déployer les solutions techniques retenues pour ne pas introduire de vulnérabilité et réduire au maximum la surface d’attaque.");

    A4_1_C1= new Branch("A4-1-C1", "Concevoir", 875, A4_1, "Concevoir l’environnement de test, en définissant les indicateurs de performance en fonction des résultats attendus et des facteurs de décisions (montée en charge…) pour valider la cohérence avec le cahier des charges.");
    A4_1_C2= new Branch("A4-1-C2", "Mise en oeuvre", 875, A4_1, "Mettre en œuvre les phases de test béta, en situation réelle auprès d’un échantillon représentatif d’utilisateurs pour permettre de sécuriser le lancement à grande échelle.");
    A4_1_C3= new Branch("A4-1-C3", "Conformite", 875, A4_1, "Vérifier la conformité des résultats obtenus dans l’environnement final en mettant en œuvre la phase de test d’intégration afin d’assurer la validité de l’aspect fonctionnel, des performances et de la fiabilité du logiciel.");
    A4_1_C4= new Branch("A4-1-C4", "Intrusion", 875, A4_1, "Mettre en œuvre la phase de test de pénétration (ou intrusion) en simulant des attaques non autorisées en interne et en externe sur les différents niveaux de l’application logicielle afin de vérifier le niveau de sécurité lié à l’accès aux données sensibles de celle-ci.");
    A4_1_C5= new Branch("A4-1-C5", "Jeux d'essais", 875, A4_1, "Mettre en œuvre les jeux d’essais et de tests du logiciel dans le respect des plans de test élaborés afin d’établir des indicateurs sur la stabilité du logiciel et garantir la satisfaction des utilisateurs.");

    A4_2_C1= new Branch("A4-2-C1", "Automatiser", 875, A4_2, "Automatiser les tâches récurrentes afin de rendre systématique les étapes de la production du logiciel et ainsi éviter les risques d’erreurs humaines.");
    A4_2_C2= new Branch("A4-2-C2", "Rediger", 875, A4_2, "Rédiger les documentations techniques, en français ou en anglais, à destination de l’équipe de maintenance afin de faire le transfert de compétences dans les meilleures conditions, et à destination de l’équipe d’exploitation afin de faciliter le fonctionnement du logiciel au quotidien et de rendre plus efficace la résolution de problèmes.");
    A4_2_C3= new Branch("A4-2-C3", "Mise en production", 875, A4_2, "Suivi de la conformité réglementaire");

    A5_1_C1= new Branch("A5-1-C1", "Corrective", 1000, A5_1, "Assurer la maintenance corrective du logiciel et anticiper l’obsolescence des technologies au travers d’une veille active afin de ne pas accumuler de la dette technique.");
    A5_2_C1= new Branch("A5-2-C1", "Evolutive", 1000, A5_2, "Assurer la maintenance évolutive du logiciel en s’appuyant sur une veille des nouveaux usages et des nouveaux cyber-risques tout en prenant en compte les retours d’expérience et en saisissant les opportunités d’amélioration du code pour anticiper les attentes du client/marché.");
    A5_3_C1= new Branch("A5-3-C2", "Suivi", 1000, A5_3, "Assurer la mise à jour de la solution logicielle au regard des évolutions réglementaires afin de lui permettre de maintenir sa conformité (RGPD…).");
    
    A6_1_C1= new Branch("A6-1-C1", "Responsibilites", 1000, A6_1, "Définir et répartir les tâches, rôles et responsabilités de chaque collaborateur en lien avec le projet de création logicielle, en fixant et en priorisant des indicateurs à suivre (qualité du livrable, dépassement du budget, du temps…) afin de permettre le partage de compétences, d’expériences et d’informations utile à l’atteinte des objectifs individuels et collectifs.");
    A6_1_C2= new Branch("A6-1-C2", "Outils", 400, A6_1, "Concevoir des outils de pilotage et de suivi permettant de contrôler la mise en œuvre ou l’adaptation du projet en collaborant avec des développeurs présents ou à distance afin d’assurer l’atteinte des objectifs visés en termes de qualité et délais définis par le cahier des charges.");
    A6_1_C3= new Branch("A6-1-C3", "Indicateurs", 400, A6_1, "Assurer le suivi des indicateurs et la rédaction des rapports afin d’assurer à toutes les parties prenantes l’accès au même niveau d’information et de les alerter le cas échéant.");

    A6_2_C1= new Branch("A6-2-C1", "Veille", 400, A6_2, "Réaliser une veille technologique sur les innovations permettant d’apporter des plus-values à la solution logicielle en vue d’intégrer de nouvelles fonctionnalités ou des gains d’efficacité.");
    A6_2_C2= new Branch("A6-2-C2", "Opportunites", 400, A6_2, "Décider et mettre en œuvre les nouvelles opportunités identifiées par le travail de veille, auprès des développeurs tout en faisant valider leur pertinence.");

    A6_3_C1= new Branch("A6-3-C1", "Organiser", 1000, A6_3, "Organiser la collaboration de l’équipe en télétravail ou en face à face, en permettant à chacun d’exprimer ses idées et de proposer des solutions aux difficultés rencontrées afin de renforcer le travail coopératif.");
    A6_3_C2= new Branch("A6-3-C2", "Collaboration", 1800, A6_3, "Elaborer les conventions et règles de fonctionnement destinées à l’équipe en charge du développement du logiciel (étapes clés, styles de code à employer, bonnes pratiques à respecter…) afin d’assurer un travail collaboratif efficace garant de l’atteinte des objectifs fixés.");
    A6_3_C3= new Branch("A6-3-C3", "Prevenir", 1000, A6_3, "Prévenir et gérer l’ensemble des risques et des imprévus (situations difficiles, conflits…) en adaptant avec agilité et créativité les étapes et les actions du projet afin d’apporter des solutions partagées et ainsi assurer la continuité du projet dans des conditions optimales.");
    A6_3_C4= new Branch("A6-3-C4", "Productivite", 1000, A6_3, "Identifier les gains de productivité possibles en lien avec les parties prenantes dédiées au projet en détectant les opportunités d’automatisation des différentes tâches et activités réalisées ou à réaliser afin d’assurer l’atteinte des objectifs dans les délais imposés.");

    A6_4_C1= new Branch("A6-4-C1", "Parties prenantes", 1000, A6_4, "Transmettre les messages auprès des différentes parties prenantes, en prenant soin d’adapter son vocabulaire au niveau de connaissances de ses interlocuteurs, en vulgarisant si nécessaire les informations techniques pour permettre une communication fluide et efficace.");

    //notation changes from here on out for some reason
    A7_1_1= new Branch("A7-1-1", "Precision", 2000, A7_1, "Exprimer ses idées avec précision");
    A7_1_2= new Branch("A7-1-2", "Vocabulaire", 2000, A7_1, "Utiliser un vocabulaire riche");
    A7_1_3= new Branch("A7-1-3", "TED Talks", 2000, A7_1, "Animer des TED Talks");

    A7_2_1= new Branch("A7-2-1", "Media", 2000, A7_2, "Comprendre tout type de supports audio ou vidéo");
    A7_2_2= new Branch("A7-2-2", "Accents", 2000, A7_2, "Comprendre les accents inhabituels");

    A7_3_1= new Branch("A7-3-1", "Precision", 2000, A7_3, "Exprimer ses idées avec précision");
    A7_3_2= new Branch("A7-3-2", "Vocabulary", 2000, A7_3, "Utiliser un vocabulaire riche");
    A7_3_3= new Branch("A7-3-3", "Structure", 2000, A7_3, "Rédiger et structurer un texte");

    A7_4_1= new Branch("A7-4-1", "Complex", 2000, A7_4, "Comprendre des textes longs et complexes");
    A7_4_2= new Branch("A7-4-2", "Vocabulary", 2000, A7_4, "Maîtriser un vocabulaire riche");

    A8_1_1= new Branch("A8-1-1", "Precision", 1430, A8_1, "Avoir confiance en soi et s’affirmer");
    A8_1_2_1= new Branch("A8-1-2-1", "Reading list", 300, A8_1_2, "Reading List");
    A8_1_3= new Branch("A8-1-3", "Enterprendre", 1430, A8_1, "Entreprendre, oser, se lancer");
    A8_1_4= new Branch("A8-1-4", "Se connaitre", 1430, A8_1, "Se connaître pour révéler son potentiel");
    A8_1_5= new Branch("A8-1-5", "Savoir-etre", 1430, A8_1, "Se démarquer par son savoir-être");

    A8_2_1= new Branch("A8-2-1", "Oral", 1430, A8_2, "Communiquer efficacement à l’oral");
    A8_2_2= new Branch("A8-2-2", "Ecrit", 1430, A8_2, "Communiquer efficacement à l’écrit");
    A8_2_3= new Branch("A8-2-3", "Differences culturells", 1430, A8_2, "Comprendre les différences culturelles");
    A8_2_4= new Branch("A8-2-4", "E-reputation", 1430, A8_2, "Maîtriser sa e-reputation");

    A8_3_1= new Branch("A8-3-1", "Reformuler", 1430, A8_3, "Poser et reformuler des problèmes ");
    A8_3_2= new Branch("A8-3-2", "Decomposer", 1430, A8_3, "Décomposer des problèmes");
    A8_3_3= new Branch("A8-3-3", "Curiosite", 1430, A8_3, "Faire preuve de curiosité et créativité.");
    A8_3_4= new Branch("A8-3-4", "Visualiser", 1430, A8_3, "Visualiser un problème à plusieurs échelles");
    A8_3_5= new Branch("A8-3-5", "Generaliser", 1430, A8_3, "Transformer des cas particuliers en règles génériques");

    switch(setting){
        case "leaves":
            return [A1_1_C1, A1_1_C2, 
                    A1_2_C1, A1_2_C2, 
                    A1_3_C1, A1_3_C2, 
        
                    A2_1_C1, A2_1_C2, 
                    A2_2_C1, A2_2_C2, A2_2_C3, A2_2_C4, 
                    A2_3_C1, A2_3_C2, A2_3_C3, 
                    A2_4_C1, 
        
                    A3_1_C1, A3_1_C2, 
                    A3_2_C1, 
                    A3_2_C2_1, A3_2_C2_2, A3_2_C2_3, A3_2_C2_4, 
                    A3_2_C3, 
                    A3_3_C1, A3_3_C2, 
                    A3_4_C1,
        
                    A4_1_C1, A4_1_C2, A4_1_C3, A4_1_C4, A4_1_C5, 
                    A4_2_C1, A4_2_C1, A4_2_C1, 
        
                    A5_1_C1, A5_2_C1, A5_3_C1, 
                    
                    A6_1_C1, A6_1_C2, A6_1_C3, 
                    A6_2_C1, A6_2_C2, 
                    A6_3_C1, A6_3_C2, A6_3_C3, A6_3_C4, 
                    A6_4_C1, 
        
                    A7_1_1, A7_1_2, A7_1_3,
                    A7_2_1, A7_2_2,
                    A7_3_1, A7_3_2, A7_3_3,
                    A7_4_1, A7_4_2,
        
                    A8_1_1, A8_1_2_1, A8_1_3, A8_1_4, A8_1_5, 
                    A8_2_1, A8_2_2, A8_2_3, A8_2_4, 
                    A8_3_1, A8_3_2, A8_3_3, A8_3_4, A8_3_5
                ]
            case "full":
                return [
                    A1, A2, A3, A4, A5, A6, A7, A8, 
                    A1_1, A1_2, A1_3, 
                    A2_1, A2_2, A2_3, A2_4, 
                    A3_1, A3_2, A3_2_C2, A3_3, A3_4, 
                    A4_1, A4_2, 
                    A5_1, A5_2, A5_3, 
                    A6_1, A6_2, A6_3, A6_4, 
                    A7_1, A7_2, A7_3, A7_4,
                    A8_1, A8_1_2, A8_2, A8_3, 
                    
                    A1_1_C1, A1_1_C2, A1_2_C1, A1_2_C2, A1_3_C1, A1_3_C2, 

                    A2_1_C1, A2_1_C2, A2_2_C1, A2_2_C2, A2_2_C3, A2_2_C4, 
                    A2_3_C1, A2_3_C2, A2_3_C3, A2_4_C1, 

                    A3_1_C1, A3_1_C2, A3_2_C1, A3_2_C2_1, A3_2_C2_2, A3_2_C2_3, 
                    A3_2_C2_4,  A3_2_C3, A3_3_C1, A3_3_C2, A3_4_C1, 
                    
                    A4_1_C1, A4_1_C2, A4_1_C3, A4_1_C4, A4_1_C5, 
                    A4_2_C1, A4_2_C2, A4_2_C3, 
                    
                    A5_1_C1, A5_2_C1, A5_3_C1, 
                    
                    A6_1_C1, A6_1_C2, A6_1_C3, A6_2_C1, A6_2_C2, 
                    A6_3_C1, A6_3_C2, A6_3_C3, A6_3_C4, A6_4_C1, 
                    
                    A7_1_1, A7_1_2, A7_1_3, A7_2_1, A7_2_2,
                    A7_3_1, A7_3_2, A7_3_3, A7_4_1, A7_4_2,
        
                    A8_1_1, A8_1_2_1, A8_1_3, A8_1_4, A8_1_5, 
                    A8_2_1, A8_2_2, A8_2_3, A8_2_4, 
                    A8_3_1, A8_3_2, A8_3_3, A8_3_4, A8_3_5
                ]
            default:
                console.log("Error: getBranch setting not found !")
                return 0;
    }   
}

function findMissing(){
    let tree = getBranchesEmpty("full");
    let leaves = getBranchesEmpty("leaves");

    for(leaf of leaves){
        leafAct = leaf.activity.join('')
        for(i in tree){
            branchAct = tree[i].activity.join('')

            if(leafAct.includes(branchAct)){
                tree[i].max -= leaf.max;
                // if(tree[i].max == 0){
                //     tree.splice(i, 1); 
                // }
            }
        }
    }

    for(branch of tree){
        console.log("Branch: " + branch.activity.join("-") + ", Missing: " + branch.max);
    }
}

function round(num){ 
    if(num==-1){ return "-"}
    else{ return Math.round((num + Number.EPSILON) * 100) / 100 }
}

//function that updates and writes content
function update(boo) {
    if (locallyStored === null && boo) {
        //getting json from chrome storage
        chrome.storage.sync.get("notes", ({
            notes
        }) => {
            localStorage.setItem('note', notes);
        });

        let json = localStorage.getItem("note");
        localStorage.removeItem("note");
        // verifying if chrome storage is not empty, if empty either page loaded without the extension installed or just not set because of tab change and so resetting it.
        if (json == "undefined" && counter <= 5){
            tryGet();
            document.getElementById("outputBody").innerHTML += "loading../"
            counter++;
            return;
        }else if ( counter > 5){
            document.getElementById("outputBody").innerHTML = "The page needs to be reloaded. <br> tip : the page needs to be loaded with the extension installed"
            counter=0;
        }

        //data preparation
        let notes = JSON.parse(json);

        let leaves = getBranchesEmpty("leaves");

        for(note of notes){
            for(i in leaves){
                if(leaves[i].activity.join('-').includes(note.Activity[0])){
                    leaves[i].notes.push(parseInt(note.Percentage));
                }
            }
        }

        //pushing data on webpage
        html = "";
        html += "<table><tr> <th class='left'>Activity</th> <th class='right'>Highest</th> <th class='right'>Average</th> <th class='right'>Total</th> </tr></table>"

        lastRoot = leaves[0].activity[0];
        sum = 0;

        for (leaf of leaves) {
            leaf.calcNotes();
            //console.log(leaf);

            if(lastRoot != leaf.activity[0]){
                html += "<div style='height:5px;'></div>";
                lastRoot = leaf.activity[0];
            }
            html += "<table class='";

            if(leaf.total==-1){
                html += "blue'><tr>";
            }else if (leaf.highest >= perfectScore) {
                html += "green'><tr>";
            } else if (leaf.total >= 50) {
                html += "orange'><tr>";
            } else {
                html += "red'><tr>";
            }

            total = leaf.Highest / 2 + leaf.Average / 2;

            html += "<td class='left' title='" + leaf.desc + "'>" + leaf.activity.join('-') + "</td>";
            html += "<td class='right'>" + round(leaf.highest) + "</td>";
            html += "<td class='right'>" + round(leaf.avg) + "</td>";
            html += "<td class='right'>" + round(leaf.total) + "</td>";

            html += "</tr></table>";

            //sum += leaf.total / 100 * leaf.max;
        }

        
        //html += "<table></tr> <td class='end'>Total points: </td> <td class='end'>" + round(sum) + "</td> </tr></table>"

        document.getElementById("outputBody").innerHTML = html;

        //saving html so that if popup closed and reopened, no data scraping waiting time
        localStorage.setItem('written', html);
    } else {
        document.getElementById("outputBody").innerHTML = locallyStored;
    }
};


//===================


//verifying if should run update() and if data scraping has already happened
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, tabs => {
    localStorage.setItem('url', tabs[0].url);
    if (checkURL()) {
    } else if (locallyStored === null) {
        setTimeout(() => {
            update(true);
        }, 1300);
    } else {
        update(false);
    }
});

//checking if you are on algosup's website and in the evaluations part
function checkURL(){
    if(devMode){return false}
    let url = localStorage.getItem("url")
    if (url != "https://skills.algosup.com/evaluations" && url != "https://skills.algosup.com/activities"){
        document.getElementById("outputBody").innerHTML += "your are on '" + url + "', please open it on <a target='_blank' rel='noopener noreferrer' href='https://skills.algosup.com/evaluations'>evaluations</a> or on on <a target='_blank' rel='noopener noreferrer' href='https://skills.algosup.com/activities'>activities</a>"
        return true;
    }else{
        return false;
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// refresh button handling, shouldn't be useful but people love placebo effet, wake up ! if website is to be reloaded, do so.
document.getElementById("update").addEventListener("click", async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: update_data,
    });
    if (!checkURL()) {
        setTimeout(() => {
            update(true);
        }, 200);
    }
});

// if you want to hard reset data, shouldn't be useful either. Placebo yo yo !
document.getElementById("clear").addEventListener("click", async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
});

// The body of this function will be executed as a content script inside the
// current page (algosup)
function update_data() {
    get();
}

// real auto-update function.
async function tryGet() {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: update_data,
    });
    if (!checkURL()) {
        setTimeout(() => {
            update(true);
        }, 1200);
    }
}
