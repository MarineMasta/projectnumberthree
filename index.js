import express from 'express'; //framework for routing of application
import path from 'path'; //framework for routing of application
import mongoose from 'mongoose'; //create models for posts
import cors from 'cors'; //Cross origin requests
import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/api/posts', postRoutes);

const CONNECTION_URL =
  process.env.CONNECTION_URL ||
  'mongodb+srv://Tarkesh_Kandregula:dE60mzmdCUVyki9x@cluster0.s0vwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3000;
mongoose
  .connect(CONNECTION_URL || 'mongodb://localhost/games_website', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`App on port: ${PORT}`)))
  .catch((error) => console.log(error));

mongoose.connection.on('connected', () => {
  console.log('Mongoose found');
});

app.use(express.static('Client/build'));

const __dirname = path.resolve();

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'));
});

mongoose.set('useFindAndModify', false);
