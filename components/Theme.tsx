'use client'

import { FiSun,FiMoon } from "react-icons/fi"
import {useTheme} from 'next-themes'
import { useEffect, useState } from "react"

export default function ThemeSwitch(){
    const {setTheme, resolvedTheme}= useTheme()
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
      }, [])
    
      if (!mounted) {
        return null
      }
    
    if(resolvedTheme==='dark'){
        return<FiSun type="button" className=" cursor-pointer size-8 max-sm:mx-4 mx-6 mt-1" onClick={()=> setTheme('light')}/>
    }
    if(resolvedTheme==='light'){
        return <FiMoon type="button" className="cursor-pointer max-sm:mx-4 size-8 mx-6 mt-1" onClick={()=> setTheme('dark')}/>
    }
}

