async function tryCatchCRUD(res, tryCallback, catchCallback, errText) {
  try {
    await tryCallback?.();
  } catch (err) {
    await catchCallback?.();
    const errMessage = errText || err.message;
    console.error(err);
    res.status(400).json({ message: errMessage });
  }
}

module.exports = tryCatchCRUD;
