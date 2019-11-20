function validate(schema, target, res, next) {
  const { error } = schema.validate(target);
  if (error) {
    const errors = error.details.map(({ message }) => message);
    res.status(400).json({ errors });
    return;
  }
  next();
}

module.expprts = validate;
