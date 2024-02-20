import axios from "axios`"


const loginHandler = async (values ) => {
  const data = values
  try {
    const enroll = await axios.post("https://hlf-gateway.dsolutions.mn/service-wallet/enroll?=diplom-admin", {
      username: data.username,
      password: data.password,
    }).data

    const identity = await axios.get("https://hlf-gateway.dsolutions.mn/service-wallet/identity", {
      headers: {
        authorization: `Bearer ${enroll.data}`
      }
    }).data

    return {
      "orgId": identity.orgId,
      "orgRole": identity.orgRole,
      "superAdmin": identity.superAdmin
    }
    
  } catch (error) {
    return 'error'    
  }
}

export default loginHandler