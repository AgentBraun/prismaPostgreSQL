import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// get all posts
app.get('/posts', async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        created: 'desc',
      },
    });
    res.json({ posts });
  } catch (error) {
    next(error.message);
  }
});

// get a post by id
app.get('/posts/:id', async (req, res, next) => {});

// create a post
app.post('/posts', async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: { authorID: 1, ...req.body },
    });
    res.json({ post });
  } catch (error) {
    next(error.message);
  }
});

// update a post
app.patch('/posts/:id', async (req, res, next) => {});

// delete a post
app.delete('/posts/:id', async (req, res, next) => {});

// get a user's posts
app.get('/users/:id/posts', async (req, res, next) => {});

app.listen(3000, () => {
  console.log('database online on port 3000');
});
