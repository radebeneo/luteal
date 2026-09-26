import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import cn from 'clsx'

import {CustomButtonProps} from "@/type"
import {router} from "expo-router";

const CustomButton = ({
    onPress,
    title="Click Me",
    style,
    textStyle,
    leftIcon,
    isLoading = false
}: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={() => router.push('/cart')}>
            {leftIcon}
            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                ): (
                    <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
export default CustomButton
