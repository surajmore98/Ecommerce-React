function getCartTotal(list) {
    let initialTotal = {
        totalOriginalPrice: 0,
        discountAmount: 0,
        deliveyCharges: 0,
        totalAmount: 0,
        quantity: 0
    }

    if(list && list.length > 0) {
        initialTotal.deliveyCharges = 500;
        initialTotal.totalAmount = 500;    

        return list.reduce((total, current) => {
            return {
                ...total,
                totalOriginalPrice: total.totalOriginalPrice + (current.qty * current.price),
                discountAmount: total.discountAmount + (current.qty * (current.price - current.discountedPrice)),
                totalAmount: total.totalAmount + (current.qty * current.discountedPrice),
                quantity: total.quantity + current.qty
            }
        }, initialTotal);
    }
    
    return initialTotal;
}

export {getCartTotal};