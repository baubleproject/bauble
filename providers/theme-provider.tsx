"use client"
import React, { useEffect, useCallback } from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ConfigProvider, theme as antdTheme } from 'antd';
import useChangeTheme from "@/hooks/useChangeTheme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

    type ThemeType = "light" | "dark" | null

    const { themeChangedFlag } = useChangeTheme()

    const [appTheme, setAppTheme] = React.useState<ThemeType>(null);

    const changeTheme = () => {
        const theme = localStorage.getItem("theme") as ThemeType
        setAppTheme(theme)
    }

    useEffect(() => {
        changeTheme()
    }, []);

    useEffect(() => {
        changeTheme()
    }, [themeChangedFlag]);


    return <NextThemesProvider {...props}>
        <ConfigProvider
            theme={{
                algorithm: appTheme == "dark" ? antdTheme.darkAlgorithm : antdTheme.compactAlgorithm,
                token: {
                    colorPrimary: '#00b96b',
                },
               components:{
                   Calendar:{
                        
                   }
               } 
            }}
        >
            {children}
        </ConfigProvider>
    </NextThemesProvider>
}

