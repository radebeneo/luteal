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
                         error,
                         autoCapitalize = "none",
                         autoComplete,
                         textContentType,
                         returnKeyType,
                         onSubmitEditing,
                         maxLength,
                         accessibilityLabel,
                         rightIconLabel,
                         variant = 'underline'}: CustomInputProps) => {

    const [isFocused, setIsFocused] = useState(false);

    if (variant === 'pill') {
        return (
            <View className="w-full">
                <Text className="label">{label}</Text>

                <View className={cn('input-pill', error ? 'border-error' : isFocused ? 'border-primary' : 'border-gray-200')}>
                    {icon}
                    <TextInput
                        autoCapitalize={autoCapitalize}
                        autoCorrect={false}
                        autoComplete={autoComplete}
                        textContentType={textContentType}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        returnKeyType={returnKeyType}
                        onSubmitEditing={onSubmitEditing}
                        maxLength={maxLength}
                        accessibilityLabel={accessibilityLabel ?? label}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        placeholderTextColor="#9C97A3"
                        className="flex-1 paragraph-medium text-dark-100"
                    />
                    {rightIcon ? (
                        <TouchableOpacity onPress={onRightIconPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={rightIconLabel}>
                            {rightIcon}
                        </TouchableOpacity>
                    ) : null}
                </View>
                {error ? <Text className="small-bold text-error mt-1 pl-2">{error}</Text> : null}
            </View>
        );
    }

    return (
        <View className="w-full">
            <Text className="label">{label}</Text>

            <TextInput
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                autoComplete={autoComplete}
                textContentType={textContentType}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                maxLength={maxLength}
                accessibilityLabel={accessibilityLabel ?? label}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                placeholderTextColor="#888"
                className={cn('input', error ? 'border-error' : isFocused ? 'border-primary' : 'border-gray-300')}
            />
            {error ? <Text className="small-bold text-error mt-1 pl-2">{error}</Text> : null}
        </View>
    )
}
export default CustomInput
