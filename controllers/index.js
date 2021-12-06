const axios = require("axios");

module.exports = {
  getIndex: (req, res) => {
    try {
      axios
        .get("https://api.hatchways.io/assessment/blog/posts?tag=tech")
        .then((res) => res.data)
        .catch((err) => console.log(err));

      res.status(200);
      res.send("Success");
    } catch (err) {
      console.log("something went wrong: ", err);
    }
  },
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
      console.log(req.query);
      // 1) handle error cases
      // 2) split tags to have array of tags
      // use for loop  async calls
      // concat results ?
      // use lodash sortBy

      await axios.get(
        "https://api.hatchways.io/assessment/blog/posts?tag=tech"
      );
      // );
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  },
};
