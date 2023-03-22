import { useQuery, useQueryClient } from "@tanstack/react-query"
// import axios
import axios from "axios"

function fetchFromDB(searchInput: string = "") {
  // fetch from mongodb atlas

  //return first 5000 documents

  return axios.get(`./api/query?query=${searchInput}`).then((res) => res)
}

export const useLabels = (searchInput: string, props: { data: string }) => {
  const queryClient = useQueryClient()
  return useQuery(
    ["labels", searchInput],
    async () => {
      if (searchInput === "") {
        return props.data
      }
      const response = await fetchFromDB(searchInput)
      console.log(response, " responsell")
      return response.data.data
    },
    //cache response for 5 mins
    {
      // staleTime: Infinity,

      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      // set initialdata to be out of date so that next queries will be fetched
    }
  )
}
