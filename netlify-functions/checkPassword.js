exports.handler = async (event, context) => {
    const password = event.queryStringParameters.password;
    const correctPassword = process.env.PASS;
  
    if (password === correctPassword) {
      return {
        statusCode: 200,
        body: "Correct password",
      };
    } else {
      return {
        statusCode: 401,
        body: "Incorrect password",
      };
    }
  };
  