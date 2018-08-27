const router   = require ('express').Router();
const insertShipment = require ('../middlewares/insertEntity').shipment;
const auth = require ('../middlewares/auth');
const Shipment = require ('../globle/models').shipment;
const User = require ('../globle/models').user;

router.get ('/', (req, res) => {
  res.json('Welcome to shipment route this route required login!');
})

router.use (auth);
router.get('/view/', async (req, res) => {
  const user = await User.findById(req.user._id);
  let shipments = await Shipment.find({_id : {$in : user.shipments}})
                                .populate ('trip', 'route service')
                                .populate ('receiver', 'firstName');
  if(shipments.length === 0) return res.status(400).json({ message: 'Your shipment field is empty!' });
  else {
    res.json(shipments);
  }
})
router.get('/view/:id', async (req, res) => {
  let shipment = await Shipment.findById(req.params.id);
  if(!shipment) return res.status(400).json({ message: ''});
  else {
    res.json(shipment);
  }
})

router.post('/create', insertShipment, async (req, res) => {
  console.log(req.body);
  let shipment = new Shipment(req.body);
  try {
      let doc = await shipment.save();
      res.json(doc);
      User.pushShipment (req.user._id, doc._id, (err, result) => {
        if (err) console.error(err);
        console.log({'USER => push shipment': result});
      })
  } catch(ex) {
      res.status(400).json({ error: ex.message });
      console.log(ex.message);
  }
})

router.put ('/cancel/:id', async (req, res) => {
  try {
    const update = await Shipment.updateOne({_id : req.params.id}, {status : false});
    res.json(update);
  } catch (e) {
    res.status(400).json({ error: ex.message });
    console.log(ex.message);
  }
})

router.put ('/restore/:id', async (req, res) => {
  try {
    const update = await Shipment.updateOne({_id : req.params.id}, {status : true});
    res.json(update);
  } catch (e) {
    res.status(400).json({ error: ex.message });
    console.log(ex.message);
  }
})

router.delete('/delete/:id', async (req, res) => {
  let shipments = await Shipment.find({_id : req.params.id});
  if(!shipments[0]) return res.status(400).json({ message: '' });
  else {
    try {
        let doc = await shipments[0].remove();
        res.json(doc);
        User.pullShipment (req.user._id, doc._id, (err, result) => {
          if (err) console.error(err);
          console.log({'USER => pull shipment': result});
        })
    } catch(ex) {
        res.status(400).json({ error: ex.message });
        console.log(ex.message)
    }
  }
})
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({error : err});
})

module.exports = router;
