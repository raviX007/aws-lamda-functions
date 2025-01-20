module.exports.handler = async (event) => {
  try {
    const { num1, num2 } = JSON.parse(event.body);

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Both inputs must be numbers'
        })
      };
    }

    const result = num1 + num2;

    return {
      statusCode: 200,
      body: JSON.stringify({
        result,
        inputs: { num1, num2 }
      })
    };
  } catch (error) {
    console.error('Error in addition:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error'
      })
    };
  }
};
