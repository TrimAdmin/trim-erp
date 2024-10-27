import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

const http = createAlova({
  requestAdapter: adapterFetch(),
  responded: (res) => {
    return res.json()
  },
})

export default http
