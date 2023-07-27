const express = require('express');
const router = express.Router();
const  { PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient()


/* GET authors listing. */
router.get('/', async function(req, res, next) {
  const authors = await prisma.author.findMany()
  res.status(200).json(authors)
});


/* GET a specific register */
router.get('/:id', async function(req, res, next) {
  const authors = await prisma.author.findUnique({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(authors)
});

/* POST author in the list. */
router.post('/', async function(req, res, next) {
  try{
  const author = await prisma.author.create({
    data: req.body,
  })
  res.status(201).json(author);
}  catch (error){
  console.error(error);
  res.status(500).json(error);
}
});

/*Partial edition*/ 

router.patch('/:id', async function(req, res, next) {
  const authors = await prisma.author.updateMany({
    data: req.body,
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(authors)
});


/* Delete a register*/

router.delete('/:id', async function(req, res, next) {
  const authors = await prisma.author.delete({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(202).json(authors)
});

module.exports = router;
