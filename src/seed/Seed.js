const {ObjectID} = require('mongodb');

const {Philosopher} = require('models/Philosopher');
const {Quote} = require('models/Quote');
const {Topic} = require('models/Topic');
const {User} = require('models/User');

const PhilosopherService = require('services/PhilosopherService');
const QuoteService = require('services/QuoteService');
const TopicService = require('services/TopicService');
const UserService = require('services/UserService');

const Logger = require('helpers/LoggerHelper');

const philosophers = [
    {
        "name" : "Aristotle",
        "categories" : [
            "METAPHYSICS",
            "ETHICS",
            "EPISTEMOLOGY",
            "AESTHETICS"
        ],
        "description" : "A philosopher, scientist, historian and the teacher of Alexandre the Great, Aristotles teachings remain immensly influential in our cultlure. He was first to start a systematic classification of schientific exploits of his time laying basis for many branches of science. His philosophical views are less rigid and more dialictical than those of Plato, as was his vision of politics, with an enlightened ruler, such as Alexandre, at the head of a state."
    },
    {
        "name" : "Socrates",
        "categories" : [
            'METAPHYSICS',
            'ETHICS',
            'EPISTEMOLOGY'
        ],
        "description" : "The father of modern Western philosophy, Socrates also developed some basic logical methods that were further developed by his successors, Plato and Aristotle, and which modern science uses up till now. His dialectical method, also known as the Socratic method, lies at the basis of European critical free-thiking. Unfortunately it also cost Socrates his life eventually, as his undermining critical view of his contemporary morals and politics became increasingly threatening to the Athens authorities."
    },
    {
        "name" : "Protagoras",
        "categories" : [
            'EPISTEMOLOGY',
            'ETHICS'
        ],
        "description" : "Protagoras was sophist philosopher and a contemporary of Plato. As the Platonic, and later Christian, views prevailed, every divergent thinking was pushed into oblivion and even destroyed. All we have left of Protagoras are a few facts and phrases preserved in bias reports by his winning opponents. Yet this gives us a notion of a daring relativist who opted to blade run the ethical dilemmas of human condition while irreputable truths were still a norm."
    },
    {
        "name" : "Saint Augustine",
        "categories" : [
            'ETHICS',
            'THEOLOGY'
        ],
        "description" : "A prominent theologician and one of the most respected fathers of the Christian church, Saint-Augustine began as a decadent and a neo-Platonic philosopher only to turn to faith later. Due to his effort, the Platonic ideas became thouroughly incorporated into the Western Christianity. His original ideas, that survive up till today, are of the divine grace, the original sin, the just war and the very concept of the Holy Trinity. His concept of the two cities, one of the the immortal holy city of God, goes along the lines of the platonic story of the cave and the bright world of immortal devine ideas."
    },
    {
        "name" : "Nietzsche",
        "categories" : [
            'ETHICS',
            'THEOLOGY',
            'METAPHYSICS'
        ],
        "description" : "The first famous nihilist with a rather troublesome relationship with the God gather-figure, Nietzsche is charched with inventing the ubermensch and inspiring Wagner and Hitler alike. His famous announcement that -God is dead and we killed him- heralded the niew atheistic and existentialist attitude towards reality. His answer to the problem was to promote the idea of ubermensch, a new sort of human being unbounded by conventional morals and ideas. An idea that appealed to the nazi culture and led to redesigning of Western morals."
    },
    {
        "name" : "Plato",
        "categories" : [
            'POLITICS',
            'EPISTEMOLOGY',
            'METAPHYSICS',
            'AESTHETICS'
        ],
        "description" : "A student of Socrates, an idealist and a hater of women. His ideal of state system was a caste-based dictatorship. His most prominent legacy is a a notion of this world being build as a reflection of a perfect world of ideas, or pattern for all things present. Still can be traced in various ways of thinking in modern culture."
    },
    {
        "name" : "Kant",
        "categories" : [
            'ETHICS',
            'EPISTEMOLOGY',
            'METAPHYSICS',
            'AESTHETICS'
        ],
        "description" : "A German classic philosopher to whom we owe many ideas behind the Declaration of Human rights, Kant saw reason as the main unifying characteristic of human species. Rationality was the basis of his idea of faith, religion and ethics, too. Morality was in direct connecion with reason and as such - its logical outcome. Kant made an important contribution to the theory of cognition and science by his notion of ding an sich, a true natural object that we cannot penetrate but only learn by proxy, by a mental construct due to our physical limitations (e.g. nuclear physics or black holes)."
    },
    {
        "name" : "Heidegger",
        "categories" : [
            'ETHICS',
            'EPISTEMOLOGY',
            'METAPHYSICS'
        ],
        "description" : "One of the most influential philosophers of the past century, Heidegger is hard to classify, since his main concern lies not with the objectivity of the external world but with its perception. Not a subjectivist as such, Heidegger found the idea of being itself, as a presence (dasein) of every thing in the world, fascinating. Dasein is for him more than mere presence, but an active awareness of living beings in the world that upholds it. Dasein is intentional and means care for the world and its things. Unfortunately Heidegger also collaborated with the nazi regime which to an extent smeared his image in the West."
    },
    {
        "name" : "Descartes",
        "categories" : [
            'EPISTEMOLOGY',
            'METAPHYSICS'
        ],
        "description" : "The father of modern science, Descartes was the first to emancipate cognition and scientific method from theology. He managed to find the basis of thought and human existance in the mental process of cognition making it the major characteristic of humanity. His is also credited with the invention of the Cartesian coordinate system and analytical geometry. He also denied the divine explanation of the natural phenomena. Another controversial thesis by Descarte was that animals have no soul and are mere authomatons, which paved the way to further exploitation of nature in the industrial era."
    },
    {
        "name" : "Spinoza",
        "categories" : [
            'EPISTEMOLOGY',
            'METAPHYSICS',
            'ETHICS',
            'POLITICS'
        ],
        "description" : "One of the first modern thinkers who promoted freedom of social, political and religious identity in the 17th century Netherlands, Spinoza was initially raised to become a leading rabbi of the Amsterdam Jewish community. His break with the tradition lead to his excommunication that lasted till late 20th century. His way of life can be seen as the first example of a truly modern man who sees his views and identity as a personal choice. His concept of God as Nature inspired a.o. the deep ecology movement."
    },
    {
        "name" : "Sartre",
        "categories" : [
            'METAPHYSICS',
            'ETHICS',
            'POLITICS',
            'AESTHETICS'
        ],
        "description" : "The most prominent existential philosopher, Sartre helped promoting most radical and forward-thinking social projects of his time, like female emancipation, civil rights, global peace etc. Supported and actively participated in the events of 1968 in Paris. A socialist by conviction, Sartre distantiated himself from the USSR politics. His wife, a French feminist and philosopher Simone de Beauvoir, and Sartre himself actively promoted the feminist agenda. Many of Sartres works are written in a form of a play. His main focus was on anthropology, seeing life as meaningless and godless, with human beings being sentenced to create their own meaning of life while constantly causing each other pain through persuing their own interests."
    },
    {
        "name" : "Marx",
        "categories" : [
            'POLITICS',
            'METAPHYSICS'
        ],
        "description" : "If not a most elaborate thinker, Marx certainly remains one of the most influential so far. The creater of communism and an excellent economy theoritician, Marx is accounted among the prominent political and social philosophers of the modern era. Instrumental to his political views, his philosophy can arguably be couted as an ideologically tainted attempt at digesting Hegels metaphysics. While ignoring Hegels Absoluter Geist, Marx adopts his theory of spyral dynamics of social, political and historical development and uses it as the base for his class struggle theory. Another feature of Marxs philosophy is the dye-hard materialism that leaves no space for any traces of transcedency."
    }
];

