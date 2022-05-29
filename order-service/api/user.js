import { getAxiosInstance } from './index.js'

const getUser = async (id) => {
  const instance = getAxiosInstance("User")

  try {
    const { data, error } = await instance.get(`/${id}`)

    return { data: data.data }
  } catch (err) {
    console.log(err)

    return { error: "Something went wrong" }
  }
}

export {
  getUser
}