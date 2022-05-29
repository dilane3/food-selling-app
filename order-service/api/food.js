import { getAxiosInstance } from './index.js'

const getFood = async (id) => {
  const instance = getAxiosInstance("Food")

  try {
    const { data, error } = await instance.get(`/${id}`)

    return { data: data.data }
  } catch (err) {
    console.log(err)

    return { error: "Something went wrong" }
  }
}

export {
  getFood
}