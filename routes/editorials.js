const express = require('express');
const router = express.Router();
const  { PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient()


/* GET authors listing. */
router.get('/', async function(req, res, next) {
  const editorials = await prisma.editorial.findMany()
  res.status(200).json(editorials)
});


/* GET a specific register */
router.get('/:id', async function(req, res, next) {
  const editorials = await prisma.editorial.findUnique({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(editorials)
});

/* POST editorial in the list. */
router.post('/', async function(req, res, next) {
  try{
  const editorial = await prisma.editorial.create({
    data: req.body,
  })
  res.status(201).json(editorial);
}  catch (error){
  console.error(error);
  res.status(500).json(error);
}
});

/*Partial edition*/ 

router.patch('/:id', async function(req, res, next) {
  const editorials = await prisma.editorial.updateMany({
    data: req.body,
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(200).json(editorials)
});


/* Delete a register*/

router.delete('/:id', async function(req, res, next) {
  const editorials = await prisma.editorial.delete({
    where: {
      id: parseInt(req.params.id)
    }});
  res.status(202).json(editorials)
});

module.exports = router;
