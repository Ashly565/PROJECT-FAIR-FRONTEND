import axios from 'axios'

// common configuratons for an api call
// httprequest :type of http call(get,post,put,delete)
export  const commonApi = async(httpRequest,url,reqBody,reqHeader)=>{
   const reqConfig = {
    method:httpRequest,
    url:url,
    data:reqBody,
    headers:reqHeader?reqHeader: {'Content-Type':'application/json'}
    // content-type is used to mention the type of data
   }
   return await axios(reqConfig).then((result)=>{
      return result;
   }).catch((err)=>{
    return err;
   })
}
