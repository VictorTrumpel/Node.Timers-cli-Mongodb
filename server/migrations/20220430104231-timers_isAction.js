module.exports = {
  async up(db) {
    await db.collection("timers").updateMany(
      {
        isAction: { $exists: false },
      },
      [
        {
          $set: { isAction: false },
        },
      ]
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