const quotes = [
    {
        "text" : "Happiness is the highest good.",
        "philosopher" : "Aristotle",
        "topics" : ["morals", "happiness"]
    },
    {
        "text" : "Plato is a friend but Truth is a better friend.",
        "philosopher" : "Plato",
        "topics" : ["truth"]
    },
    {
        "text" : "The only thing I know is that I know nothing.",
        "philosopher" : "Socrates",
        "topics" : ["cognition", "metaphysics"]
    },
    {
        "text" : "Man is the measure of all things.",
        "philosopher" : "Protagoras",
        "topics" : ["truth", "morals", "cognition"]
    },
    {
        "text" : "We are too weak to discover the truth by reason alone.",
        "philosopher" : "St.Augustine",
        "topics" : ["truth", "cognition"]
    },
    {
        "text" : "God is dead! He remains dead! And we have killed him.",
        "philosopher" : "Nietzsche",
        "topics" : ["morals", "religion", "metaphysics"]
    },
    {
        "text" : "You can discover more about a person in an hour of play than in a year of conversation.",
        "philosopher" : "Plato",
        "topics" : ["cognition", "communication"]
    },
    {
        "text" : "Happiness is not an ideal of reason but of imagination.",
        "philosopher" : "Kant",
        "topics" : ["cognition", "happiness"]
    },
    {
        "text" : "He who thinks great thoughts, often makes great errors.",
        "philosopher" : "Heidegger",
        "topics" : ["morals"]
    },
    {
        "text" : "Cogito ergo sum.",
        "philosopher" : "Descartes",
        "topics" : ["cognition", "metaphysics"]
    },
    {
        "text" : "I can control my passions and emotions if I can understand their nature.",
        "philosopher" : "Spinoza",
        "topics" : ["morals", "happiness", "cognition"]
    },
    {
        "text" : "Everything that exists is born for no reason, carries on living through weakness, and dies by accident.",
        "philosopher" : "Sartre",
        "topics" : ["morals", "metaphysics"]
    },
    {
        "text" : "Philosophers have hitherto only interpreted the world in various ways; the point, however, is to change it.",
        "philosopher" : "Karl Marx",
        "topics" : ["metaphysics", "politics"]
    },
    {
        "text" : "Religion is the sign of the oppressed ... it is the opium of the people.",
        "philosopher" : "Karl Marx",
        "topics" : ["morals", "religion"]
    }
];

