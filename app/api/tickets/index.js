const { Router } = require('express');
const { Ticket } = require('../../models');
const { Student } = require('../../models');

function attachStudent(ticket) {
  const ticketMod = ticket;
  ticketMod.student = Student.getById(ticket.studentId);
  return ticketMod;
}

const router = new Router();
router.get('/', (req, res) => {
  const ticketList = Ticket.get().map(
    e => attachStudent(e),
  );
  res.status(200).json(ticketList);
});

router.get('/:ticketId', (req, res) => res.status(200).json(
  attachStudent(Ticket.getById(req.params.ticketId)),
));

router.delete('/:ticketId', (req, res) => res.status(200).json(
  Ticket.delete(req.params.ticketId),
));

router.put('/:ticketId', (req, res) => res.status(200).json(
  attachStudent(Ticket.update(req.params.ticketId, req.body)),
));

router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
