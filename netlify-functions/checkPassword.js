exports.handler = async function(event, context) {
    const password = event.queryStringParameters.password;
    const envPassword = process.env.PASS || "default"; // fallback to "default" if PASS is not set
  
    if (password === envPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: "success" })
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ status: "forbidden" })
      };
    }
  };
  