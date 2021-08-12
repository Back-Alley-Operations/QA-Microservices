const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongodb connected');
});

let QuestionsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,

});

let Questions = mongoose.model('Questions', QuestionsSchema);

let AnswersSchema = new mongoose.Schema({
  id: Number,
  body: String,
  date: String,
  answerer_name: String,
  helpfulness: Number,
  question: [{
    type: Schema.Types.ObjectId, ref: 'Questions'
  }],
})

let Answers = mongoose.model('Answers', AnswersSchema);

let PhotosSchema = new mongoose.Schema({
  id: Number,
  url: String,
  answer: [{
    type: Schema.Types.ObjectId, ref: 'Answers'
  }]
})

let Photos = mongoose.model('Photos', PhotosSchema);
