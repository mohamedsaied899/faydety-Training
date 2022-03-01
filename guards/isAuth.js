import router from "next/router"
import { useEffect, useState } from "react"
import { getItem } from "../services/local-storage.service"

const isAuth = (Component) => {
    const Auth = () => {
      const [userData, setUserData] = useState({})

        useEffect(() => {
          setUserData(getItem('userData'))
            if (!userData) {
                router.push('/signin')
            }
        }, [userData])

        return !userData ? <>hello</> : <Component />
    }

    return Auth
}

export default isAuth