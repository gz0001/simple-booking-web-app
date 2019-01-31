module.exports = (schema, option = {}, query) => {
  console.log("option: ", JSON.stringify(option));

  const { filter, limit, skip, sort } = option;

  const combineQuery = [{ ...filter }, { ...query }];

  //console.log("combine: ", combineQuery);

  console.log("filter: ", combineQuery);

  return schema
    .find({ $and: combineQuery })
    .limit(limit)
    .skip(skip)
    .sort(sort);
};
