const db = require('../config/connection');
const { User, Art } = require('../models');
const userSeeds = require('./userSeeds.json');
const artSeeds = require('./artSeeds.json');

db.once('open', async () => {
  try {
    await Art.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < artSeeds.length; i++) {
      const { _id, artAuthor } = await Art.create(artSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: artAuthor },
        {
          $addToSet: {
            art: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
