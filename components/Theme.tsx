'use client'

import { FiSun,FiMoon } from "react-icons/fi"
import {useTheme} from 'next-themes'

export default function ThemeSwitch(){
    const {setTheme, resolvedTheme}= useTheme()


    if(resolvedTheme==='dark'){
        return<FiSun className="size-8 mx-6 mt-1" onClick={()=> setTheme('light')}/>
    }
    if(resolvedTheme==='light'){
        return <FiMoon className="size-8 mx-6 mt-1" onClick={()=> setTheme('dark')}/>
    }
}

