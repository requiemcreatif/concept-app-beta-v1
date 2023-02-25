const notFound = (req, res, next) => {
  res.status(404).send("Sorry!! Not Found, you're lost!");
};

export default notFound;
