const apiRoutes = {
  authentication: {},
  register:{
    submit:{
      post: `http://localhost:3000/users`
    }
  },
  login:{
   submit:{
      get: `http://localhost:3000/users?user.email=`
    }
  }
};

export default apiRoutes;
