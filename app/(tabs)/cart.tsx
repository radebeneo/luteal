 import {View, Text, FlatList} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import cn from "clsx";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader"
import {PaymentInfoStripeProps} from "@/type";
import CustomButton from "@/components/CustomButton";
 import CartItem from "@/components/CartItem";

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {

    const {items, getTotalItems, getTotalPrice} = useCartStore()

    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()


    return (
        <SafeAreaView className="bg-white h-full ">
            <FlatList
                data={items}
                renderItem={({item}) => <CartItem item={item}/>}
                keyExtractor={(item) => {
                    const customizationsKey = item.customizations
                        ?.map((c) => c.id)
                        .sort()
                        .join("-");
                    return `${item.id}-${customizationsKey || ""}`;
                }}
                contentContainerClassName="px-5 pt-5 pb-38"
                ListHeaderComponent={() => <CustomHeader title="YourCart"/>}
                ListEmptyComponent={() => <Text className="text-center">No items in your cart</Text>}
                ListFooterComponent={() =>  totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">Payment Summary</Text>


                            <PaymentInfoStripe
                                label={`Total Items (${totalItems}`}
                                value={`R${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`R12.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`-R3.50`}
                                valueStyle="!text-success"
                            />
                        </View>

                        <View className="border-t border-gray-300 my-2">
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`R${(totalPrice + 12.00 - 3.50).toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton title="Proceed to Checkout" />



                    </View>
                )}
            />
        </SafeAreaView>
    )
}
export default Cart
