import {GraphQLServer, PubSub} from 'graphql-yoga';
import prisma from  './prisma';
import {resolvers,fragmentReplacements} from './resolvers/resolvers';

const pubSub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            pubSub,
            prisma,
            request
        }

    },
    fragmentReplacements
});

export default server;