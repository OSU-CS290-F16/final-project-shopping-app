var template = Handlebars.templates.data;

function generateHTML(name, price, details) {

  var data = { name };

  if (price || details) {
    data.body = {
      price: price,
      details: details
    };
  }

  return template(data);

