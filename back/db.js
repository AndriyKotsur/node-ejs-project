const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)

const {
    mongoURI
} = require('./config');

mongoose.connect(mongoURI, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});
mongoose.connection.off('disconnected', () => {
    console.log('Database disconnected');
});
mongoose.connection.on('error', (error) => {
    console.log('Error:', error);
});