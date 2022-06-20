export const mockedLoginResponse = {
  access_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWNreSIsImV4cCI6MTY1NTU2NTU0Mn0.z2fDTdH5yuba6wHFN4jsVS7edCzYi7uzHuvuy1MRY-N_dX3QeAJxHFwn1I0YALfRVTae3iQcbsiX2sRSOtSxfQ",
  token_type: "bearer",
};

export const mockedTokenData = {
  accessToken: mockedLoginResponse.access_token,
  expiration: 1655565542000,
  username: "vicky",
  isLoggedIn: true,
};
