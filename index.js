const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const port = process.env.PORT || 3001;

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,  useUnifiedTopology: true})
	.then(() => {
		console.log('MongoDB connected');
		return server.listen(port)
})
	.then(res => {
		console.log(`Server running at ${res.url}`);
	})
	.catch(err => {
		console.log(err);
	})