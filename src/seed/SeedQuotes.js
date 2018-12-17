const {ObjectID} = require('mongodb');

const {Quote} = require('models/Quote');
const QuoteService = require('services/QuoteService');

const Logger = require('helpers/LoggerHelper');

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
        "philosopher" : "Marx",
        "topics" : ["metaphysics", "politics"]
    },
    {
        "text" : "The unexamined life is not worth living.",
        "philosopher" : "Socrates",
        "topics" : ["morals", "cognition"]
    },
    {
        "text" : "Whereof one cannot speak, thereof one must be silent.",
        "philosopher" : "Wittgenstein",
        "topics" : ["communication", "language"]
    },
    {
        "text" : "Religion is the sign of the oppressed ... it is the opium of the people.",
        "philosopher" : "Karl Marx",
        "topics" : ["morals", "religion"]
    },
    {
        "text" : "Religion is the sign of the oppressed ... it is the opium of the people.",
        "philosopher" : "Karl Marx",
        "topics" : ["morals", "religion"]
    },
    {
        "text" : "Religion is the sign of the oppressed ... it is the opium of the people.",
        "philosopher" : "Karl Marx",
        "topics" : ["morals", "religion"]
    },

];

const seedQuotes = () => {
    quotes.forEach((quote) => {
        QuoteService.create(quote)
            .then(resp => Logger.log('info', `Quote added: ${quote.text}`))
            .catch(err => Logger.log('info', `The following philosopher already exists: ${quote.text}`));
    })
};

module.exports = {
    seedQuotes
};