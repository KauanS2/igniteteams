import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'

import { AppRoutes } from './app.routes'

import { useTheme } from 'styled-components/native'

export function Routes() {
    const { COLORS } = useTheme()
    
    return (
        <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </View>
    )
}