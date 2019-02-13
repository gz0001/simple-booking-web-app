module.exports = (schema, option = {}, query) => {
  const { filter, limit, skip, sort } = option;

  const combineQuery = [{ ...filter }, { ...query }];

  return schema
    .find({ $and: combineQuery })
    .limit(limit)
    .skip(skip)
    .sort(sort);
};
