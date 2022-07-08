import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('todos'); 
// create task collection to use mongo