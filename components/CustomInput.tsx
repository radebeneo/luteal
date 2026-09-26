import cn from 'clsx'
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import { CustomInputProps } from "@/type"

const CustomInput = ({
                         placeholder = 'Enter text',
                         value,
                         onChangeText,
                         label,
                         secureTextEntry = false,
                         keyboardType="default",
                         icon,
                         rightIcon,
                         onRightIconPress,
                         variant = 'underline'}: CustomInputProps) => {

    const [isFocused, setIsFocused] = useState(false);

    if (variant === 'pill') {
        return (
            <View className="w-full">
                <Text className="label">{label}</Text>

                <View className={cn('input-pill', isFocused ? 'border-primary' : 'border-gray-200')}>
                    {icon}
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        placeholderTextColor="#9C97A3"
                        className="flex-1 paragraph-medium text-dark-100"
                    />
                    {rightIcon ? (
                        <TouchableOpacity onPress={onRightIconPress} hitSlop={10}>
                            {rightIcon}
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        );
    }

    return (
        <View className="w-full">
            <Text className="label">{label}</Text>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
            />
        </View>
    )
}
export default CustomInput
