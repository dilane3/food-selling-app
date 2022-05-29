import axios from "axios";

export const getAxiosInstance = (ressource) => {
  switch (ressource) {
    case "User": {
      return axios.create({
        baseURL: "http://localhost:5000/users"
      })
    }

    case "Food": {
      return axios.create({
        baseURL: "http://localhost:3000/foods"
      })
    }

    default: {
      return null
    }
  }
}