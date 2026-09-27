import { useCallback, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";

export const WHEEL_ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PADDING_VERTICAL = (WHEEL_ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2;

type WheelPickerProps = {
    data: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
    width?: number;
};

const WheelPicker = ({ data, selectedIndex, onChange, width = 100 }: WheelPickerProps) => {
    const scrollRef = useRef<ScrollView>(null);

    const handleMomentumScrollEnd = useCallback(
        (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const index = Math.round(event.nativeEvent.contentOffset.y / WHEEL_ITEM_HEIGHT);
            onChange(Math.max(0, Math.min(data.length - 1, index)));
        },
        [data.length, onChange]
    );

    return (
        <View style={{ width, height: WHEEL_ITEM_HEIGHT * VISIBLE_ITEMS }}>
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={WHEEL_ITEM_HEIGHT}
                decelerationRate="fast"
                contentContainerStyle={{ paddingVertical: PADDING_VERTICAL }}
                contentOffset={{ x: 0, y: selectedIndex * WHEEL_ITEM_HEIGHT }}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            >
                {data.map((label, index) => {
                    const isSelected = index === selectedIndex;
                    const distance = Math.abs(index - selectedIndex);
                    return (
                        <View
                            key={`${label}-${index}`}
                            style={{ height: WHEEL_ITEM_HEIGHT }}
                            className="items-center justify-center"
                        >
                            <Text
                                className={`text-center ${isSelected ? "h3-bold text-plum" : "paragraph-medium text-gray-200"}`}
                                style={{ opacity: isSelected ? 1 : Math.max(0.3, 1 - distance * 0.25) }}
                            >
                                {label}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default WheelPicker;
