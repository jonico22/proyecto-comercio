// middleware for doing role-based permissions
function permit(admin) {
    // return a middleware
    return (request, response, next) => {
      console.log(request)
      if (admin) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        response.status(403).json({error:-1 ,status: false , descripcion: "ruta " + request.originalUrl 
        + " metodo " + request.method + " no autorizada"  }); // user is forbidden
      }
    }
  }

  module.exports = permit