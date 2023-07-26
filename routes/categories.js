const express = require('express');
const router = express.Router();
const  { PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient()


/* GET categories listing. */
router.get('/', async function(req, res, next) {
  const categories = await prisma.category.findMany()
  res.status(200).json(categories)
});


/* GET a specific register */
router.get('/:id', async function(req, res, next) {
  const categories = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(categories)
});

/* POST category in the list. */
router.post('/', async function(req, res, next) {
  try{
  const category = await prisma.category.create({
    data: req.body,
  })
  res.status(201).json(category);
}  catch (error){
  console.error(error);
  res.status(500).json(error);
}
});

/*Partial edition*/ 

router.patch('/:id', async function(req, res, next) {
  const categories = await prisma.category.updateMany({
    data: req.body,
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(categories)
});


/* Delete a register*/

router.delete('/:id', async function(req, res, next) {
  const categories = await prisma.category.delete({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(202).json(categories)
});

module.exports = router;