const topics = [
    {"text" : "morals"},
    {"text" : "religion"},
    {"text" : "metaphysics"},
    {"text" : "politics"},
    {"text" : "cognition"},
    {"text" : "happiness"},
    {"text" : "communication"},
    {"text" : "truth"}
];

const users = [
    {
        "name" : "Harold Finch",
        "email" : "katya.devries@jstack.eu",
        "password" : "prutser123",
        "role" : 'admin'
    },
    {
        "name" : "John Reese",
        "email" : "k.devries@scarlet.be",
        "password" : "prutser123"
    }
];

const seedPhilosophers = () => {
    philosophers.forEach((philosopher) => {
        PhilosopherService.create(philosopher)
            .then(resp => Logger.log('info', `Philosopher added: ${philosopher.name}`))
            .catch(err => console.log('info', `The following philosopher already exists: ${philosopher.name}`));
    })
};

const seedQuotes = () => {
    quotes.forEach((quote) => {
        QuoteService.create(quote)
            .then(resp => Logger.log('info', `Quote added: ${quote.text}`))
            .catch(err => console.log('info', `The following philosopher already exists: ${quote.text}`));
    })
};

const seedTopics = () => {
    topics.forEach((topic) => {
        TopicService.create(topic)
            .then(resp => Logger.log('info', `Topic added: ${topic.text}`))
            .catch(err => console.log('info', `The following topic already exists: ${topic.text}`));
    })
};

const seedUsers = () => {
    users.forEach((user) => {
        UserService.create(user)
            .then(resp => Logger.log('info', `User added: ${user.name}`))
            .catch(err => console.log('info', `The following user already exists: ${topic.name}`));
    })
};

module.exports = {
    seedPhilosophers,
    seedQuotes,
    seedTopics,
    seedUsers
};