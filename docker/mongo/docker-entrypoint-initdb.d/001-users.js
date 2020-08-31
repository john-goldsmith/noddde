db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [
      {
        role: 'readWrite',
        db:   'noddde_development'
      }
    ]
  }
);