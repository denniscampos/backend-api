const axios = require("axios");
const _ = require("lodash");

module.exports = {
  // Route 1
  getPing: (req, res) => {
    try {
      res.status(200).send({ success: true });
    } catch (err) {
      console.log("something went wrong: ", err);
    }
  },
  
  // Route 2
  getPosts: async (req, res) => {
    try {
      const { tags, sortBy = "id", direction = "asc" } = req.query;

      let sortValues = ["id", "reads", "likes", "popularity"];
      let directionValues = ["asc", "desc"];

      if (!req.query.tags) {
        res.status(400).send({
          error: "tags parameter is required!",
        });
      }

      if (sortBy && sortValues.indexOf(sortBy.toLowerCase()) === - 1) {
        res.status(400).send({
          error: "sortBy parameter is invalid",
        });
      }

      if (
        direction &&
        directionValues.indexOf(direction.toLowerCase()) === - 1
      ) {
        res.status(400).send({
          error: "direction parameter is invalid",
        });
      }

      const tagValues = tags.split(",");

      const requests = [];

      for (let tag of tagValues) {
        requests.push(
          axios.get(
            `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`
          )
        );
      }

      // To make concurrent requests. 
      const results = await axios.all(requests);

      const allPosts = results.reduce(
        (previousValue, value) =>
          _.unionWith(previousValue, value.data.posts, _.isEqual),
        []
      );

      res.send(_.orderBy(allPosts, [sortBy], [direction]));
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  },
};
