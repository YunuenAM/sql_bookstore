const express = require('express');
const router = express.Router();
const  { PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient()


/* GET authors listing. */
router.get('/', async function(req, res, next) {
  const books = await prisma.book.findMany()
  res.status(200).json(books)
});


/* GET a specific register */
router.get('/:id', async function(req, res, next) {
  const books = await prisma.book.findUnique({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(books)
});

/* POST editorial in the list. */
router.post('/', async function(req, res, next) {
  try{
  const book = await prisma.book.create({
    data: req.body,
  })
  res.status(201).json(book);
}  catch (error){
  console.error(error);
  res.status(500).json(error);
}
});

/*Partial edition*/ 

router.patch('/:id', async function(req, res, next) {
  const books = await prisma.book.updateMany({
    data: req.body,
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(books)
});


/* Delete a register*/

router.delete('/:id', async function(req, res, next) {
  const books = await prisma.book.delete({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(202).json(books)
});

module.exports = router;
